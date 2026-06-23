const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { 
  zoomCallback, 
  refreshZoomToken, 
  getZoomMeetings, 
  getZoomRecordings, 
  disconnectZoom, 
  handleZoomWebhook
} = require("../controllers/zoomCallback");

// Public routes
router.get("/callback", zoomCallback);

// Protected routes (require auth)
router.post("/refresh", auth, refreshZoomToken);
router.get("/meetings", auth, getZoomMeetings);
router.get("/meetings/:meetingId/recordings", auth, getZoomRecordings);
router.post("/disconnect-zoom", auth, disconnectZoom);  // ✅ This needs auth middleware
router.post('/webhook/recording-completed', handleZoomWebhook);


module.exports = router;