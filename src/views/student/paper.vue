<template>
  <div>
    <!-- 题目区域 -->
    <div class="nr_left">
      <div class="test">
        <!-- 标题 -->
        <div class="test_content">&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" round>单选题</el-button>
          <span style="font-size: 14px;"> &nbsp;&nbsp; &nbsp;&nbsp;
            <span>共&nbsp;<span>{{ singleLength }}</span>&nbsp;题，</span>
            <span>合计&nbsp;</span><span>{{ singleMark }}</span><span>&nbsp;分</span>
          </span>
        </div>
        <br>
      </div>
      <!--  题目-->
      <div>
        <!-- 单选 -->
        <div v-for="(item,index) in singleList" :key="index">
          <div :id="'q_s_'+index" style="margin-left:2%;margin-top:10px;line-height:150%">
            <el-tag color="#409EFF" effect="dark" style="color:white">{{ item.number }}</el-tag>
            <span style="font-size: 10px;">({{ item.mark }}分)</span>
            <label>{{ item.name }}</label>
          </div>
          <el-radio-group v-model="singleAnswerList[index]" class="nr_question">
            <div><el-radio :label="item.id+'|A'">A. {{ item.q_A }}</el-radio> </div>
            <div><el-radio :label="item.id+'|B'">B. {{ item.q_B }}</el-radio> </div>
            <div><el-radio :label="item.id+'|C'">C. {{ item.q_C }}</el-radio></div>
            <div><el-radio :label="item.id+'|D'">D. {{ item.q_D }}</el-radio></div>
          </el-radio-group>
          <br><br>
          <hr>
        </div>
        <div class="test">
          <!-- 标题 -->
          <div class="test_content">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" round>多选题</el-button>
            <span style="font-size: 14px;"> &nbsp;&nbsp; &nbsp;&nbsp;
              <span>共&nbsp;<span>{{ doubleLength }}</span>&nbsp;题，</span>
              <span>合计&nbsp;</span><span>{{ doubleMark }}</span><span>&nbsp;分</span>
            </span>
          </div>
          <!-- 多选 -->
          <div v-for="(item,index) in doubleList" :key="index">
            <div :id="'q_d_'+index" style="margin-left:2%;margin-top:10px;line-height:150%">
              <el-tag color="#409EFF" effect="dark" style="color:white">{{ item.number }}</el-tag>
              <span style="font-size: 10px;">({{ item.mark }}分)</span>
              <label>{{ item.name }}</label>
            </div>
            <el-checkbox-group v-model="doubleAnswerList[index]" class="nr_question_d">
              <div><el-checkbox :label="item.id+'|A'">A. {{ item.q_A }}</el-checkbox> </div>
              <div><el-checkbox :label="item.id+'|B'">B. {{ item.q_B }}</el-checkbox> </div>
              <div><el-checkbox :label="item.id+'|C'">C. {{ item.q_C }}</el-checkbox></div>
              <div><el-checkbox :label="item.id+'|D'">D. {{ item.q_D }}</el-checkbox></div>
            </el-checkbox-group>
            <hr>
          </div>
        </div>
        <div class="test">
          <!-- 标题 -->
          <div class="test_content">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" round>判断题</el-button>
            <span style="font-size: 14px;"> &nbsp;&nbsp; &nbsp;&nbsp;
              <span>共&nbsp;<span>{{ judgeLength }}</span>&nbsp;题，</span>
              <span>合计&nbsp;</span><span>{{ judgeLength }}</span><span>&nbsp;分</span>
            </span>
          </div>

          <div v-for="(item,index) in judgeList" :key="index">
            <div :id="'q_j_'+index" style="margin-left:2%;margin-top:10px;line-height:150%">
              <el-tag color="#409EFF" effect="dark" style="color:white">{{ item.number }}</el-tag>
              <span style="font-size: 10px;">({{ item.mark }}分)</span>
              <label>{{ item.name }}</label>
            </div>
            <el-radio-group v-model="judgeAnswerList[index]" class="nr_question">
              <div><el-radio :label="item.id+'|1'">对</el-radio> </div>
              <div><el-radio :label="item.id+'|0'">错</el-radio> </div>
            </el-radio-group>
            <br><br>
            <hr>
          </div>
          <br><br>
          <br><br><br><br>
          <!-- 下方提示栏 -->
          <div class="test_title">
          &nbsp;&nbsp; &nbsp;&nbsp;
            <strong style="color:red;font-size: 15px;">距离考试结束还剩:</strong> &nbsp;&nbsp;
            <span style="color:red;font-size: 20px">
              <strong>{{ timeSet.hour }}:{{ timeSet.minute }}:{{ timeSet.second }}</strong>
            </span>
            <span class="test_sumbit">
              <el-button type="text" style="color: #fff;font-size: 18px" @click="paper_sumbit()">交卷</el-button>
            </span>
          </div>
        </div>
      </div>
      <!-- 答题卡区域 -->
      <div class="nr_right">
        <div class="nr_rt_main">
          <div class="rt_nr1">
            <div class="rt_nr1_title">
              <span>
                <i class="el-icon-edit" style="color: #fff;font-size: 18px">
                  &nbsp;
                  <strong>答题卡</strong>
                </i>
              </span>
            </div>
            <div class="rt_content">
              <div class="rt_content_tt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong style="font-size: 18px;">单选题</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="font-size: 14px;">共&nbsp;<i>{{ singleLength }}</i>&nbsp;题</span>
              </div>
              <div class="answerSheet">
                <ul>
                  <li v-for="(item,index) in singleList" :id="'li_s_'+index" :key="index">
                    <a :href="'#q_s_'+index">{{ item.number }}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="rt_content">
              <div class="rt_content_tt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong style="font-size: 18px;">多选题</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="font-size: 14px;">共&nbsp;<i>{{ doubleLength }}</i>&nbsp;题</span>
              </div>
              <div class="answerSheet">
                <ul>
                  <li v-for="(item,index) in doubleList" :id="'li_d_'+index" :key="index">
                    <a :href="'#q_d_'+index">{{ item.number }}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="rt_content">
              <div class="rt_content_tt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong style="font-size: 18px;">多选题</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="font-size: 14px;">共&nbsp;<i>{{ judgeLength }}</i>&nbsp;题</span>
              </div>
              <div class="answerSheet">
                <ul>
                  <li v-for="(item,index) in judgeList" :id="'li_j_'+index" :key="index">
                    <a :href="'#q_j_'+index">{{ item.number }}</a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Paper',
  data: () => {
    return {
      paper_id: undefined,
      paper_name: '',
      singleLength: 0,
      judgeLength: 0,
      doubleLength: 0,
      singleMark: 0,
      doubleMark: 0,
      judgeMark: 0,
      intDiff: 1200,
      timeSet: {
        hour: 0,
        minute: 0,
        second: 0// 时间默认值
      },
      singleList: [],
      doubleList: [],
      judgeList: [],
      singleAnswerList: [],
      judgeAnswerList: [],
      doubleAnswerList: [[]]
    }
  }, watch: {
    singleAnswerList(val) {
      val.forEach((value, index) => {
        document.getElementById('li_s_' + index).className = 'hasBeenAnswer'
      })
    },
    judgeAnswerList(val) {
      val.forEach((value, index) => {
        document.getElementById('li_j_' + index).className = 'hasBeenAnswer'
      })
    },
    doubleAnswerList(val) {
      val.forEach((value, index) => {
        if (value.length > 0) {
          document.getElementById('li_d_' + index).className = 'hasBeenAnswer'
        } else {
          if (document.getElementById('li_d_' + index) != null) { document.getElementById('li_d_' + index).className = 'hasNoAnswer' }
        }
      })
    }
  },
  created() {
    this.paper_id = this.$route.params.paper_id
    this.search()
  },
  methods: {
    paper_sumbit() {
      // if (this.singleAnswerList < this.singleLength || this.doubleAnswerList < this.doubleLength) {
      //   this.notifyInstance = this.$notify({
      //     title: '错误信息',
      //     message: '有试题未完成!',
      //     type: 'error',
      //     position: 'bottom-right'
      //   })
      //   return
      // }
      var data1 = []
      var data2 = []
      var date3 = []
      this.singleAnswerList.forEach((value, index) => {
        data1.push(value)
      })
      this.judgeAnswerList.forEach((value, index) => {
        date3.push(value)
      })
      for (var j = 0; j < this.doubleAnswerList.length; j++) {
        if (this.doubleAnswerList[j].length < 1) continue
        var value = this.doubleAnswerList[j]
        var str = ''
        for (var i = 0; i < value.length; i++) {
          var arr = value[i].split('|')
          if (i === 0) str += arr[0] + '|'
          str += arr[1] + '|'
        }
        data2.push(str.substring(0, str.length - 1))
      }
      axios
        .post('/api/paper/submit', {
          single: data1,
          double: data2,
          judge: date3,
          school_id: sessionStorage.getItem('id'),
          student_name: sessionStorage.getItem('username'),
          paper_id: this.paper_id,
          paper_name: this.paper_name
        })
        .then(response => {
          if (response.data.status === 1) {
            this.$notify({
              title: '提示信息',
              message: '提交成功',
              type: 'success',
              position: 'bottom-right'
            })
            this.$router.push('/student/index')
          } else {
            this.$notify({
              title: '错误信息',
              message: response.data.msg,
              type: 'error',
              position: 'bottom-right'
            })
          }
        })
    },
    search() {
      if (this.paper_id === undefined) {
        this.$router.push('/student/index')
        return
      }
      axios
        .get('/api/paper/getQuestion', { params: { paper_id: this.paper_id }})
        .then(res => {
          this.paper_name = res.data.name
          this.intDiff = res.data.time * 60
          this.timer()
          var list = res.data.resultData
          list.forEach((value) => {
            if (value.flag === 0) {
              this.singleList.push(value)
              this.singleMark += value.mark
            } else if (value.flag === 1) {
              this.doubleList.push(value)
              this.doubleMark += value.mark
              this.doubleAnswerList.push([])
            } else if (value.flag === 2) {
              this.judgeList.push(value)
              this.judgeMark += value.mark
            }
          })
          this.singleLength = this.singleList.length
          this.doubleLength = this.doubleList.length
          this.judgeLength = this.judgeList.length
        })
    },
    timer() {
      window.setInterval(() => {
        this.intDiff--
        if (this.intDiff <= 0) {
          alert('考试已结束!')
        }
        if (this.intDiff > 0) {
          this.timeSet.hour = Math.floor(this.intDiff / (60 * 60))
          this.timeSet.minute = Math.floor(this.intDiff / 60) - (this.timeSet.hour * 60)
          this.timeSet.second = this.intDiff - (this.timeSet.hour * 60 * 60) - (this.timeSet.minute * 60)
          if (this.timeSet.hour <= 9) { this.timeSet.hour = '0' + this.timeSet.hour }
          if (this.timeSet.minute <= 9) { this.timeSet.minute = '0' + this.timeSet.minute }
          if (this.timeSet.second <= 9) { this.timeSet.second = '0' + this.timeSet.second }
        }
      }, 1000)
    }
  }
}
</script>
<!-- css 样式-->
<style scoped>
/* 左边题目样式 */
.nr_left {
    width: 1000px;
    height: 100%;
    float: left;
}
/* 右边答题卡样式 */
.nr_right {
    width: 100%;
    padding-left: 1020px;
    height: 100%;
    float: left;
}
.rt_nr1 {
    width: 280px;
    position: fixed;
    top: 80px;
    z-index: 1000;
}
.nr_rt_main {
    width: 100%;
    height: auto;
}
/*标题*/
.rt_nr1_title {
    width: 280px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #409EFF;
}
.rt_content {
    width: 280px;
    height: 100%;
    border: 1px solid #e4e4e4;
    border-top: 0;
}
.rt_content_tt {
    width: 95%;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border-bottom: 1px solid #e4e4e4;
}
.answerSheet li {
   margin: 0;
    padding: 0;
    display: inline-block;
    margin-bottom: 2px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #e4e4e4;
}
.answerSheet li a {
    display: block;
}
.nr_question div{
  margin-left: 50px;
  margin-top: 15px;
}
.nr_question_d div{
 margin-left: 50px;
  margin-top: 15px;
}
.test {
    width: 100%;
    text-align: left;
    float: left;
}
.test_title {
    width: 1000px;
    height: 60px;
    line-height: 60px;
    background-color: #f7f7f7;
    position: fixed;
    bottom: 0;
    margin-top: 1px;
}
.test_content {
    width: 1000px;
    height: 50px;
        line-height: 50px;
    margin-top: 15px;
    background-color: #f7f7f7;
}
.test_sumbit {
width:70px;
float: right;
border-radius: 0;
background: #409EFF;
text-align: center;
}
.hasBeenAnswer {
    background: #409EFF;
    color: #fff;
}
.hasNoAnswer{
    margin: 0;
    padding: 0;

}

</style>
