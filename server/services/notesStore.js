var Datastore = require('nedb');
var db = new Datastore({filename: 'server/storage/notes.db', autoload: true});


db.find({"name":"notelist"}, function (err,docs){
  if(docs.length<1){
    db.insert({"name":"notelist","storedList":[]});
  }
});




function getNotes(callback) {

  try {
    db.find({"name":"notelist"}, function (err, docs) {
      callback(err, docs);
    });
  } catch (err) {
    console.log("error in notesStore.js, getNotes(): ")
  }
}

function storeNotes(content, callback) {


  try {
    db.update({"name":"notelist"}, {"name":"notelist","storedList":content}, {}, function (err) {
      if (callback) {
        callback(err);
      }
    });
  } catch (err) {
    console.log("error in notesStore.js, storeNotes(): " + err.toString());
  }
}


module.exports = {get: getNotes, store: storeNotes};
