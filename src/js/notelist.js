window['NoteList'] = {
};

NoteList.render = function(){

    var noteListTemplateText = $('#noteListTemplateText').html();
    var createNoteListHtml = Handlebars.compile (noteListTemplateText);
    var mainContent = $('#mainContent');
    mainContent.find('ul').remove();
    mainContent.find('h2').remove();

    compareMethod = NoteList.getCurrentlySelectedSort(mainContent.find('select'));
    mainContent.append (createNoteListHtml(NoteList.getSortedList(compareMethod)));

    $('#noteList').find('input[data-finished="1"]').prop('checked', true).closest('li').addClass("isFinished");
    $('span.stars').stars();

    addNoteListEventHandlers();

};

NoteList.addNote = function() {

    let dateText = $('#datepicker').val().split(".");
    let temp = dateText[0];
    dateText[0]=dateText[1];
    dateText[1]=temp;
    dateText = dateText.join();

    let note={};
    note.dateToCompare = new Date(dateText);
    note.date = moment(note.dateToCompare).format('DD-MM-YYYY').replace(/-/g, '.');
    note.title = $('input[name="title"]').val();
    note.content = $('textarea').val();
    note.importance = +$('#importanceInput').find('.ui-state-active').attr("data-importance");

    if(Note.editId<1) {
        note.created = new Date();
        note.id = (NoteList.list.length + 1);
        while($( "li#noteId_"+note.id.toString()).length){
            note.id++;
        }
        note.isFinished = 0;
        NoteList.list.push(note)
    }
    else{
        note.id = Note.editId;
        note.isFinished = Note.isFinished;
        let index = NoteList.list.map(function(e) { return e.id; }).indexOf(note.id);
        note.created = NoteList.list[index].created;
        NoteList.list[index] = note;
    }

    NoteList.storeList();
    Note.close();
    NoteList.render();
};


NoteList.toggleFinished = function(id){
    let index = NoteList.getNodeIndexById(id);
    let isFinished = NoteList.list[index].isFinished;

    if(isFinished>0){
        NoteList.list[index].isFinished = 0;

    }else{
        NoteList.list[index].isFinished = 1;
    }
    NoteList.storeList();
};

NoteList.deleteNote = function(noteId){

    $('body').addClass("shade");

    $("#deleteDialog").dialog({
        title:"Confirm",
        buttons : {
            "Confirm" : function() {
                NoteList.deleteHelper(noteId);
                $('body').removeClass("shade");
                $(this).dialog("close");
            },
            "Cancel" : function() {
                $('body').removeClass("shade");
                $(this).dialog("close");
            }
        }
    });
};

NoteList.deleteHelper = function(noteId){

    let node = $('li#noteId_'+noteId);
    node.hide();
    let id = parseInt(noteId);
    let index = NoteList.getNodeIndexById(id);

    console.log(NoteList);
    console.log(id);

    NoteList.list.splice(index, 1);

    NoteList.storeList();
    NoteList.render();
};

NoteList.getSortedList = function(sortMethod){
    NoteList.list = NoteList.list.sort(sortMethod);
    return NoteList.list
};

NoteList.storeList = function(){
    DatabaseStorage.storeList(NoteList.list);
};

NoteList.getNodeIndexById = function(id){
    return NoteList.list.map(function(e) { return e.id; }).indexOf(parseInt(id));
};


NoteList.getCurrentlySelectedSort = function(node){
    switch(node.val()) {
        case "date":
            return Note.compareDueDate;
            break;
        case "creationDate":
            return Note.compareCreationDate;
            break;
        case "importance":
            return Note.compareImportance;
            break;
        default:
            return Note.compareCreationDate;
    }
};