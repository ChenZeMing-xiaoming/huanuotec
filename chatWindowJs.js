window.$ = function (id) {
    return document.getElementById(id);
};
var LR_imgurl = 'https://pdt.zoosnet.net/lr/';
window.emotionMap = new Object();

emotionMap.Keys = new Array();

emotionMap.Values = new Array();
var v3 =  "zhongqidongliP/15296627234926.jpg";
function initEmotionMap() {
    for (var i = 1; i < 16; i++) {
        emotionMap.Keys.push("\\[\\:" + i + "\\:\\]");
        emotionMap.Values.push("headimg1/" + i + ".gif");
    }
}
initEmotionMap();

function showcontent(m, t, ona, nMsgID) {
    var temphtml = m;
    var tempouttext = temphtml;
    temphtml = f18(temphtml);
    for (var i = 0; i < emotionMap.Keys.length; i++) {
        var key = emotionMap.Keys[i];
        var value = emotionMap.Values[i];
        temphtml = temphtml.replace(new RegExp(key, "gm"), '<img height="64" width="64" src="' + LR_sysurl + "LR/" + value + '">');
    }
    console.log(temphtml);
    console.log(m);
    var m1 = conInfoToBubble1(t,temphtml, ona, nMsgID);
    $("chatMessageArea").innerHTML += m1;
    scrollPage();
    setTimeout("scrollPage()", m.toLowerCase().indexOf("<img ") != -1 ? 2e3 : 300);
}
function scrollPage() {
    $("mainContent").scrollTop = 9999;
    $("texteditor").scrollIntoView(false);
}
function conInfoToBubble1(pclass, content, ona, nMsgID) {
    console.log(nMsgID);
    if (content.replace(/[\s\u3000]*/g, "") == "") return "";
    var str = "";
    if (pclass == "prologue") {
        str += '<div class="msg-box">';
        str += '<div class="msg-agent">';
        str += '<div class="bubble bubble-prologue">';
        str += '<div class="text">';
        str += content;
        str += "</div>";
        str += "</div>";
        str += "</div>";
        str += "</div>";
    } else if (pclass == "info") {
        str = '<div class="msg-box"><div class="msg-system">' + content + "</div></div>";
    } else if (pclass == "operator") {

        var strMsgIDHtml = "";
        if (nMsgID) {
            strMsgIDHtml = "id=\"lr_msg" + nMsgID + "\"";
        }


        str = '<div class="msg-box" ' + strMsgIDHtml + '>';
        str += '<div class="msg-agent">';
        if (v3 != "") str += '<div class="agent-avatar"><img src="' + v3 + '"></div>';
        console.log(v3);
        str += '<div class="arrow_box_left" style="margin-left:' + (v3 != "" ? "50" : "14") + 'px;">   ' + (ona ? '<div class="text1">' + ona + "</div>" : "") + '<div class="text">';
        str += content;
        str += "</div></div>";
        str += "</div>";
        str += "</div>";
    } else {
        var strMsgIDHtml = "";
        var strWithDrawMsgHtml = "";
        str = '<div class="msg-box" style="margin-right:10px;" ' + strMsgIDHtml + '>';
        str += '<div class="msg-client">';
        str += '<div class="arrow_box">';
        str += '<div class="text">';
        str += "";
        str += content;
        str += "</div>";
        str += "</div>";
        str += strWithDrawMsgHtml;
        str += "</div>";
        str += "</div>";
    }
    return str;
}
var LR_sysurl = 'https://pdt.zoosnet.net/';

function User_Send(){
    showcontent($("texteditor").value,"1",true,"1999");
    socket.emit("chatmessage",$("texteditor").value);
    $("texteditor").value="";
}
function inputFocus() {
    $("texteditor").style.borderBottomColor = '#45c01a';
    $("emotionsBox").style.display = $("emotionsBox1").style.display = "none";
    if (window.inputIsFocus) return;
    zhankai = "zhunbei";
    window.inputIsFocus = true;
}
zhiding_h = 0;

function inputclick() {
    inputFocus();
}
function inputBlur() {
    if (!window.inputIsFocus) return;
     $("footer").style.bottom = "0px";
    window.inputIsFocus = false;
    $("texteditor").style.borderBottomColor = '#ebebeb';
}
var lng = 'cn';
var texteditor_null = 0;
function inputChange() {
    var tnull = $("texteditor").value != "";
    if (texteditor_null == tnull) return;
    texteditor_null = tnull;
  //  $("sentButton").src = "ChatM3Img/" + (tnull ? "button_" + lng : "function") + ".png";
 //   $("sentButton").style.height = tnull ? "43px" : "30px";


    //  $("bottomsend").style.top = tnull ? "1px" : "8px";
    $("emotionsBox").style.display = $("emotionsBox1").style.display = "none";
}
function emotionClick() {
    $("emotionsBox1").style.display = "none";
    var emBox = $("emotionsBox");
    if (!window.hasloadface) {
        var _html = new Array();
        for (var i = 0; i < emotionMap.Keys.length; i++) {
            var key = emotionMap.Keys[i].replace("\\[\\:", "").replace("\\:\\]", "");
            var value = emotionMap.Values[i];
            _html.push('<li ontouchstart="addEmotion(this); return false;" name="' + key + '">');
            _html.push('<img src="' + LR_imgurl + value + '">');
            _html.push("</li>");
        }
        emBox.innerHTML = _html.join("");
        window.hasloadface = true;
    }
    if (emBox.style.display == "none") {
        emBox.style.display = "block";
    } else {
        emBox.style.display = "none";
    }
}
function addEmotion(span) {
    var editor = $("texteditor");
    editor.value += "[:" + span.getAttribute("name") + ":]";
    $("emotionsBox").style.display = "none";
    inputChange();
}


function excludeE(strhtml) {
    var arr, ptn, s, t;
    ptn = /<.*?onresize.*?>/ig;
    arr = strhtml.match(ptn);
    if (arr == null) return strhtml;
    for (i = 0; i < arr.length; i++) {
        s = arr[i];
        t = s.replace(/onresize/ig, 'onresize' + i);
        strhtml = strhtml.replace(s, t);
    }
    return strhtml;
}
function f18( str) {
    return excludeE(convertToHtml(str));
}
function convertToHtml(str) {
    return convertIMG(str.replace(/ /g, '&nbsp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\r\n/g, '<br>').replace(/\n/g, '<br>').replace(/\"/g, '&quot;').replace(/\'/g, '&#39;'));
}
function convertIMG(str) {
    var arr, arr1, re, s;
    re = /{img:.*?}/g;
    arr = str.match(re);
    if (arr == null) return str;
    for (i = 0; i < arr.length; i++) {
        arr1 = arr[i].match(re);
        if (arr1 == null) return str;
        if (arr1.length == 1) {
            s = arr1[0].substring(arr1[0].indexOf(':') + 1, arr1[0].indexOf('}'));
            str = str.replace(arr1, '<img src=' + s + ' border=0 height=64>');
        }
    }
    return str;
}
function LR_GetObj(id, theDoc) {
    if (!theDoc) {
        theDoc = document;
    }
    if (theDoc.getElementById) {
        return theDoc.getElementById(id);
    } else if (document.all) {
        return theDoc.all(id);
    }
}
var minRows = 1;
var maxRows = 3;
function autoResize() {
    var LR_IOS_12_2 = LR_checkagent("ipad|iphone|ipod") && LR_checkagent('safari') && LR_checkagent('12_');
    var t = $("texteditor");
    if (t.scrollTop == 0) t.scrollTop = 1;
    while (t.scrollTop == 0) {
        if (t.rows > minRows) {
            t.rows--;
        } else
            break;
        t.scrollTop = 1;
        if (t.rows < maxRows)
            t.style.overflowY = "hidden";
        if (t.scrollTop > 0) {
            t.rows++;
            break;
        }
    }
    while (t.scrollTop > 0) {
        if (t.rows < maxRows) {
            t.rows++;
            if (t.scrollTop == 0) t.scrollTop = 1;
        } else {
            t.style.overflowY = "auto";
            break;
        }
    }
    $('bottomtip').style.display = (t.rows == 1 ? 'block' : 'none');
}
function LR_checkagent(_lr_na) {
    var _lr_o = _lr_na.split("|");
    for (_lr_w = 0; _lr_w < _lr_o.length; _lr_w++) {
        if (navigator.userAgent.toLowerCase().indexOf(_lr_o[_lr_w]) > -1) return true;
    }
    return false;
}
function hideme() {
    var cmd = {"post": "hide"};
    window.parent.postMessage(cmd, '*');
}
