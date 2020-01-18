<template>
  <div>
    <!-- 题目区域 -->
    <div class="nr_left">
      <div class="test">

        <!-- 标题 -->
        <div class="test_content">&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="primary" round>单选题</el-button>
          <span style="font-size: 14px;"> &nbsp;&nbsp; &nbsp;&nbsp;
            <span>共&nbsp;<span>60</span>&nbsp;题，</span>
            <span>合计&nbsp;</span><span>60</span><span>&nbsp;分</span>
          </span>
        </div>
      </div>
      <!--  题目-->
      <div>
        <!-- 单选 -->
        <div v-for="(item,index) in singleList">
          <div :id="'q_s_'+index" style="margin-left:2%;margin-top:10px">
            <el-tag color="#409EFF" effect="dark" style="color:white">{{ index+1 }}</el-tag> &nbsp;&nbsp;
            <span style="font-size: 10px;">({{ item.mark }}分)</span>
            <label>{{ item.name }}</label>
          </div>
          <el-radio-group v-model="singleAnswerList[index]" class="nr_question">
            <div><el-radio :label="'A'+'|'+item.id">A. {{ item.q_A }}</el-radio> </div>
            <div><el-radio :label="'B'+'|'+item.id">B.{{ item.q_B }}</el-radio> </div>
            <div><el-radio :label="'C'+'|'+item.id">C. {{ item.q_C }}</el-radio></div>
            <div><el-radio :label="'D'+'|'+item.id">D.{{ item.q_D }}</el-radio></div>
          </el-radio-group>
          <hr>
        </div>
        <div class="test">
          <!-- 标题 -->
          <div class="test_content">&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" round>多选题</el-button>
            <span style="font-size: 14px;"> &nbsp;&nbsp; &nbsp;&nbsp;
              <span>共&nbsp;<span>60</span>&nbsp;题，</span>
              <span>合计&nbsp;</span><span>60</span><span>&nbsp;分</span>
            </span>
          </div>
          <!-- 多选 -->
          <div v-for="(item,index) in doubleList">
            <div :id="'q_s_'+index" style="margin-left:2%;margin-top:10px">
              <el-tag color="#409EFF" effect="dark" style="color:white">{{ index+1 }}</el-tag> &nbsp;&nbsp;
              <span style="font-size: 10px;">({{ item.mark }}分)</span>
              <label>{{ item.name }}</label>
            </div>
            <el-checkbox-group v-model="doubleAnswerList[index]" class="nr_question_d">
              <div><el-checkbox :label="'A'+'|'+item.id">A. {{ item.q_A }}</el-checkbox> </div>
              <div><el-checkbox :label="'B'+'|'+item.id">B.{{ item.q_B }}</el-checkbox> </div>
              <div><el-checkbox :label="'C'+'|'+item.id">C. {{ item.q_C }}</el-checkbox></div>
              <div><el-checkbox :label="'D'+'|'+item.id">D.{{ item.q_D }}</el-checkbox></div>
            </el-checkbox-group>
            <hr>
          </div>
        </div>
        <br><br><br><br>
        <!-- 下方提示栏 -->
        <div class="test_title">
          &nbsp;&nbsp; &nbsp;&nbsp;
          <strong style="color:red;font-size: 15px;">距离考试结束还剩:</strong> &nbsp;&nbsp;
          <span style="color:red;font-size: 20px">
            <strong>{{ timeSet.hour }}:{{ timeSet.minute }}:{{ timeSet.second }}</strong>
          </span>
          <span class="test_sumbit">
            <el-button type="text" style="color: #fff;font-size: 18px">交卷</el-button>
          </span>
        </div>
      </div>
    </div>
    {{ singleAnswerList }}
    {{ doubleAnswerList }}
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
              <span style="font-size: 14px;">共&nbsp;<i>60</i>&nbsp;题</span>
            </div>
            <div class="answerSheet">
              <ul>
                <li v-for="(item,index) in singleLength" :id="'li_s_'+index">
                  <a :href="'#q_s_'+index">{{ item }}</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="rt_content">
            <div class="rt_content_tt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <strong style="font-size: 18px;">多选题</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style="font-size: 14px;">共&nbsp;<i>60</i>&nbsp;题</span>
            </div>
            <div class="answerSheet">
              <ul>
                <li v-for="(item,index) in doubleLength" :id="'li_d_'+index">
                  <a :href="'#q_s_'+index">{{ item }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paper',
  data: () => {
    return {
      singleLength: 0,
      doubleLength: 0,
      intDiff: 30,
      timeSet: {
        hour: 0,
        minute: 0,
        second: 0// 时间默认值
      },
      singleList: [
        {
          id: 1,
          p_id: 1,
          number: 1,
          name: '1+1=?',
          mark: 1,
          q_A: '2',
          q_B: '3',
          q_C: '-1',
          q_D: '不知道'
        }
      ],
      doubleList: [
        {
          id: 1,
          p_id: 1,
          number: 1,
          name: '1+1=?',
          mark: 1,
          q_A: '2',
          q_B: '3',
          q_C: '-1',
          q_D: '不知道'
        }
      ],
      singleAnswerList: [],
      doubleAnswerList: [[]]
    }
  }, watch: {
    singleAnswerList(val) {
      val.forEach((value, index) => {
        document.getElementById('li_s_' + index).className = 'hasBeenAnswer'
      })
    },
    doubleAnswerList(val) {
      val.forEach((value, index) => {
        document.getElementById('li_d_' + index).className = 'hasBeenAnswer'
      })
    }
  },
  created() {
    this.search()
    this.singleLength = this.singleList.length
    this.doubleLength = this.doubleList.length
    // this.timer()
  },
  methods: {
    search() {

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
    float: right;
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
  margin-left: 70%;
  margin-top: 10px;
}
.nr_question_d div{
  margin-left: 6%;
  margin-top: 10px;
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

</style>
