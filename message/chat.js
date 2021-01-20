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
    chatnum+=1;
    chatimg.innerHTML=chatnum;
}
setTimeout(function (){
    hasChat();
},10000);
function hideRed(){

    chatnum=0;
    chatimg.innerHTML=" <img src=\"ChatM3Img/img-info24.svg\" style=\"height: 50%;width: 50%\" id=\"chatnum\" >";
}


function getphone(){
    window.location.href="message/index.html?id="+"s0";

}

