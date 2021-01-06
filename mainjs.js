var scrtch;
var nowtitle_index=0;
var all;
var topname;
var top_kuangs;
window.onload=function (){
    document.getElementById("gongsi").className="gonssi";
    scrtch=document.getElementById("gongsi");
    all=document.getElementById("all");
    topname=document.getElementById("top").className;
    top_kuangs=document.getElementById("top_kuangs");
    chat=document.getElementById("chat");
    chatred=document.getElementById("chatnum");
    autothemheight(scrtch);
    window.addEventListener('message', function (e) {
        console.log(e.data);
        if (e.data.post=="hide"){
            closeChat();
        }
        if (e.data.msg!=undefined){
            hasChat();
            console.log(e.data);

        }
    })


}
console.log(document.cookie);
if (!document.cookie.match("huanuoid"))
    document.cookie="huanuoid="+Math.random().toString(36).substr(2) + Date.now().toString(36);
console.log(document.cookie);
window.onscroll=function (){
    if (window.scrollY>10&&topname=="top_kuang")
    {
        document.getElementById("top").className="top_kuang_black";
        topname=document.getElementById("top").className;
    }
    if (window.scrollY<=10&&topname!="top_kuang"){
        document.getElementById("top").className="top_kuang";
        topname=document.getElementById("top").className;
    }
}
var click_index;
function autothemheight(obj){
    obj.height = obj.contentWindow.document.body.offsetHeight;
}
function choise(e) {
    click_index=e.id;
    if (click_index==nowtitle_index){
        return ;
    }
    all.children.item(nowtitle_index).className="titlehide";
    e.className+=" titlechoise";
    top_kuangs.children.item(nowtitle_index).className="top_kuangsitem";
    all.children.item(click_index).className="titleshow";
    setTimeout(function (){
        autothemheight(all.children.item(nowtitle_index));

    },1);

    nowtitle_index=click_index;
}


var chat;
var chatred;
var chatnum=0;
var ischat=false;
function clickChat(){
    hideRed();
    chat.className="chatShow";
    ischat=true;
    setTimeout(function (){
        chat.className+=" chatUp";
    },100)
}
function closeChat(){
    chatnum=0;
    chat.className="chatShow";
    ischat=false;
}

function hasChat(){
    if (ischat==true){
        return  ;
    }
    if ( chatred.className!="haschat"){
        chatred.className="haschat";
    }
    chatnum+=1;
    chatred.innerHTML=chatnum;
}
setTimeout(function (){
    hasChat();
},10000);
function hideRed(){

    chatnum=0;
    chatred.className="hide";
}
