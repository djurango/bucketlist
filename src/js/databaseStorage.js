window['DatabaseStorage'] = {
};

DatabaseStorage.SERVER = 'http://127.0.0.1:1337';

DatabaseStorage.getList = function(){

    $.get(DatabaseStorage.SERVER+'/get', function( data ) {
        //console.log("received data from database:");
        //data = JSON.parse(data);
        //console.log(data);

        NoteList.list = JSON.parse(data)[0].storedList;
        NoteList.render();

    }).fail(function(){
        window.console && console.log('loading items failed!');
    });
};

DatabaseStorage.storeList = function(notelist){

    $.ajax({
        url: DatabaseStorage.SERVER+'/store',
        type:'POST',
        data: JSON.stringify(notelist),
        contentType: 'application/json; charset=utf-8',
        crossDomain: true,
        success: function(data){
            //data=JSON.parse(data);
            //console.log("data saved in database:");
            //console.log(data);
        }
    });

};