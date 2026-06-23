const axios = require("axios");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @desc    Handle Zoom OAuth callback
// @route   GET /api/auth/zoom/callback
// @access  Public (but uses code from Zoom)
const zoomCallback = async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.redirect(`${process.env.FRONTEND_URL}/?error=zoom_auth_failed`);
    }

    console.log("Zoom callback received with code:", code);

    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://zoom.us/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.ZOOM_REDIRECT_URI,
        },
        auth: {
          username: process.env.ZOOM_CLIENT_ID,
          password: process.env.ZOOM_CLIENT_SECRET,
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    console.log("Zoom token exchange successful");

    // Get user info from Zoom to find matching user
    const userInfoResponse = await axios.get("https://api.zoom.us/v2/users/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const zoomEmail = userInfoResponse.data.email;

    // Find user by email and update with Zoom tokens
    const user = await User.findOne({ email: zoomEmail });

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=zoom_user_not_found`);
    }

    // Save tokens to user
    user.zoomAccessToken = access_token;
    user.zoomRefreshToken = refresh_token;
    user.zoomTokenExpiry = new Date(Date.now() + expires_in * 1000);
    await user.save({ validateBeforeSave: false });

    // Generate JWT token for auto-login
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );

    // Redirect back to frontend with token
    return res.redirect(
      `${process.env.FRONTEND_URL}/?zoom=connected&token=${token}`
    );

  } catch (error) {
    console.error("Zoom callback error:", error.response?.data || error.message);
    return res.redirect(`${process.env.FRONTEND_URL}/?error=zoom_auth_failed`);
  }
};

// @desc    Refresh Zoom access token
// @route   POST /api/zoom/refresh
// @access  Private
const refreshZoomToken = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("+zoomRefreshToken");

    if (!user || !user.zoomRefreshToken) {
      return res.status(400).json({
        success: false,
        error: "No Zoom refresh token found",
      });
    }

    const response = await axios.post(
      "https://zoom.us/oauth/token",
      null,
      {
        params: {
          grant_type: "refresh_token",
          refresh_token: user.zoomRefreshToken,
        },
        auth: {
          username: process.env.ZOOM_CLIENT_ID,
          password: process.env.ZOOM_CLIENT_SECRET,
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    user.zoomAccessToken = access_token;
    user.zoomRefreshToken = refresh_token;
    user.zoomTokenExpiry = new Date(Date.now() + expires_in * 1000);
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      access_token,
    });
  } catch (error) {
    console.error("Refresh Zoom token error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to refresh Zoom token",
    });
  }
};

// @desc    Get Zoom meetings for current user
// @route   GET /api/zoom/meetings
// @access  Private
const getZoomMeetings = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.zoomAccessToken) {
      return res.status(400).json({
        success: false,
        error: "Zoom not connected",
      });
    }

    // Check if token is expired and refresh if needed
    if (user.zoomTokenExpiry && new Date(user.zoomTokenExpiry) < new Date()) {
      // Token expired, refresh it
      const refreshResponse = await axios.post(
        "https://zoom.us/oauth/token",
        null,
        {
          params: {
            grant_type: "refresh_token",
            refresh_token: user.zoomRefreshToken,
          },
          auth: {
            username: process.env.ZOOM_CLIENT_ID,
            password: process.env.ZOOM_CLIENT_SECRET,
          },
        }
      );

      user.zoomAccessToken = refreshResponse.data.access_token;
      user.zoomRefreshToken = refreshResponse.data.refresh_token;
      user.zoomTokenExpiry = new Date(Date.now() + refreshResponse.data.expires_in * 1000);
      await user.save({ validateBeforeSave: false });
    }

    // Fetch meetings from Zoom
    const response = await axios.get("https://api.zoom.us/v2/users/me/meetings", {
      headers: {
        Authorization: `Bearer ${user.zoomAccessToken}`,
      },
      params: {
        type: "previous", // Get past meetings
        page_size: 30,
      },
    });

    res.status(200).json({
      success: true,
      meetings: response.data.meetings,
    });
  } catch (error) {
    console.error("Get Zoom meetings error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch Zoom meetings",
    });
  }
};

// @desc    Get Zoom meeting recordings
// @route   GET /api/zoom/meetings/:meetingId/recordings
// @access  Private
const getZoomRecordings = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const user = await User.findById(req.userId);

    if (!user || !user.zoomAccessToken) {
      return res.status(400).json({
        success: false,
        error: "Zoom not connected",
      });
    }

    const response = await axios.get(
      `https://api.zoom.us/v2/meetings/${meetingId}/recordings`,
      {
        headers: {
          Authorization: `Bearer ${user.zoomAccessToken}`,
        },
      }
    );

    res.status(200).json({
      success: true,
      recordings: response.data,
    });
  } catch (error) {
    console.error("Get Zoom recordings error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch Zoom recordings",
    });
  }
};

const disconnectZoom = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Remove Zoom tokens
    user.zoomAccessToken = null;
    user.zoomRefreshToken = null;
    user.zoomTokenExpiry = null;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Zoom disconnected successfully",
    });
  } catch (error) {
    console.error("Disconnect Zoom error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to disconnect Zoom",
    });
  }
};


const handleZoomWebhook = async (req, res) => {
  try {
    console.log('📹 Zoom webhook received');
    
    // ✅ Verify the webhook is from Zoom
    const secretToken = process.env.ZOOM_WEBHOOK_SECRET_TOKEN;
    const receivedToken = req.headers['authorization'] || req.headers['x-zoom-signature'];
    
    // Option 1: Check authorization header
    if (secretToken && receivedToken) {
      // Simple check - Zoom sends the token in the authorization header
      if (receivedToken !== secretToken) {
        console.log('❌ Invalid webhook token');
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid webhook token' 
        });
      }
    }
    
    // Option 2: Zoom also includes it in the body
    const { event, payload, verification_token } = req.body;
    
    // Check verification token in body
    if (secretToken && verification_token && verification_token !== secretToken) {
      console.log('❌ Invalid verification token');
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid verification token' 
      });
    }
    
    console.log('✅ Webhook verified successfully');
    
    // Handle the event
    if (event === 'recording.completed') {
      await handleRecordingCompleted(payload);
    }
    
    // Always respond with 200 to acknowledge receipt
    res.status(200).json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    });
    
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleRecordingCompleted = async (payload) => {
  try {
    const { object } = payload;
    const { 
      meeting_id, 
      host_id, 
      topic, 
      start_time, 
      recording_files 
    } = object;
    
    console.log(`📹 Recording completed for: ${topic} (${meeting_id})`);
    
    // Find user by Zoom host ID
    const user = await User.findOne({ zoomUserId: host_id });
    
    if (!user) {
      console.log('❌ User not found for host:', host_id);
      return;
    }
    
    // Check if already processed
    const existing = await Meeting.findOne({ 
      zoomMeetingId: meeting_id,
      user: user._id 
    });
    
    if (existing) {
      console.log('⏭️ Meeting already processed:', meeting_id);
      return;
    }
    
    // Find transcript file
    const transcriptFile = recording_files?.find(
      f => f.file_type === 'audio_transcript' || f.recording_type === 'audio_transcript'
    );
    
    if (!transcriptFile) {
      console.log('📝 No transcript available yet, processing audio...');
      // You could process audio file here
      return;
    }
    
    // Fetch transcript content
    const transcriptResponse = await axios.get(transcriptFile.download_url, {
      headers: {
        'Authorization': `Bearer ${user.zoomAccessToken}`
      }
    });
    
    const transcript = transcriptResponse.data;
    
    // Analyze with Qwen
    const analysis = await analyzeMeeting(transcript);
    
    // Save meeting
    const meeting = await Meeting.create({
      user: user._id,
      title: topic || 'Zoom Meeting',
      transcript: transcript,
      decisions: analysis.decisions || [],
      tasks: analysis.tasks || [],
      open_questions: analysis.open_questions || [],
      next_meeting: analysis.next_meeting || null,
      status: 'ready',
      zoomMeetingId: meeting_id,
      meetingDate: new Date(start_time),
    });
    
    console.log(`✅ Meeting auto-analyzed: ${meeting._id}`);
    
    // Optional: Send notification to user
    // await sendNotification(user.email, meeting);
    
  } catch (error) {
    console.error('Error processing recording:', error.message);
  }
};


module.exports = {
  zoomCallback,
  refreshZoomToken,
  getZoomMeetings,
  getZoomRecordings,
  disconnectZoom,
  handleZoomWebhook,
  handleRecordingCompleted,
};
