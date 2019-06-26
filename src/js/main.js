document.write('<script src="js/util.js"></script>');
document.write('<script src="js/databaseStorage.js"></script>');
document.write('<script src="js/notelist.js"></script>');
document.write('<script src="js/note.js"></script>');

$( document ).ready(function() {
    initializeUIElements();
    addEventHandlers();
    DatabaseStorage.getList();
});