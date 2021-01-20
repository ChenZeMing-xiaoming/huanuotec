

var index_objs;

var xiangxi_btn;
var xuanchuan;
var startx ;
var starty ;
var goumais;
var chatimg;
var topname;

var phonenuber=new Array("198****1500","166****3909","182****8867","172****6430","134****6413","165****5392 ","136****8384","139****2773","170****9675","134****2087","184****5280","180****5048","198****1500");

window.onload=function (){
  index_objs= document.getElementsByClassName("index_banner");
  xuanchuan=document.getElementById("xuanchuan");
  goumais=document.getElementById("goumais");
  topname=document.getElementById("top").className;
  chatic=document.getElementById("chat");
  chatimg=document.getElementById("chatimg");
  window.addEventListener('message', function (e) {
    console.log(e.data.hangye);
    if(e.data.hangye!=undefined){
      document.getElementById("msgarea").innerHTML=e.data.hangye;
      document.getElementById("msgarea").className="msgcontenthas";
    }
    if (e.data.post=="hide"){
      closeChat();
    }
    if (e.data.msg!=undefined){
      hasChat();
      console.log(e.data);
    }
  })
  xuanchuan.addEventListener("touchstart", function(e){
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
  }, false);
//手指离开屏幕
  xuanchuan.addEventListener("touchend", function(e) {
    var endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    var direction = getDirection(startx, starty, endx, endy);
    switch (direction) {
      case 3:
        left_index();
        break;
      case 4:
        right_index();
        break;
      default:
    }
  }, false);
  console.log()

  let times=document.getElementsByClassName("neirong1");
  let obj=new Date();
  let time=obj.getFullYear()+"-"+(obj.getMonth()+1)+"-"+obj.getDate();
  for (let i = 0; i < times.length; i++) {
    times.item(i).innerHTML=time;
  }
  let phones=document.getElementsByClassName("neirong");
  phoneslenth=phones.length;
  for (let i = 0; i < phones.length; i++) {
    phones.item(i).innerHTML=phonenuber[i]+" 已成功下单";

  }
}
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

if (!document.cookie.match("huanuoid"))
  document.cookie="huanuoid="+Math.random().toString(36).substr(2) + Date.now().toString(36);
function getDirection(startx, starty, endx, endy) {
  var angx = endx - startx;
  var angy = endy - starty;
  var result = 0;
  //如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    return result;
  }
  var angle = getAngle(angx, angy);
  if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3;
  } else if (angle >= -45 && angle <= 45) {
    result = 4;
  }
  return result;
}
function getAngle(angx, angy) {
  return Math.atan2(angy, angx) * 180 / Math.PI;
};

var now_index=0;
var bool_isclick=false;
function click_next_index(obj){
  start_next_index(parseInt( obj.innerHTML) )  ;
  bool_isclick=true ;
}
setTimeout(auto_nex_index,5000);
function right_index(){
  start_next_index(now_index==0?2:now_index-1);
  bool_isclick=true ;
}
function left_index(){
  start_next_index(now_index==2?0:now_index+1);
  bool_isclick=true ;
}
function  auto_nex_index(){

  if (bool_isclick==true){
    return ;
  }
  var itindex=now_index==2?-1:now_index;

  start_next_index(itindex+1);

  if (bool_isclick==false){
    setTimeout(auto_nex_index,4000);
  }
}
var phoneslenth;
var phoneindex=0;
setInterval(function (){
  if (phoneindex==0){
    goumais.style.transition="all 0s ease-in";
  }
  if (phoneindex==1){
    goumais.style.transition="all 0.3s ease-in";
  }
 goumais.style.transform="translateY("+phoneindex*-35+"px)";

  phoneindex++;
  if (phoneindex==phoneslenth){
    phoneindex=0;
  }
},4000);
function start_next_index(index){
  index_objs[now_index].className="index_banner";
  index_objs[index].className+=" index_banner_active";
    xuanchuan.className="xuanchuan"+index;
  now_index=index;
}
var senttimes=0;
function hangyesent(){
  var cmd = {"hangye":   document.getElementById("input").value};
  document.getElementById("input").value=null;
  chat.window.postMessage(cmd, '*');

  if (senttimes==0){
    document.getElementById("msgarea").innerHTML="行业人士正在积极的赶来！ 请您稍等片刻";
  }
  senttimes++;

}

function changewenxin(obj){
  obj.className="chathide";
}
function openweixin(){
  document.getElementById("weixin").className="weixin";
}


if (window.localStorage.getItem("time")){
  let today=new Date();
  if (window.localStorage.getItem("time")!=today.getDay().toString()){
    localStorage.removeItem('huanuomsg')
  }
}
window.localStorage.setItem("time",new Date().getDay().toString());
