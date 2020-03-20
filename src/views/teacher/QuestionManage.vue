<template>
  <div class="formStyle">
    <div style="text-align: justify; margin-top: 20px;margin-left: 20px;">
      试题类型：
      <el-select v-model="t_type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span style="margin-right:20px;float: right;">
        <el-button type="primary" plain icon="el-icon-search" @click="searchbuttonclick()">搜索</el-button>
        <el-button type="primary" plain icon="el-icon-refresh" @click="handclearsearch()">重置</el-button>
        <el-button type="danger" plain icon="el-icon-back" @click="back()">返回</el-button>
      </span>
    </div>
    <br><br>
    <div style=" border-radius: 10px;margin-bottom: 5px;margin-right:20px;float: right;">
      <el-button type="primary" plain icon="el-icon-plus" @click="readyAdd()">添加</el-button>
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
      <el-table-column v-if="false" prop="id" label="逻辑主键" align="center" />
      <el-table-column prop="number" width="60px" label="题目编号" align="center" />
      <el-table-column prop="flag" label="题目类型" width="80px" align="center" />
      <el-table-column prop="name" label="题目名称" align="center" />
      <el-table-column prop="mark" width="50px" label="分值" align="center" />
      <el-table-column prop="q_A" width="100px" label="A选项" align="center" />
      <el-table-column prop="q_B" width="100px" label="B选项" align="center" />
      <el-table-column prop="q_C" width="100px" label="C选项" align="center" />
      <el-table-column prop="q_D" width="100px" label="D选项" align="center" />
      <el-table-column prop="answer" width="60px" label="正确答案" align="center" />
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
        <el-form-item label="题目类型:" prop="flag">
          <el-radio-group v-model="temp.flag" :disabled="editFlag">
            <el-radio :label="0">单选题</el-radio>
            <el-radio :label="1">多选题</el-radio>
            <el-radio :label="2">判断题</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题目编号:" prop="number">
          <el-input v-model="temp.number" placeholder="请输入题目编号" />
        </el-form-item>
        <el-form-item label="分值:" prop="mark">
          <el-input v-model="temp.mark" placeholder="请输入分值" />
        </el-form-item>
        <el-form-item label="题干:" prop="name">
          <el-input v-model="temp.name" type="textarea" :rows="5" placeholder="请输入题干" />
        </el-form-item>
        <div v-if="temp.flag==0||temp.flag==1">
          <el-form-item label="A选项:" prop="q_A">
            <el-input v-model="temp.q_A" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item label="B选项:" prop="q_B">
            <el-input v-model="temp.q_B" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item label="C选项:" prop="q_C">
            <el-input v-model="temp.q_C" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item label="D选项:" prop="q_D">
            <el-input v-model="temp.q_D" placeholder="请输入内容" />
          </el-form-item>
        </div>
        <!-- 单选题 -->
        <el-form-item v-if="temp.flag==0" label="正确答案:" prop="answer">
          <el-radio-group v-model="temp.answer">
            <el-radio label="A">A</el-radio>
            <el-radio label="B">B</el-radio>
            <el-radio label="C">C</el-radio>
            <el-radio label="D">D</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 多选题 -->
        <el-form-item v-if="temp.flag==1" label="正确答案:" prop="answer">
          <el-checkbox-group v-model="temp.answer">
            <el-checkbox label="A">A</el-checkbox>
            <el-checkbox label="B">B</el-checkbox>
            <el-checkbox label="C">C</el-checkbox>
            <el-checkbox label="D">D</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 判断题 -->
        <el-form-item v-if="temp.flag==2" label="正确答案:" prop="answer">
          <el-radio-group v-model="temp.answer">
            <el-radio label="1">对</el-radio>
            <el-radio label="0">错</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain icon="el-icon-refresh" @click="cancel()">取消</el-button>
        <el-button v-if="!editFlag" type="primary" plain icon="el-icon-edit" @click="addSure('temp')">添加</el-button>
        <el-button v-if="editFlag" type="primary" plain icon="el-icon-edit" @click="updateSure('temp')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'QuestionManage',
  data: () => {
    return {
      paper_id: undefined,
      editFlag: false,
      tableData: [],
      t_type: '',
      options: [
        { value: 0, label: '单选题' },
        { value: 1, label: '多选题' },
        { value: 2, label: '判断题' }
      ],
      temp: {
        id: undefined,
        paper_id: undefined,
        number: undefined,
        name: undefined,
        flag: undefined,
        mark: undefined,
        q_A: undefined,
        q_B: undefined,
        q_C: undefined,
        q_D: undefined,
        answer: []
      },
      rules: {
        flag: [{ required: true, message: '请选择题目类型!', trigger: 'blur' }],
        number: [{ required: true, message: '序号不能为空!', trigger: 'blur' }, { pattern: /^[1-9]\d*$/, message: '序号只能为正整数' }],
        mark: [{ required: true, message: '分值不能为空!', trigger: 'blur' }, { pattern: /^[1-9]\d*$/, message: '分值只能为正整数' }],
        name: [{ required: true, message: '题干不能为空!', trigger: 'blur' }, { max: 300, message: '最长300 个字符', trigger: 'blur' }],
        answer: [{ required: true, message: '正确答案不能为空!', trigger: 'blur' }],
        q_A: [],
        q_B: [],
        q_C: [],
        q_D: []
      },
      page: 1,
      rows: 10,
      resultlength: 10,
      dialogDelVisible: false,
      dialogDditVisible: false,
      multipleTable: []
    }
  },
  watch: {
    'temp.flag': {
      handler: function() {
        if (!this.editFlag) {
          this.temp.number = undefined
          this.temp.name = undefined
          this.temp.mark = undefined
          this.temp.q_A = undefined
          this.temp.q_B = undefined
          this.temp.q_C = undefined
          this.temp.q_D = undefined
          this.temp.answer = []
        }
        if (this.temp.flag === 1 || this.temp.flag === 0) {
          var rule = [{ required: true, message: '选项不能为空!', trigger: 'blur' }, { max: 30, message: '最长30 个字符', trigger: 'blur' }]
          this.rules.q_A = rule
          this.rules.q_B = rule
          this.rules.q_C = rule
          this.rules.q_D = rule
        } else {
          this.rules.q_A = []
          this.rules.q_B = []
          this.rules.q_C = []
          this.rules.q_D = []
        }
      }
    }
  },
  created() {
    this.paper_id = this.$route.params.paper_id
    this.temp.paper_id = this.paper_id
    this.search()
  },
  methods: {
    readyAdd() {
      this.editFlag = false
      if (!this.editFlag) {
        this.temp.number = undefined
        this.temp.name = undefined
        this.temp.mark = undefined
        this.temp.q_A = undefined
        this.temp.q_B = undefined
        this.temp.q_C = undefined
        this.temp.q_D = undefined
        this.temp.answer = []
      }
      this.dialogDditVisible = true
    },
    search: function() {
      if (this.paper_id === undefined) {
        this.$router.push('/paperManage/paperManage')
        return
      }
      axios
        .get('/api/question/search', { params: this.getParam() })
        .then(res => {
          this.tableData = res.data.datalist
          this.resultlength = res.data.total
        })
    },
    updateSure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var newObj = JSON.parse(JSON.stringify(this.temp))
          if (this.temp.number === this.multipleTable[0].number) {
            delete newObj.number
          }
          if (this.temp.flag === 1) {
            this.temp.answer.sort()
            var answer = ''
            for (let i = 0; i < this.temp.answer.length; i++) {
              if (i === 0) answer += this.temp.answer[i]
              else answer += ',' + this.temp.answer[i]
            }
            newObj.answer = answer
          }
          axios
            .put('/api/question/update', newObj)
            .then(response => {
              if (response.data.status === 1) {
                this.$notify({
                  title: '提示信息',
                  message: '操作成功',
                  type: 'success',
                  position: 'bottom-right'
                })
                this.clearForm()
                this.search()
                this.dialogDditVisible = false
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
                message: '修改失败',
                type: 'error',
                position: 'bottom-right'
              })
            })
        } else {
          return false
        }
      })
    },
    clearForm() {
      this.temp.number = undefined
      this.temp.name = undefined
      this.temp.flag = undefined
      this.temp.mark = undefined
      this.temp.q_A = undefined
      this.temp.q_B = undefined
      this.temp.q_C = undefined
      this.temp.q_D = undefined
      this.temp.answer = []
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
      data.paper_id = this.paper_id
      data.list = []
      data.number = this.multipleTable.length
      for (let i = 0; i < this.multipleTable.length; i++) {
        data.list.push(this.multipleTable[i].id)
      }
      axios
        .put('/api/question/delete', data)
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
        this.editFlag = true
        this.temp.id = this.multipleTable[0].id
        if (this.multipleTable[0].flag === '单选题') this.temp.flag = 0
        else if (this.multipleTable[0].flag === '多选题') this.temp.flag = 1
        else if (this.multipleTable[0].flag === '判断题') this.temp.flag = 2
        this.temp.number = this.multipleTable[0].number
        this.temp.name = this.multipleTable[0].name
        this.temp.mark = this.multipleTable[0].mark
        this.temp.q_A = this.multipleTable[0].q_A
        this.temp.q_B = this.multipleTable[0].q_B
        this.temp.q_C = this.multipleTable[0].q_C
        this.temp.q_D = this.multipleTable[0].q_D
        if (this.temp.flag === 1) {
          this.temp.answer = []
          var answers = this.multipleTable[0].answer.split(',')
          answers.forEach(element => {
            this.temp.answer.push(element)
          })
        } else if (this.temp.flag === 0) {
          this.temp.answer = this.multipleTable[0].answer
        } else {
          this.temp.answer = this.multipleTable[0].answer === '对' ? '1' : '0'
        }
        this.dialogDditVisible = true
      }
    },
    // 搜索框
    searchbuttonclick() {
      this.search()
    },
    // 重置搜索框
    handclearsearch() {
      this.t_type = ''
      this.search()
    },
    cancel() {
      this.clearForm()
      this.dialogDditVisible = false
    },
    addSure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var newObj = JSON.parse(JSON.stringify(this.temp))
          if (this.temp.flag === 1) {
            this.temp.answer.sort()
            var answer = ''
            for (let i = 0; i < this.temp.answer.length; i++) {
              if (i === 0) answer += this.temp.answer[i]
              else answer += ',' + this.temp.answer[i]
            }
            newObj.answer = answer
          }
          axios
            .post('/api/question/add', newObj)
            .then(response => {
              if (response.data.status === 1) {
                this.$notify({
                  title: '提示信息',
                  message: '操作成功',
                  type: 'success',
                  position: 'bottom-right'
                })
                this.clearForm()
                this.search()
                this.dialogDditVisible = false
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
                message: '添加失败',
                type: 'error',
                position: 'bottom-right'
              })
            })
        } else {
          return false
        }
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
        type: this.t_type,
        paper_id: this.paper_id
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
