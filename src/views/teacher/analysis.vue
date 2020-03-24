<template>
  <div class="formStyle">
    <div style=" border-radius: 10px;margin-bottom: 5px;margin-right:20px;float: right;">
      <el-button type="danger" plain icon="el-icon-back" @click="back()">返回</el-button>
    </div>
    <br><br>
    <!-- 考试完成情况 -->
    <ve-pie :data="chartData_Finsh" :extend="chartExtend_Finsh" style="margin:0 auto" />
    <br>
    <br>
    <!-- 考试各题型成绩统计图 -->
    <ve-histogram
      :data="chartData_TypeMark"
      style="margin:0 auto"
      width="700px"
      height="500px"
      :settings="chartSettings_TypeMark"
      :extend="chartExtend_TypeMark"
    />
    <br>
    <br>
    <!-- 考试分数区间人数统计图 -->
    <ve-histogram
      style="margin:0 auto"
      :data="chartData_MarkArea"
      width="700px"
      height="500px"
      :settings="chartSettings_MarkArea"
      :extend="chartExtend_MarkArea"
    />
    <br>
    <br>
    <!-- <strong style="text-align: center;">{{ paper_name }}各题目错误率排行榜</strong> -->
    <div style="text-align: center;font-size: 18px">
      <strong>{{ paper_name }}考试各题目错误率排行榜</strong>
      <br><br><br>
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
        <el-table-column prop="number" width="80px" label="题目编号" align="center" />
        <el-table-column prop="flag" label="题目类型" width="80px" align="center" />
        <el-table-column prop="name" label="题目名称" align="center" />
        <el-table-column prop="mark" width="50px" label="分值" align="center" />
        <el-table-column prop="q_A" width="100px" label="A选项" align="center" />
        <el-table-column prop="q_B" width="100px" label="B选项" align="center" />
        <el-table-column prop="q_C" width="100px" label="C选项" align="center" />
        <el-table-column prop="q_D" width="100px" label="D选项" align="center" />
        <el-table-column prop="answer" width="60px" label="正确答案" align="center" />
        <el-table-column prop="wrongNum" width="50px" label="错误次数" align="center" />
        <el-table-column prop="wrong" width="70px" label="错误率" align="center" />
      </el-table>
      <br><br><br>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      paper_id: undefined,
      paper_name: undefined,
      // 考试完成情况
      chartData_Finsh: {
        columns: ['完成情况', '人数'],
        rows: [
        //   { '完成情况': '已完成人数', '人数': 10 },
        //   { '完成情况': '未完成人数', '人数': 300 }
        ]
      },
      tableData: [],
      chartExtend_Finsh: {
        title: { text: '考试完成情况图', left: 'center' },
        legend: {
          show: true,
          bottom: 'bottom'
        },
        color: ['#00b436', '#4ad2ff', '#fdcc74', '#4f91f1']
      },
      // 考试分数区间人数统计表
      chartSettings_MarkArea: {
        labelMap: {
          MarkArea: '分数区间',
          StudentNumber: '学生人数'
        },
        yAxisName: ['人数']
      },
      chartExtend_MarkArea: {
        title: { text: '考试分数区间人数统计图', left: 'center' },
        legend: {
          show: true,
          bottom: 'bottom'
        }
      },
      chartData_MarkArea: {
        columns: ['MarkArea', 'StudentNumber'],
        rows: [
        //   { MarkArea: '0-20分', StudentNumber: 3 },
        //   { MarkArea: '20-40分', StudentNumber: 8 },
        //   { MarkArea: '40-60分', StudentNumber: 10 },
        //   { MarkArea: '60-80分', StudentNumber: 81 },
        //   { MarkArea: '80-100分', StudentNumber: 11 }
        ]
      },
      // 考试各题型成绩统计图
      chartSettings_TypeMark: {
        labelMap: {
          Type: '成绩类型'
        },
        yAxisName: ['分数']
      },
      chartExtend_TypeMark: {
        title: { text: '各题型成绩统计图', left: 'center' },
        legend: {
          show: true,
          bottom: 'bottom'
        },
        color: ['#4ad2ff', '#00b436', '#fdcc74', '#4f91f1', '#2f4554']
      },
      chartData_TypeMark: {
        columns: ['Type', '单选题', '多选题', '判断题', '总分'],
        rows: [
        //   { Type: '最低分', '单选题': 10, '多选题': 20, '判断题': 30, '总分': 10 },
        //   { Type: '最高分', '单选题': 20, '多选题': 20, '判断题': 30, '总分': 110 },
        //   { Type: '平均分', '单选题': 20, '多选题': 20, '判断题': 30, '总分': 60 }
        ]

      }
    }
  },
  created() {
    this.paper_id = this.$route.params.paper_id
    if (this.paper_id === undefined) {
      this.back()
      return
    }
    this.paper_name = this.$route.params.paper_name
    this.chartExtend_Finsh.title.text = this.paper_name + '考试完成情况'
    this.chartExtend_MarkArea.title.text = this.paper_name + '考试分数区间人数统计图'
    this.chartExtend_TypeMark.title.text = this.paper_name + '考试各题型成绩统计图'
    axios
      .get('/api//analysis/grade', { params: { paper_id: this.paper_id }})
      .then(res => {
        this.chartData_Finsh.rows = res.data.resultData.DoneList
        this.chartData_TypeMark.rows = res.data.resultData.AVGList
        this.chartData_MarkArea.rows = res.data.resultData.AreaList
      })
    axios
      .get('/api//analysis/wrong', { params: { paper_id: this.paper_id }})
      .then(res => {
        this.tableData = res.data.resultData
      })
  },
  methods: {
    back() {
      this.$router.push({ path: '/grade/choosePaper' })
    }
  }
}
</script>
<style  scoped>
.formStyle {
  margin: 10px 10px 10px 10px;

}
</style>

