const express = require("express");
const router = express.Router();

const { zoomCallback, refreshZoomToken, getZoomMeetings, getZoomRecordings, disconnectZoom } = require("../controllers/zoomCallback");


// Routes
router.get("/callback", zoomCallback);
router.post("/refresh", refreshZoomToken);
router.get("/meetings", getZoomMeetings);
router.get("/meetings/:meetingId/recordings", getZoomRecordings);
router.post("/disconnect-zoom", auth, disconnectZoom);

module.exports = router;