var store = require("../services/notesStore.js");

module.exports.getNotes = function (req, res) {
  store.get(function (err, notes) {
    res.end(JSON.stringify(notes));
  });
};

module.exports.storeNotes = function (req, res) {
  store.store(req.body,function(){
      res.end("OK");
  });
};