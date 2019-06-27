window['DatabaseStorage'] = {
};

DatabaseStorage.SERVER = 'http://127.0.0.1:1337';

DatabaseStorage.getList = function(){

    $.get(DatabaseStorage.SERVER+'/get', function( data ) {

        NoteList.list = JSON.parse(data)[0].storedList;
        NoteList.render();

    }).fail(function(){
        window.console && console.log('loading items failed!');
    });
};

DatabaseStorage.storeList = function(notelist){

    $.ajax({
        url: '/store',
        type:'POST',
        data: JSON.stringify(notelist),
        contentType: 'application/json; charset=utf-8',
        crossDomain: true,
        success: function(data){

        }
    });

};