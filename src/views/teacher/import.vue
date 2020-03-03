<template>
  <div class="formStyle">
    <el-row>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="12">
        <el-input v-model="dataList.name" placeholder="请输入试卷名称" />
        <el-input v-model="dataList.time" placeholder="请输入考试时间" type="number" />
        <el-upload
          ref="upload"
          class="upload-demo"
          action="/api/paper/import"
          :data="dataList"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          :file-list="papers"
          multiple
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="primary"
            @click="submitUpload"
          >上传文件</el-button>
        </el-upload>
      </el-col>
    </el-row>
    {{ dataList }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: {
        teacher_id: sessionStorage.getItem('id'),
        teacher: sessionStorage.getItem('username'),
        name: undefined,
        time: undefined
      }
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!this.time > 0) {
        this.$notify({
          title: '提示信息',
          message: '考试时间要求大于0!',
          type: 'error',
          position: 'bottom-right'
        })
        return false
      }
      if (!this.name) {
        this.$notify({
          title: '提示信息',
          message: '考试名称不能为空!',
          type: 'error',
          position: 'bottom-right'
        })
        return false
      }
      if (!isLt2M) {
        this.$notify({
          title: '提示信息',
          message: '试卷大小不能超过 2MB!',
          type: 'error',
          position: 'bottom-right'
        })
      } return isLt2M
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(dataList) {
      console.log(dataList)
    },
    handlePreview(dataList) {
      console.log(dataList)
    },
    handleSuccess(response) {
      console.log(response)
    }
  }
}
</script>
<style  scoped>
.formStyle {
  margin: 10px 10px 10px 10px;
}
</style>

