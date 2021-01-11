window.$ = function (id) {
    return document.getElementById(id);
};
var LR_imgurl = 'https://pdt.zoosnet.net/lr/';
window.emotionMap = new Object();

emotionMap.Keys = new Array();

emotionMap.Values = new Array();
var v3 = unescape("http%3a%2f%2fpdt.zoosnet.net%2fsite%2f64669974%2fchat_left_img_share_cn.jpg");

function initEmotionMap() {
    for (var i = 1; i < 16; i++) {
        emotionMap.Keys.push("\\[\\:" + i + "\\:\\]");
        emotionMap.Values.push("headimg1/" + i + ".gif");
    }
}

initEmotionMap();
var now_clientCookie;
var clients = new Array();

function choisepeople(e) {
    e.className="people";
    e.className += " choisepeople";
    now_clientCookie = e.innerHTML;
    showallmsg(clients[e.innerHTML]);
}

var chatitem = new Array();

function client(cookie, obj) {
    this.cookie = cookie;
    this.link = true;
    this.msgs = new Array();
    this.titleobj = obj;
}

function User_Send() {
    console.log(111);
    rebuildadd($("texteditor").value+"☆", "1", true, "1999");
    socket.emit("chatmessage", now_clientCookie + "◇" + $("texteditor").value);
    clients[now_clientCookie].msgs.push($("texteditor").value + "☆")
    $("texteditor").value = "";
}
function hangyeUser_Send() {
    console.log(111);
    rebuildadd($("texteditor").value+"☆", "1", true, "1999");
    socket.emit("hangyemessage", now_clientCookie + "◇" + $("texteditor").value);
    clients[now_clientCookie].msgs.push($("texteditor").value + "☆")
    $("texteditor").value = "";
}
function anlizeMsgOrnew(m,t) {
    let cookie = m.split("◇")[0];

    let msg = m.split("◇")[1];
    if (t=="hangye"){sentButton
        msg="专家问题解答："+msg;
    }
    if (!clients[cookie])
        clients[cookie] = new client(cookie, creatpeoplehtml(cookie));
    clients[cookie].msgs.push(msg);
    if (now_clientCookie == cookie)
        rebuildadd(msg, t, "华诺社保-小鱼 15713868295（同微信）", "1999");
    else
        clients[cookie].titleobj.className += " chatmsgpeople";

}

function rebuildadd(m, t, ona, nMsgID) {
    if (hideindex >= 0 && hideindex < $("chatMessageArea").children.length - 1) {
        resetcontent(hideindex, m);
    } else {
        hideindex = -1;
        addcontent(t, m, ona, nMsgID);
    }
    scrollPage();
    setTimeout("scrollPage()", m.toLowerCase().indexOf("<img ") != -1 ? 2e3 : 300);

}

function autochantge(msg, obj) {

    let itobj = obj.children.item(0);
    if (msg.match("☆")) {
        itobj.className = "msg-client";
        itobj.children.item(0).className="arrow_box";
    } else {
        itobj.className = "msg-agent";
        itobj.children.item(0).className="arrow_box_left";
    }
}

var hideindex = -1;

function showallmsg(people) {
    let are = $("chatMessageArea");
    if (people.msgs.length > are.children.length) {
        hideindex = -1;
    } else {
        hideindex = people.msgs.length;
    }
    for (let i = 0; i < are.children.length; i++) {
        let obj = are.children.item(i);
        if (people.msgs[i]) {
            let msg = people.msgs[i]
            obj.className = "msg-box";
            autochantge(msg, obj);

            obj.getElementsByClassName("text").item(0).innerHTML = people.msgs[i];
        } else {
            obj.className += " hide"
        }
    }
    if (people.msgs.length > are.children.length) {
        for (let i = are.children.length; i < people.msgs.length; i++) {
            let msg = people.msgs[i];
            if (msg.match("☆")) {
                addcontent("", msg, "华诺社保-小鱼 15713868295（同微信）", "1999")
            } else {
                addcontent("operator", msg, "华诺社保-小鱼 15713868295（同微信）", "1999")
            }
        }
    }

}

function scrollPage() {
    $("mainContent").scrollTop = 9999;
    $("texteditor").scrollIntoView(false);
}

function creatpeoplehtml(id) {
    let str;
    var parent = document.getElementById("peoplelist");
    var child = document.createElement("div");
    child.className = "people"
    child.onclick = function () {
        choisepeople(child);
    }
    child.innerHTML = id;
    parent.appendChild(child);
    return child;
}

function resetcontent(index, content) {
    var temphtml = content;
    var tempouttext = temphtml;
    temphtml = f18(temphtml);
    for (var i = 0; i < emotionMap.Keys.length; i++) {
        var key = emotionMap.Keys[i];
        var value = emotionMap.Values[i];
        temphtml = temphtml.replace(new RegExp(key, "gm"), '<img height="64" width="64" src="' + LR_sysurl + "LR/" + value + '">');
    }
    if (content.replace(/[\s\u3000]*/g, "") == "") return "";
    content = temphtml;

    var str = "";
    let obj = $("chatMessageArea").children.item(index);
    obj.className = "msg-box";
    if (!content.match("☆")) {
        obj.children.item(0).className = "msg-agent";
        obj.children.item(0).children.item(0).className="arrow_box_left";


    } else {
        obj.children.item(0).className = "msg-client";
        obj.children.item(0).children.item(0).className="arrow_box";

    }
    obj.getElementsByClassName("text").item(0).innerHTML = content;

    hideindex++;

}

function addcontent(pclass, content, ona, nMsgID) {
    var temphtml = content;
    var tempouttext = temphtml;
    temphtml = f18(temphtml);
    for (var i = 0; i < emotionMap.Keys.length; i++) {
        var key = emotionMap.Keys[i];
        var value = emotionMap.Values[i];
        temphtml = temphtml.replace(new RegExp(key, "gm"), '<img height="64" width="64" src="' + LR_sysurl + "LR/" + value + '">');
    }
    if (content.replace(/[\s\u3000]*/g, "") == "") return "";
    content = temphtml;

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
    } else if (pclass == "hangye") {
        var strMsgIDHtml = "";
        if (nMsgID) {
            strMsgIDHtml = "id=\"lr_msg" + nMsgID + "\"";
        }
        str = '<div class="msg-box" ' + strMsgIDHtml + '>';
        str += '<div class="msg-agent">';
        str += '<div class="arrow_box_left">';
        str += '<div class="text">';
        str += content;
        str += "</div></div>";
        str += "</div></div>";
    } else if (pclass == "operator") {

        var strMsgIDHtml = "";
        if (nMsgID) {
            strMsgIDHtml = "id=\"lr_msg" + nMsgID + "\"";
        }
        str = '<div class="msg-box" ' + strMsgIDHtml + '>';
        str += '<div class="msg-agent">';
        str += '<div class="arrow_box_left">';
        str += '<div class="text">';
        str += content;
        str += "</div></div>";
        str += "</div></div>";
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
    $("chatMessageArea").innerHTML += str;
}

var LR_sysurl = 'https://pdt.zoosnet.net/';


zhiding_h = 0;

function inputFocus() {
    $("texteditor").style.borderBottomColor = '#45c01a';
    $("emotionsBox").style.display = $("emotionsBox1").style.display = "none";
    if (window.inputIsFocus) return;
    zhankai = "zhunbei";
    window.inputIsFocus = true;
}

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

function f18(str) {
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
