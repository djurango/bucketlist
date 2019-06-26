$.fn.stars = function() {
    return $(this).each(function() {
        var val = parseFloat($(this).html());
        var size = Math.max(0, (Math.min(5, val))) * 18;
        var $span = $('<span />').width(size);
        $(this).html($span);
    });
};

initializeUIElements = function(){
    $("#datepicker").datepicker({ dateFormat: 'dd.mm.yy' });
    var importanceInput = $("#importanceInput");
    importanceInput.find("input").checkboxradio();
    importanceInput.controlgroup();
    $("#dialog").dialog({
        autoOpen: false,
        modal: true
    });
};


addEventHandlers = function(){
    $('#createNote').click(function(){
        Note.open();
    });

    $('#createNoteCancel').click(function(e){
        e.preventDefault();
        Note.close();
    });


    $('#createNodeSubmit').click(function(e){
        if($('input#title')[0].checkValidity()&&$('textarea#content')[0].checkValidity()&&$('#datepicker')[0].checkValidity()){
            e.preventDefault();
            NoteList.addNote();
        }
    });

    $('#mainContent').find('select').on("change",function(){
        NoteList.render();
    });

    $('#switchStyle').on("click",function(){
        $('body, header, .controlling, .grid-item').toggleClass("active");
    });

    $('#switchFinished').on("click",function(){
        $('body').toggleClass("showFinished");
        $(this).text("Show Finished");
        $('body.showFinished #switchFinished').text("Hide Finished");
    });
};

addNoteListEventHandlers = function(){

    $('#noteList').find('input').on("change",function(e){
        let listItem = $(e.currentTarget).parent();
        let id = listItem.find("div.nId").text();
        let finishedNode = listItem.find("div.nIsFinished");

        if(finishedNode.text() === "1"){
            finishedNode.text("0");
            listItem.removeClass("isFinished");
        }
        else{
            finishedNode.text("1");
            listItem.addClass("isFinished");
        }
        NoteList.toggleFinished(id);
    });

};


