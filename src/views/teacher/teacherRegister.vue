<template>
  <div>
    <br>
    <el-row>
      <el-col :span="8">&nbsp;</el-col>
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
            <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" />
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
          <el-form-item label="注册码:" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入注册码" />
          </el-form-item>
          <el-form-item>
            <span>  <el-button type="primary" @click="back()">返回登录页</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
            </span>
            <span style="float:right;"><el-button type="success" @click="submitForm('ruleForm')">注册</el-button></span>
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
        username: '',
        password: '',
        name: '',
        college: '',
        work_id: '',
        sex: '',
        code: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空!', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空!', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        name: [{ required: true, message: '真实姓名不能为空!', trigger: 'blur' }, { max: 10, message: '最长为 10 个字符', trigger: 'blur' }],
        age: [{ required: true, message: '年龄不能为空!', trigger: 'blur' }, { max: 10, message: '最长为 10 个字符', trigger: 'blur' }],
        college: [{ required: true, message: '学院不能为空!', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        work_id: [{ required: true, message: '工号不能为空!', trigger: 'blur' }],
        code: [{ required: true, message: '注册码不能为空!', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post('/api/teacher/add', this.ruleForm)
            .then(response => {
              if (response.data.status === 1) {
                this.$notify({
                  title: '提示信息',
                  message: '操作成功',
                  type: 'success',
                  position: 'bottom-right'
                })
                this.$refs[formName].resetFields()
                setTimeout(() => {
                  this.$router.push('/login')
                }, 2000)
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
                message: '注册失败',
                type: 'error',
                position: 'bottom-right'
              })
            })
        } else {
          console.log('提交失败!')
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
