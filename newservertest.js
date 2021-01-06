var ws = require('nodejs-websocket');
var port=8888
var server = ws.createServer(function(conn){
    //受到连接触发//
//在服务端cmd安装npm install nodejs-websocket//
    console.log('new connection');
    conn.on("text",function(str){
        // 收到信息触发     接收 //
        console.log("received"+str)
        boardcast(str) // 广播消息 //
        conn.sendText(str) // 发送 数据 //
    })
    conn.once('data', function (data) {
        data = data.toString();
        //查看请求头中是否有升级websocket协议的头信息
        if (data.match(/Upgrade: websocket/)) {
            console.log("请求升级");
            let rows = data.split('\r\n');
            //去掉第一行的请求行
            //去掉请求头的尾部两个空行
            rows = rows.slice(1, -2);
            let headers = {};
            rows.forEach(function (value) {
                let [k, v] = value.split(': ');
                headers[k] = v;
            });
            //判断websocket的版本
            if (headers['Sec-WebSocket-Version'] == 13) {
                let secWebSocketKey = headers['Sec-WebSocket-Key'];
                //计算websocket校验
                let secWebSocketAccept = getSecWebSocketAccept(secWebSocketKey);
                //服务端响应的内容
                let res = [
                    'HTTP/1.1 101 Switching Protocols',
                    'Upgrade: websocket',
                    `Sec-WebSocket-Accept: ${secWebSocketAccept}`,
                    'Connection: Upgrade',
                    '\r\n'
                ].join('\r\n');
                //给客户端发送响应内容
                socket.write(res);
            }
        }
    })
    conn.on("error",function(err){
        // 出错触发 //
        console.log("header err")
        console.log(err)
    })
    function boardcast(str){  // 广播 //
        // server.connections  保存每个连接进来的用户 //
        server.connections.forEach(function(conn){   //  .forEach 是调用数组里每个元素  //
            conn.sendText(str)
        })
    }
}).listen(port)
console.log("websocket server listen port is" + port)