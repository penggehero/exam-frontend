<template>
  <div class="formStyle">
    <div style="text-align: justify; margin-top: 20px;margin-left: 20px;">
      试卷名称：
      <el-input
        v-model="t_name"
        placeholder="请输入内容"
        maxlength="15"
        clearable
        style="width: 20%;margin-bottom: 20px;"
        @keyup.enter.native="handleFilter"
      />  &nbsp;&nbsp;&nbsp;&nbsp;
      出卷老师：
      <el-input
        v-model="t_teacher"
        placeholder="请输入内容"
        maxlength="15"
        clearable
        style="width: 20%;margin-bottom: 20px;"
        @keyup.enter.native="handleFilter"
      />
      <br>
    </div>
    <div style=" border-radius: 10px;margin-bottom: 5px;margin-right:20px;float: right;">
      <el-button type="primary" plain icon="el-icon-search" @click="search()">搜索</el-button>
      <el-button type="primary" plain icon="el-icon-refresh" @click="handclearsearch()">重置</el-button>
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
      <el-table-column v-if="false" prop="id" label="逻辑主键" align="center" />
      <el-table-column prop="name" label="试卷名称" align="center" />
      <el-table-column prop="teacher" label="出卷老师" align="center" />
      <el-table-column prop="number" label="试题数量" align="center" />
      <el-table-column prop="time" label="考试时间(分钟)" align="center" />
      <el-table-column prop="mark" label="总分" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="enter(scope.row.id)">查看排名</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Rank',
  data: () => {
    return {
      tableData: [],
      t_teacher: undefined,
      t_name: undefined,
      page: 1,
      rows: 10,
      resultlength: 10
    }
  },
  created() {
    this.search()
  },
  methods: {
    handclearsearch() {
      this.t_teacher = undefined
      this.t_name = undefined
    },
    search() {
      axios
        .get('/api/paper/findByTeacher', { params: this.getParam() })
        .then(res => {
          this.tableData = res.data.resultData.datalist
          this.resultlength = res.data.resultData.total
        })
    },
    enter: function(val) {
      this.$router.push({ name: 'showRank', params: { paper_id: val }})
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
        teacher: this.t_teacher,
        name: this.t_name,
        page: this.page,
        rows: this.rows
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
