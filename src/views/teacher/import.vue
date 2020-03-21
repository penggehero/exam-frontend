<template>
  <div class="formStyle">
    <br>
    <div style="text-align: center">
      <strong style="font-size: 40px">试卷导入</strong>
    </div>
    <br>
    <div style="margin-top: 20px;margin-left: 30%;">
      <div>
        <span>
          试卷模板下载：
        </span>
        <el-button type="warning" @click="download()">下载</el-button>
        <a v-show="false" id="download" href="/api/paper/download">下载</a>
      </div><br>
      <div>
        <span>
          试卷名称：
        </span>
        <el-input v-model="dataList.name" style="width: 50%" placeholder="请输入试卷名称" />
      </div><br>
      <div>
        <span>
          考试时间：
        </span>
        <el-input v-model="dataList.time" style="width: 50%" placeholder="请输入考试时间(单位分钟)" type="number" />
      </div><br>
      <div>
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
          style="width: 50%"
        >
          <span style="float:left;padding-top: 8px">
            选择试卷： &nbsp;&nbsp;
          </span>
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </div>
      <br>
      <div>
        <span>
          上传试卷：
        </span>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >导入试卷<i class="el-icon-upload el-icon--right" /></el-button>
      </div><br>
    </div>
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
      },
      papers: []
    }
  },
  methods: {
    download() {
      const el = document.getElementById('download')
      el.click()
    },
    clear() {
      this.dataList.name = undefined
      this.dataList.time = undefined
      this.papers = []
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (parseInt(this.dataList.time) <= 0) {
        this.$notify({
          title: '提示信息',
          message: '考试时间要求大于0!',
          type: 'error',
          position: 'bottom-right'
        })
        return false
      }
      if (this.dataList.name === undefined || this.dataList.name === '') {
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
      if (response.status === 1) {
        this.$notify({
          title: '提示信息',
          message: '导入试卷成功!',
          type: 'success',
          position: 'bottom-right'
        })
        this.clear()
        setTimeout(() => {
          this.$router.push('/paperManage/paperManage')
        }, 1500)
      } else {
        this.$notify({
          title: '提示信息',
          message: '导入试卷失败!' + response.msg,
          type: 'error',
          position: 'bottom-right'
        })
        this.papers = []
      }
      console.log(response)
    },
    handleError(error) {
      this.$notify({
        title: '提示信息',
        message: '导入试卷失败!' + error,
        type: 'error',
        position: 'bottom-right'
      })
    }
  }
}
</script>
<style  scoped>
.formStyle {
  margin: 10px 10px 10px 10px;
}
</style>

