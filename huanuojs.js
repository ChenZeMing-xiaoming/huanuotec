

var index_objs;
var toptext_objs;
var topsmalltext_objs;
var xiangxi_btn;
var myheader;
var startx ;
var starty ;
window.onload=function (){
  index_objs= document.getElementsByClassName("index_banner");
  toptext_objs= document.getElementsByClassName("top_text");
  topsmalltext_objs= document.getElementsByClassName("top_smalltext");
  xiangxi_btn=document.getElementById("ccc");
  myheader=document.getElementById("myheader");
  xiangxi_btn.addEventListener("animationend",function (){
    xiangxi_btn.className="xqliaojie";
  });
  myheader.addEventListener("touchstart", function(e){
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
  }, false);
//手指离开屏幕
  myheader.addEventListener("touchend", function(e) {
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

}
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
setTimeout(auto_nex_index,4000);
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

function start_next_index(index){

  index_objs[now_index].className="index_banner";
  toptext_objs[now_index].className="top_text";
  topsmalltext_objs[now_index].className="top_smalltext";


  index_objs[index].className+=" index_banner_active";
  toptext_objs[index].className+=" fadeUp";
  topsmalltext_objs[index].className+=" fadeUp";


  if ( xiangxi_btn.getAnimations().length>0)
  {
    if ( xiangxi_btn.getAnimations()[0].playState=="running")
    {
      xiangxi_btn.getAnimations()[0].currentTime=0;
    }
  }
  xiangxi_btn.className+=" fadeUpIn";
  now_index=index;

}

