var express = require('express');
var router = express.Router();

var notes = require('../controller/notes.js');

router.get("/get", notes.getNotes);
router.post("/store", notes.storeNotes);

module.exports = router;


