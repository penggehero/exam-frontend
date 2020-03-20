<template>
  <div>
    <br>
    <el-row>
      <el-col :span="7">&nbsp;</el-col>
      <img src="../../img/logo1.png" alt="学校图标">
    </el-row>
    <br>
    <el-row>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="12">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="ruleForm.password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="真实姓名:" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="工号:" prop="work_id">
            <el-input v-model="ruleForm.work_id" type="number" placeholder="请输入工号" />
          </el-form-item>
          <el-form-item label="学院:" prop="college">
            <el-select v-model="ruleForm.college" placeholder="请选择学院">
              <el-option label="计算机科学与信息学院" value="计算机科学与信息学院" />
              <el-option label="经济管理与法学院" value="经济管理与法学院" />
              <el-option label="马克思主义学院" value="马克思主义学院" />
              <el-option label="体育学院" value="体育学院" />
              <el-option label="文学院" value="文学院" />
              <el-option label="外国语学院" value="外国语学院" />
              <el-option label="音乐学院" value="音乐学院" />
              <el-option label="机电与控制工程学院" value="机电与控制工程学院" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>  <el-button type="primary" @click="back()">返回首页</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
            </span>
            <span style="float:right;"><el-button type="success" @click="submitForm('ruleForm')">修改</el-button></span>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      ruleForm: {
        id: '',
        username: '',
        password: '',
        name: '',
        college: '',
        work_id: '',
        sex: ''
      },
      temp: undefined,
      rules: {
        username: [{ required: true, message: '用户名不能为空!', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空!', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        name: [{ required: true, message: '真实姓名不能为空!', trigger: 'blur' }, { max: 10, message: '最长为 10 个字符', trigger: 'blur' }],
        age: [{ required: true, message: '年龄不能为空!', trigger: 'blur' }, { max: 10, message: '最长为 10 个字符', trigger: 'blur' }],
        college: [{ required: true, message: '学院不能为空!', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        work_id: [{ required: true, message: '工号不能为空!', trigger: 'blur' }]
      }
    }
  },
  created() {
    axios
      .get('/api/teacher/searchPerson', { params: { work_id: sessionStorage.getItem('id') }})
      .then(res => {
        this.temp = res.data.resultData
        this.ruleForm = JSON.parse(JSON.stringify(this.temp))
      })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var newObj = JSON.parse(JSON.stringify(this.ruleForm))
          if (this.temp.username === this.ruleForm.username) {
            delete newObj.username
          } if (this.temp.password === this.ruleForm.password) {
            delete newObj.password
          } if (this.temp.name === this.ruleForm.name) {
            delete newObj.name
          } if (this.temp.age === this.ruleForm.age) {
            delete newObj.age
          } if (this.temp.college === this.ruleForm.college) {
            delete newObj.college
          } if (this.temp.sex === this.ruleForm.sex) {
            delete newObj.sex
          } if (this.temp.work_id === this.ruleForm.work_id) {
            delete newObj.work_id
          }
          axios
            .put('/api/teacher/update', newObj)
            .then(response => {
              if (response.data.status === 1) {
                this.$notify({
                  title: '提示信息',
                  message: '操作成功',
                  type: 'success',
                  position: 'bottom-right'
                })
                this.$router.push('/')
              } else {
                this.$notify({
                  title: '错误信息',
                  message: response.data.msg,
                  type: 'error',
                  position: 'bottom-right'
                })
              }
            })
            .catch(() => {
              this.$notify({
                title: '错误信息',
                message: '操作失败',
                type: 'error',
                position: 'bottom-right'
              })
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }, back() {
      this.$router.push('/login')
    }
  }

}
</script>
