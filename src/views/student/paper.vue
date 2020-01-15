<template>
  <div style="margin: 15px auto 0;">
    <!-- 题目区域 -->
    <div class="nr_left">
      题目
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
              <span style="font-size: 14px;">共&nbsp;<i>60</i>&nbsp;题</span>
            </div>
            <div class="answerSheet">
              <ul>
                <li><a href="#qu_0_0">1</a></li>
                <li><a href="#qu_0_1">2</a></li>
                <li><a href="#qu_0_2">3</a></li>
                <li><a href="#qu_0_2">4</a></li>
                <li><a href="#qu_0_2">5</a></li>
                <li><a href="#qu_0_2">6</a></li>
                <li><a href="#qu_0_0">1</a></li>
                <li><a href="#qu_0_1">2</a></li>
                <li><a href="#qu_0_2">3</a></li>
                <li><a href="#qu_0_2">4</a></li>
                <li><a href="#qu_0_2">5</a></li>
                <li><a href="#qu_0_2">6</a></li>
                <li><a href="#qu_0_0">1</a></li>
                <li><a href="#qu_0_1">2</a></li>
                <li><a href="#qu_0_2">3</a></li>
                <li><a href="#qu_0_2">4</a></li>
                <li><a href="#qu_0_2">5</a></li>
                <li><a href="#qu_0_2">6</a></li>
                <li><a href="#qu_0_0">1</a></li>
                <li><a href="#qu_0_1">2</a></li>
                <li><a href="#qu_0_2">3</a></li>
                <li><a href="#qu_0_2">4</a></li>
                <li><a href="#qu_0_2">5</a></li>
                <li><a href="#qu_0_2">6</a></li>
                <li><a href="#qu_0_0">1</a></li>
                <li><a href="#qu_0_1">2</a></li>
                <li><a href="#qu_0_2">3</a></li>
                <li><a href="#qu_0_2">4</a></li>
                <li><a href="#qu_0_2">5</a></li>
                <li><a href="#qu_0_2">6</a></li>
                <li><a href="#qu_0_0">1</a></li>
                <li><a href="#qu_0_1">2</a></li>
                <li><a href="#qu_0_2">3</a></li>
                <li><a href="#qu_0_2">4</a></li>
                <li><a href="#qu_0_2">5</a></li>
                <li><a href="#qu_0_2">6</a></li>
                <li><a href="#qu_0_0">1</a></li>
                <li><a href="#qu_0_1">2</a></li>
                <li><a href="#qu_0_2">3</a></li>
                <li><a href="#qu_0_2">4</a></li>
                <li><a href="#qu_0_2">5</a></li>
                <li><a href="#qu_0_2">6</a></li>
                <li><a href="#qu_0_0">1</a></li>
                <li><a href="#qu_0_1">2</a></li>
                <li><a href="#qu_0_2">3</a></li>
                <li><a href="#qu_0_2">4</a></li>
                <li><a href="#qu_0_2">5</a></li>
                <li><a href="#qu_0_2">6</a></li>
                <li><a href="#qu_0_0">1</a></li>
                <li><a href="#qu_0_1">2</a></li>
                <li><a href="#qu_0_2">3</a></li>
                <li><a href="#qu_0_2">4</a></li>
                <li><a href="#qu_0_2">5</a></li>
                <li><a href="#qu_0_2">6</a></li>
                <li><a href="#qu_0_0">1</a></li>
                <li><a href="#qu_0_1">2</a></li>
                <li><a href="#qu_0_2">3</a></li>
                <li><a href="#qu_0_2">4</a></li>
                <li><a href="#qu_0_2">5</a></li>
                <li><a href="#qu_0_2">6</a></li>
              </ul>
            </div>
          </div>

          <div class="rt_content">
            <div class="rt_content_tt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <strong style="font-size: 18px;">多选题</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span style="font-size: 14px;">共&nbsp;<i>60</i>&nbsp;题</span>
            </div>
            <div class="rt_content_nranswerSheet">
              <ul>
                <li><a href="#qu_1_0">1</a></li>
                <li><a href="#qu_1_1">2</a></li>
                <li><a href="#qu_1_2">3</a></li>
                <li><a href="#qu_1_3">4</a></li>
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
    }
  }
}
</script>
<!-- css 样式-->
<style scoped>
/* 整体样式 */
.test_main div{
    width: 1200px;
    margin: 15px auto 0;
}
/* 左边题目样式 */
.nr_left {
    width: 100%;
    height: 100%;
    float: left;
}
/* 右边答题卡样式 */
.nr_right {
    width: 25%;
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
    width: 278px;
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
.rt_content {
    width: 278px;
    height: 100%;
    border: 1px solid #e4e4e4;
    border-top: 0;
}
.answerSheet li {
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

</style>
