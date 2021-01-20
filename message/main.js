var titiles=new Array() ["五险一金","服务种类","常见问题","行业资讯"]
var products
var contentitem;
var topname;
var chatimg;
var chatic;
var request = (function (){
    var obj = {};
    var arr = window.location.search.slice(1).split("&");
    for (var i = 0, len = arr.length; i < len; i++) {
        var nv = arr[i].split("=");
        obj[unescape(nv[0]).toLowerCase()] = unescape(nv[1]);
    }
    return obj;
})()

window.onload=function (){
    active_title.className=1;

    products=document.getElementsByName("title_childs");
    contentitem=document.getElementById("contentitem");
    topname=document.getElementById("topname");

    chatic=document.getElementById("chat");
    chatimg=document.getElementById("chatimg");
    console.log(request.id)

    Anlized(request.id);

    window.addEventListener('message', function (e) {
        console.log(e.data.hangye);

        if (e.data.post=="hide"){
            closeChat();
        }
        if (e.data.msg!=undefined){
            hasChat();
            console.log(e.data);
        }
    })
}
var checktimes=1;
function goback(){
    javascript:history.go(-checktimes);
}

function Anlized(id){
    if (id==undefined)return;
    let itemid=id.split(",")[0];
   titleclickbyid(itemid);
    let itid=id.split(",")[1];
    if (itid.indexOf(-1)>=0)
        return
    clickchildbyid(itid);
}


var active_title={};
var active_child={};
var active_product={};
function titleclick(obj){
    if (obj==active_title)
        return;

    obj.className+=" title_active"
    active_title.className="title";
    active_title=obj;

    console.log(obj.id);

    products.item(obj.id).className="title_childs"
    active_product.className="hide";
    active_product=products.item(obj.id);
}
function titleclickbyid(id){

    let obj=document.getElementById(id);

    if (obj==active_title)
        return;

    obj.className+=" title_active"
    active_title.className="title";
    active_title=obj;

    console.log(obj.id);

    products.item(obj.id).className="title_childs"
    active_product.className="hide";
    active_product=products.item(obj.id);
}
function clickchild(obj){
    if (obj==active_child)
        return;
    obj.className+=" child_active"
    active_child.className="child";
    contentitem.src="c/"+obj.id+".html"
    active_child=obj;
    checktimes++;
   // topname.innerHTML=obj.innerHTML
}
function clickchildbyid(id){
    let obj=document.getElementById(id);

    if (obj==active_child)
        return;
    obj.className+=" child_active"
    active_child.className="child";
    contentitem.src="c/"+obj.id+".html"
    active_child=obj;
   // topname.innerHTML=obj.innerHTML
}