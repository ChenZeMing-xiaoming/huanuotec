var socket = io("http://huanuotec.cn");
window.addEventListener('message',function (e){
    console.log(e.data.hangye)
    if (e.data.hangye!=undefined){
        questsent(e.data.hangye);
    }
})
socket.emit("chatmessage","userconnect");
socket.on('chatmessage', (data) => {
    showcontent(data,"operator","华诺社保-小鱼                  ","1999");
    var cmd = {"msg": ""};
    window.parent.postMessage(cmd, '*');
    window.localStorage.setItem("huanuomsg",window.localStorage.getItem("huanuomsg")+"○" +"★"+ data)
});

socket.on('hangyemessage', (data) => {
    var cmd = {"hangye": "陈**为您解答:"+data};
    window.parent.postMessage(cmd, '*');
});
socket.on('receiveImg', (data) => {
    let ImgDIV = document.createElement('div');
    ImgDIV.innerHTML = `<div>${data.id}: <img src="${data.img}" /></div>`;
    showbox.appendChild(ImgDIV);
})

function questsent(msg){
    socket.emit("hangyemessage",msg);
}
let sendImg = () => {
    let Imginput = document.getElementById('tupian');
    let file = Imginput.files[0];       //得到该图片
    let reader = new FileReader();      //创建一个FileReader对象，进行下一步的操作
    reader.readAsDataURL(file);              //通过readAsDataURL读取图片
    reader.onload =function () {            //读取完毕会自动触发，读取结果保存在result中
        let data = {img: this.result};
        socket.emit('sendImg', data);
    }
};
