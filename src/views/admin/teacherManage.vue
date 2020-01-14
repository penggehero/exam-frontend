<template>
  <div>
    <div style="text-align: justify; margin-top: 20px;margin-left: 20px;">
      教师姓名：
      <el-input
        v-model="t_name"
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
      <el-button type="primary" plain icon="el-icon-edit" @click="handleEdit()">管理</el-button>
    </div>
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
      <el-table-column prop="school" label="学校名称" align="center" />
      <el-table-column prop="college" label="院系名称" align="center" />
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
    <el-dialog class="g_form" :visible.sync="dialogDelVisible" :close-on-click-modal="false">
      <div>删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete()">确 定</el-button>
      </span>
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
      ops: [],
      ops1: [],
      id: undefined,
      college: undefined,
      username: undefined,
      password: undefined,
      school: undefined,
      name: undefined,
      page: 1,
      rows: 10,
      resultlength: 10,
      g_p_name: '',
      g_s_name: '',

      dialogDelVisible: false,
      multipleTable: [], // 更新数据数据
      ids: [] // 批量删除id
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
        .get('/api/teacher/search', { params: this.getParam() })
        .then(res => {
          this.tableData = res.data.resultData.datalist
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
      const selectLength = this.multipleTable.length
      var datalist = []
      for (let i = 0; i < selectLength; i++) {
        var ids = {}
        this.multipleTable[i].isDel = 1
        ids.id = this.multipleTable[i].id
        ids.version = this.multipleTable[i].version
        datalist.push(ids)
      }
      var data = {
        modifierCode: this.$store.state.userInfo.code,
        modifierName: this.$store.state.userInfo.name,
        list: datalist
      }
      axios
        .put('/api/teacher/delete', data)
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
            message: '删除失败',
            type: 'error',
            position: 'bottom-right'
          })
        })
      this.dialogDelVisible = false
    },
    // 修改
    handleEdit() {
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
        this.$router.push({
          name: 'editArea',
          params: Object.assign({}, this.multipleTable[0])
        })
      }
    },
    // 搜索框
    searchbuttonclick() {
      this.search()
    },
    // 重置搜索框
    handclearsearch() {
      this.t_name = undefined
      this.search()
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
        name: this.t_name
      }
    }
  }
}
</script>
