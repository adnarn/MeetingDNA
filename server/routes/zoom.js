const express = require("express");
const router = express.Router();

const { zoomCallback, refreshZoomToken, getZoomMeetings, getZoomRecordings } = require("../controllers/zoomCallback");


// Routes
router.post("/callback", zoomCallback);
router.post("/refresh", refreshZoomToken);
router.get("/meetings", getZoomMeetings);
router.get("/meetings/:meetingId/recordings", getZoomRecordings);


module.exports = router;