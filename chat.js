


var chatic;
var chatred;
var chatnum=0;
var ischat=false;
function clickChat(){
    hideRed();
    chatic.className="chatshow";
    ischat=true;
    setTimeout(function (){
        chatic.className+=" chatUp";
    },100)
}
function closeChat(){
    chatnum=0;
    chatic.className="chatshow";
    ischat=false;
    console.log("hide");
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
    chatred.innerHTML="";

    chatred.className="hide";
}
