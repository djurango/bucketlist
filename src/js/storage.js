window['Storage'] = {
};

Storage.getList = function(){
    if(!localStorage.notelist){
        console.log("localStorage.notelist is empty");
        return [];
    }
    return JSON.parse(localStorage.getItem('notelist')).notelist;
};

Storage.storeList = function(notelist){
    localStorage.setItem('notelist',JSON.stringify({"notelist":notelist}));
};
