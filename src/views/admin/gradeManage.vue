<template>
  <div class="formStyle">
    <div style="text-align: justify; margin-top: 20px;margin-left: 20px;">
      考试名称：
      <el-input
        v-model="t_name"
        placeholder="请输入内容"
        maxlength="15"
        clearable
        style="width: 20%;margin-bottom: 20px;"
        @keyup.enter.native="handleFilter"
      /> &nbsp;&nbsp;&nbsp;&nbsp;
      学生姓名：
      <el-input
        v-model="t_student"
        placeholder="请输入内容"
        maxlength="15"
        clearable
        style="width: 20%;margin-bottom: 20px;"
        @keyup.enter.native="handleFilter"
      />
      <br>
      <br>
      <br>
    </div>
    <div style=" border-radius: 10px;margin-bottom: 5px;margin-right:20px;float: right;">
      <el-button type="primary" plain icon="el-icon-search" @click="search()">搜索</el-button>
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
      <el-table-column prop="student_name" label="学生姓名" align="center" />
      <el-table-column prop="school_id" label="学号" align="center" />
      <el-table-column prop="paper_name" label="考试名称" align="center" />
      <el-table-column prop="date" label="完成时间" align="center" />
      <el-table-column prop="single_mark" label="单选题得分" align="center" />
      <el-table-column prop="double_mark" label="多选题得分" align="center" />
      <el-table-column prop="mark" label="总分" align="center" />
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
        <el-form-item label="学生姓名:" prop="student_mark">
          <el-input v-model="temp.student_name" :disabled="true" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="学号:" prop="school_id">
          <el-input v-model="temp.school_id" :disabled="true" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="单选题得分:" prop="single_mark">
          <el-input v-model="temp.single_mark" type="number" placeholder="请输入得分" />
        </el-form-item>
        <el-form-item label="多选题得分:" prop="single_mark">
          <el-input v-model="temp.double_mark" type="number" placeholder="请输入得分" />
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
  name: 'GradeManage',
  data: () => {
    return {
      tableData: [],
      t_name: '',
      t_student: '',
      temp: {
        id: undefined,
        student_name: undefined,
        school_id: undefined,
        single_mark: undefined,
        double_mark: undefined,
        mark: undefined
      },
      rules: {
        single_mark: [{ required: true, message: '学院不能为空!', trigger: 'blur' }],
        double_mark: [{ required: true, message: '请选择性别', trigger: 'blur' }]
      },
      page: 1,
      rows: 10,
      resultlength: 10,
      dialogDelVisible: false,
      dialogDditVisible: false,
      multipleTable: []
    }
  },
  created() {
    this.search()
  },
  methods: {
    clearEdit() {
      this.temp.id = undefined
      this.temp.school_id = undefined
      this.temp.student_name = undefined
      this.temp.single_mark = undefined
      this.temp.double_mark = undefined
      this.temp.mark = undefined
    },
    handclearsearch() {
      this.t_name = ''
      this.t_student = ''
      this.search()
    },
    search() {
      axios
        .get('/api/grade/search', { params: this.getParam() })
        .then(res => {
          this.tableData = res.data.resultData.datalist
          this.resultlength = res.data.resultData.total
        })
    },
    cancel() {
      this.dialogDditVisible = false
      this.clearEdit()
    },
    addSure() {
      if (this.temp.single_mark <= 0 || this.temp.double_mark <= 0) {
        this.$notify({
          title: '错误信息',
          message: '得分不能为负数!',
          type: 'error',
          position: 'bottom-right'
        })
        return
      }
      this.temp.mark = parseInt(this.temp.single_mark) + parseInt(this.temp.double_mark)
      axios
        .put('/api/grade/update', this.temp)
        .then(response => {
          if (response.data.status === 1) {
            this.$notify({
              title: '提示信息',
              message: '操作成功',
              type: 'success',
              position: 'bottom-right'
            })
            this.cancel()
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
        this.clearEdit()
        // 跳转页面
        var te = this.multipleTable[0]
        this.temp.id = te.id
        this.temp.school_id = te.school_id
        this.temp.student_name = te.student_name
        this.temp.single_mark = te.single_mark
        this.temp.double_mark = te.double_mark
        this.dialogDditVisible = true
      }
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
        .put('/api/grade/delete', data)
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
    handleSizeChange: function(size) {
      this.rows = size
      this.search()
    },
    handleCurrentChange: function(page) {
      this.page = page
      this.search()
    },
    // 获取表格选中值
    handleSelectionChange(val) {
      this.multipleTable = val
    },
    getParam: function() {
      return {
        page: this.page,
        rows: this.rows,
        student_name: this.t_student,
        paper_name: this.t_name
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
