const express = require("express");
const ViteExpress = require("vite-express");

const app = express();

app.get("/hello", (req, res) => {
  // res.send("Hello Vite + Vue!");
  // 设置响应头
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  // console.log("收到")

  // mock 数据测试，每隔 300 ms 发送数字给前端，1-29
  let i = 1;
  let END_COUNT = 10
  let timer = setInterval(() => {
    //每次调用res.write()都会向客户端发送一块数据，如果数据全部发送完调用res.end()通知客户端数据发送完毕（done=true）
    res.write(`data:${i++}\n\n`);
    if (i === END_COUNT) {
      // 最后向客户端发送的内容，这里可以不写
      // res.write(`data:结束\n\n`);
      //数据全部发送完毕 done=true 客户端用if(done)判断是否发送完毕
      res.end()
      clearInterval(timer)
    }
  }, 300)

});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
