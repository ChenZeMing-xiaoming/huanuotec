let socket = io("http://192.168.1.104:3000");
socket.emit("chatmessage","userconnect");
socket.on('chatmessage', (data) => {
    showcontent(data,"operator","华诺社保-小鱼 15713868295（同微信）","1999");

    var cmd = {"msg": ""};
    window.parent.postMessage(cmd, '*');
});
socket.on('receiveImg', (data) => {
    let ImgDIV = document.createElement('div');
    ImgDIV.innerHTML = `<div>${data.id}: <img src="${data.img}" /></div>`;
    showbox.appendChild(ImgDIV);
})

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