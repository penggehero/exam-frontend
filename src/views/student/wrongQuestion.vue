<template>
  <div class="formStyle">
    <div style="text-align: justify; margin-top: 20px;margin-left: 20px;">
      选择试卷：
      <el-select v-model="t_paper" placeholder="请选择">
        <el-option
          v-for="item in papers"
          :key="item.paper_id"
          :label="item.name"
          :value="item.paper_id"
        />
      </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
      试题类型：
      <el-select v-model="t_type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <br>
      <br>
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
      <el-table-column prop="paper_name" width="60px" label="试卷名称" align="center" />
      <el-table-column prop="number" width="60px" label="题目编号" align="center" />
      <el-table-column prop="flag" label="题目类型" width="80px" align="center" />
      <el-table-column prop="name" label="题目名称" align="center" />
      <el-table-column prop="mark" width="50px" label="分值" align="center" />
      <el-table-column prop="q_A" width="100px" label="A选项" align="center" />
      <el-table-column prop="q_B" width="100px" label="B选项" align="center" />
      <el-table-column prop="q_C" width="100px" label="C选项" align="center" />
      <el-table-column prop="q_D" width="100px" label="D选项" align="center" />
      <el-table-column prop="answer" width="60px" label="正确答案" align="center" />
      <el-table-column prop="wrong_answer" width="60px" label="你的答案" align="center" />
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
  name: 'WrongQuestion',
  data: () => {
    return {
      school_id: sessionStorage.getItem('id'),
      options: [
        { value: 0, label: '单选题' },
        { value: 1, label: '多选题' },
        { value: 2, label: '判断题' }
      ],
      papers: [],
      t_type: undefined,
      t_paper: undefined,
      tableData: [],
      page: 1,
      rows: 10,
      resultlength: 10
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      axios
        .get('/api/wrong/search', { params: this.getParam() })
        .then(res => {
          this.tableData = res.data.resultData.datalist
          this.resultlength = res.data.resultData.total
          this.papers = res.data.resultData.papers
        })
    },
    handclearsearch() {
      this.t_type = undefined
      this.t_paper = undefined
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
    // 获取表格选中值
    handleSelectionChange(val) {
      this.multipleTable = val
    },
    getParam: function() {
      return {
        page: this.page,
        rows: this.rows,
        school_id: sessionStorage.getItem('id'),
        type: this.t_type,
        paper_id: this.t_paper
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
