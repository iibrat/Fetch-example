<script>

export default {
  data() {
    return {
      // resData: ''
    }
  },
  methods: {
    async onCheck() {

      // 本地测试 '/hello' = 'http://localhost:3000/hello'
      // 用 fetch 发起请求
      let res = await fetch('/hello')

      // new TextDecoderStream() 将二进制数据转换成字符串数据
      // pipeThrough() 将body响应体转换成 ReadableStreamDefaultReader 对象
      // pipeThrough() 中的参数 new TextDecoderStream() 这是一个构造函数，创建一个类，
      // 这个类可以将 body的二进制数据转换成字符串数据
      // getReader() 获取 ReadableStreamDefaultReader 对象，这个对象可以用来逐块读取服务端逐块
      // 发送过来的数据。
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()

      // 循环读取服务端发送过来的数据
      while (true) {

        // 获取 reader.read() 中的属性 done 和 value
        // done：done 默认为 false, 服务端数据发送完毕后会调用 res.end() 此时 done==false
        // 用来表示数据发送完毕，下面 if(done) 就是用来验证数据是否发送完毕
        // value：服务端发送过来的数据
        const { done, value } = await reader.read()

        // 如果数据发送完毕，break 跳出循环
        if (done) {
          console.log(done)
          break
        }

        // 输出服务端发送来的数据。如果上面 done==true 这里的代码不会执行，因为 break 跳出了循环。
        console.log(`这是服务端返回的数据：${value}`)
        // this.resData += resData
      }

    }
  }
}


</script>

<template>
  <el-button @click="onCheck">Fetch请求</el-button>
  <!-- <div>{{ resData }}</div> -->
</template>

<style scoped></style>
