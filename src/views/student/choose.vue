<template>
  <div class="formStyle">
    <div>
      <el-row>
        <el-col :span="10">&nbsp;</el-col>
        <strong class="text1">考前需知</strong>
      </el-row> <br>
      <el-row>
        <el-col :span="8">&nbsp;</el-col>
        <span class="text2">1.&nbsp;进入考试后请不要刷新页面,否则自动退出考试!</span>
      </el-row>
      <br>
      <el-row>
        <el-col :span="8">&nbsp;</el-col>
        <span class="text2">2.&nbsp;请在考试规定的时间作答,超出时间自动交卷!</span>
      </el-row> <br>
      <el-row>
        <el-col :span="8">&nbsp;</el-col>
        <span class="text2">3.&nbsp;请遵守考试的规章制度,进入考试后请不要舞弊,抄袭!</span>
      </el-row> <br> <br>
    </div>
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
          <el-button size="mini" type="primary" @click="enter(scope.row.id)">进入考试</el-button>
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
  name: 'TeacherTable',
  data: () => {
    return {
      school_id: sessionStorage.getItem('id'),
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
        .get('/api/paper/search', { params: this.getParam() })
        .then(res => {
          this.tableData = res.data.resultData.datalist
          this.resultlength = res.data.resultData.total
        })
    },
    enter: function(val) {
      this.$router.push({ name: 'Paper', params: { paper_id: val }})
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
        school_id: sessionStorage.getItem('id')
      }
    }
  }
}
</script>
<style  scoped>
.formStyle{
  margin: 10px 10px 10px 10px;
}
.text1{
font-size: 60px;color:red;
}
.text2{
  font-size: 20px;color:red;
}
</style>
