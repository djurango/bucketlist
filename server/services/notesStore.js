/**
 * Created by isa on 19/06/16.
 */

var Datastore = require('nedb');
var db = new Datastore({filename: 'server/storage/notes.db', autoload: true});


//this reinitialzes the database: must be deleted after database problems are solved
/*db.remove({ }, { multi: true }, function (err, numRemoved) {
  db.loadDatabase(function (err) {
    // done
  });
});*/

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

  //console.log("content in add: "+JSON.stringify(content));

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
