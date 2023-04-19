<script>

export default {
  data() {
    return {
    }
  },
  methods: {
    async onCheck() {

      // 用fetch向服务器发送请求
      let res = await fetch('/hello')
      //用res.body.getReader()获取数据流内容
      //pipeThrough(new TextDecoderStream()) 这个是用来转换数据格式
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          console.log(done)
          break
        }
        console.log(`这是服务端返回的数据：${value}`)
      }

    }
  }
}


</script>

<template>
  <el-button @click="onCheck">提交</el-button>
</template>

<style scoped></style>
