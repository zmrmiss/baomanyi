$(function() {
    $(".icon-close").on("tap",function(){
        $("#username").val("");
    })
    $(".icon-eye-close").on("tap",function(){
        $(this).toggleClass("icon-eye-open");
        $(this).toggleClass("icon-eye-close");
        var p = $("#password");
        p.attr("type")=="text"?p.attr("type","password"):p.attr("type","text")
    })
    
})