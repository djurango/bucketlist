$(document).ready(function(){
    $(".btn.switch").click(function(){
        $("body, header, nav, section, .grid-item").toggleClass( "active" );
    });
});


$( function() {
    $( "#dialog" ).dialog({
        autoOpen: false,
        show: {
            duration: 1000
        },
        hide: {
            duration: 1000
        }
    });

    $( "#opener" ).on( "click", function() {
        $( "#dialog" ).dialog( "open" );
    });
} );

$( function() {
    $( "#datepicker" ).datepicker();
} );