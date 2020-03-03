<template>
  <div class="formStyle">
    <div style="text-align: justify; margin-top: 20px;margin-left: 20px;">
      学生姓名：
      <el-input
        v-model="t_name"
        placeholder="请输入内容"
        maxlength="15"
        clearable
        style="width: 20%;margin-bottom: 20px;"
        @keyup.enter.native="handleFilter"
      /> &nbsp;&nbsp;&nbsp;&nbsp;
      学号：
      <el-input
        v-model="t_school_id"
        placeholder="请输入内容"
        maxlength="15"
        clearable
        style="width: 20%;margin-bottom: 20px;"
        @keyup.enter.native="handleFilter"
      />
      <br>
      <br>
    </div>
    <div style=" border-radius: 10px;margin-bottom: 5px;margin-right:20px;float: right;">
      <el-button type="primary" plain icon="el-icon-search" @click="searchbuttonclick()">搜索</el-button>
      <el-button type="primary" plain icon="el-icon-refresh" @click="handclearsearch()">重置</el-button>
      <el-button type="primary" plain icon="el-icon-delete" @click="readyDelete()">刪除</el-button>
      <el-button type="primary" plain icon="el-icon-edit" @click="handleEdit()">修改</el-button>
    </div>
    <br>
    <br>
    <br>
    <!-- 表格控件区 -->
    <el-table
      :data="tableData"
      border
      fit
      highlight-current-row
      :header-cell-style="{background:'#ecf5ff',fontSize:'14px',color:'#606266'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column class="g_tableSelection" type="selection" />
      <el-table-column type="index" label="序号" width="60px" align="center" />
      <el-table-column v-if="false" prop="id" label="逻辑主键" align="center" />
      <el-table-column prop="username" label="用户名" align="center" />
      <el-table-column prop="password" label="密码" align="center" />
      <el-table-column prop="name" label="姓名" align="center" />
      <el-table-column prop="sex" label="性别" align="center" />
      <el-table-column prop="school_id" label="学号" align="center" />
      <el-table-column prop="college" label="院系名称" align="center" />
      <el-table-column prop="major" label="专业名称" align="center" />
      <el-table-column prop="grade" label="所在年级" align="center" />
    </el-table>

    <!-- 分页控件区 -->
    <el-pagination
      style="float:right"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="rows"
      :total="resultlength"
      layout="total,sizes,prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!--删除对话框-->
    <el-dialog :visible.sync="dialogDelVisible" :close-on-click-modal="false" width="30%" center>
      <div>删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog v-if="dialogDditVisible" :visible.sync="dialogDditVisible" :close-on-click-modal="false" width="30%" center>
      <el-form ref="temp" :model="temp" label-position="left" :rules="rules">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="temp.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="temp.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="真实姓名:" prop="name">
          <el-input v-model="temp.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="temp.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学号:" prop="school_id">
          <el-input v-model="temp.school_id" type="number" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="学院:" prop="college">
          <el-select v-model="temp.college" placeholder="请选择学院">
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
        <el-form-item label="专业:" prop="major">
          <el-input v-model="temp.major" placeholder="请输入专业" />
        </el-form-item>
        <el-form-item label="年级:" prop="grade">
          <el-input v-model="temp.grade" type="number" placeholder="请输入年级" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain icon="el-icon-refresh" @click="cancel()">取消</el-button>
        <el-button type="primary" plain icon="el-icon-edit" @click="addSure()">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'TeacherTable',
  data: () => {
    return {
      tableData: [],
      t_name: '',
      t_school_id: '',
      temp: {
        id: undefined,
        college: undefined,
        username: undefined,
        password: undefined,
        sex: undefined,
        school_id: undefined,
        major: undefined,
        grade: undefined
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空!', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空!', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        name: [{ required: true, message: '真实姓名不能为空!', trigger: 'blur' }, { max: 10, message: '最长为 10 个字符', trigger: 'blur' }],
        age: [{ required: true, message: '年龄不能为空!', trigger: 'blur' }, { max: 10, message: '最长为 10 个字符', trigger: 'blur' }],
        college: [{ required: true, message: '学院不能为空!', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        school_id: [{ required: true, message: '学号不能为空!', trigger: 'blur' }],
        major: [{ required: true, message: '专业不能为空!', trigger: 'blur' }, { max: 10, message: '最长为 10 个字符', trigger: 'blur' }],
        grade: [{ required: true, message: '年级不能为空!', trigger: 'blur' }, { max: 10, message: '最长为 10 个字符', trigger: 'blur' }]
      },
      id: undefined,
      college: undefined,
      username: undefined,
      password: undefined,
      sex: undefined,
      school_id: undefined,
      major: undefined,
      grade: undefined,
      page: 1,
      rows: 10,
      resultlength: 10,
      g_p_name: '',
      dialogDelVisible: false,
      dialogDditVisible: false,
      multipleTable: []
    }
  },
  created() {
    this.search()
    // axios
    //   .get('/api/b03res/area/getAllParkAndRoom')
    //   .then(res => {
    //     this.ops = res.data.resultData.allParks
    //     this.ops1 = res.data.resultData.allRooms
    //   })
  },
  methods: {
    search: function() {
      axios
        .get('/api/student/search', { params: this.getParam() })
        .then(res => {
          var datalist2 = res.data.resultData.datalist
          datalist2.forEach((value) => {
            if (value.sex === 1) {
              value.sex = '男'
            } else if (value.sex === 0) {
              value.sex = '女'
            }
          })
          this.tableData = datalist2
          this.resultlength = res.data.resultData.total
        })
    },
    // 获取表格选中值
    handleSelectionChange(val) {
      this.multipleTable = val
    },
    // 删除框提醒
    readyDelete() {
      if (this.multipleTable.length === 0) {
        if (this.notifyInstance) {
          this.notifyInstance.close()
        }
        this.notifyInstance = this.$notify({
          title: '警告信息',
          message: '请选择至少一条数据',
          type: 'warning',
          position: 'bottom-right'
        })
        this.dialogDelVisible = false
      } else {
        this.dialogDelVisible = true
      }
    },
    // 删除事件
    handleDelete() {
      var data = {}
      data.list = []
      for (let i = 0; i < this.multipleTable.length; i++) {
        data.list.push(this.multipleTable[i].id)
      }
      axios
        .put('/api/student/delete', data)
        .then(response => {
          if (response.data.status === 1) {
            this.$notify({
              title: '提示信息',
              message: '操作成功',
              type: 'success',
              position: 'bottom-right'
            })
            this.search()
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
      this.dialogDelVisible = false
    },
    // 修改
    handleEdit() {
      if (this.multipleTable.length === 0) {
        if (this.notifyInstance) {
          this.notifyInstance.close()
        }
        this.notifyInstance = this.$notify({
          title: '警告信息',
          message: '请选择一条数据',
          type: 'warning',
          position: 'bottom-right'
        })
        return
      }
      if (this.multipleTable.length > 1) {
        if (this.notifyInstance) {
          this.notifyInstance.close()
        }
        this.notifyInstance = this.$notify({
          title: '警告信息',
          message: '最多只能选择一条数据进行操作',
          type: 'warning',
          position: 'bottom-right'
        })
      } else {
        // 跳转页面
        var te = this.multipleTable[0]
        if (te.sex === '男') {
          te.sex = 1
        } else if (te.sex === '女') {
          te.sex = 0
        }
        this.temp = te
        this.dialogDditVisible = true
        // this.$router.push({
        //   name: 'editArea',
        //   params: Object.assign({}, this.multipleTable[0])
        // })
      }
    },
    // 搜索框
    searchbuttonclick() {
      this.search()
    },
    // 重置搜索框
    handclearsearch() {
      this.t_name = undefined
      this.t_school_id = undefined
      this.search()
    },
    cancel() {
      this.temp = undefined
      this.multipleTable.forEach((value) => {
        if (value.sex === 1) {
          value.sex = '男'
        } else if (value.sex === 0) {
          value.sex = '女'
        }
      })
      this.dialogDditVisible = false
    }, addSure() {
      axios
        .put('/api/student/update', this.temp)
        .then(response => {
          if (response.data.status === 1) {
            this.$notify({
              title: '提示信息',
              message: '操作成功',
              type: 'success',
              position: 'bottom-right'
            })
            this.search()
            this.cancel()
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
    },
    handleSizeChange: function(size) {
      this.rows = size
      this.search()
    },
    handleCurrentChange: function(page) {
      this.page = page
      this.search()
    },
    getParam: function() {
      return {
        page: this.page,
        rows: this.rows,
        name: this.t_name,
        school_id: this.t_school_id
      }
    }
  }
}
</script>
<style  scoped>
.formStyle{
  margin: 10px 10px 10px 10px;
}
</style>
