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
      />  &nbsp;&nbsp;&nbsp;&nbsp;
      <br>
    </div>
    <div style=" border-radius: 10px;margin-bottom: 5px;margin-right:20px;float: right;">
      <el-button type="primary" plain icon="el-icon-search" @click="search()">搜索</el-button>
      <el-button type="primary" plain icon="el-icon-refresh" @click="handclearsearch()">重置</el-button>
      <el-button type="danger" plain icon="el-icon-back" @click="back()">返回</el-button>
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
      <el-table-column prop="student_name" label="学生姓名" align="center" />
      <el-table-column prop="school_id" label="学号" align="center" />
      <el-table-column prop="paper_name" label="考试名称" align="center" />
      <el-table-column prop="date" label="完成时间" align="center" />
      <el-table-column prop="single_mark" label="单选题得分" align="center" />
      <el-table-column prop="double_mark" label="多选题得分" align="center" />
      <el-table-column prop="judge_mark" label="判断题得分" align="center" />
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
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'ShowRank',
  data: () => {
    return {
      paper_id: undefined,
      t_name: '',
      tableData: [],
      page: 1,
      rows: 10,
      resultlength: 10
    }
  },
  created() {
    this.paper_id = this.$route.params.paper_id
    this.search()
  },
  methods: {
    search() {
      axios
        .get('/api/grade/search', { params: this.getParam() })
        .then(res => {
          this.tableData = res.data.resultData.datalist
          this.resultlength = res.data.resultData.total
        })
    },
    handclearsearch() {
      this.t_name = ''
      this.search()
    },
    back() {
      this.$router.push({ path: '/grade/choosePaper' })
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
        paper_id: this.paper_id,
        student_name: this.t_name,
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
