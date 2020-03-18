<template>
  <div>
    <br><br>
    <el-row>
      <el-col :span="7">&nbsp;</el-col>
      <img src="../../img/logo1.png" alt="学校图标">
    </el-row>
     <br>
    <el-row>
      <el-col :span="8">&nbsp;</el-col>
      <div>
        <strong style="font-size: 42px; font-family:SimSun">&nbsp;欢迎登录线上考试系统!</strong>
      </div>
    </el-row>
     <br>
    <div class="formStyle">
      <span>Designed by Wu Peng</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {

    }
  },
  computed: {
  },
  created() {

  }
}
</script>
<style  scoped>
.formStyle {
  font-style: italic;font-size: 20px;float:right;padding-right: 15%;
}
</style>
