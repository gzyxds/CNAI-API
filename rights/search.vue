<template>
  <div class="search-box">
    <input
      class="search-content"
      maxlength="60"
      placeholder="请输入完整授权方名称「回车或点击进行搜索」"
      v-model.trim="search"
      @keyup.enter="handleSubmit"
      style="overflow-y: hidden; resize: none"
    />
    <div class="search-btn" @click="handleSubmit">
      <svg
        t="1732803154270"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="8908"
        width="24"
        height="24"
      >
        <path
          d="M524.182069 251.762759a20.126897 20.126897 0 1 0 0 40.253793c95.514483 0 173.02069 77.506207 173.02069 173.020689a20.126897 20.126897 0 1 0 40.253793 0c0-56.496552-22.422069-110.697931-62.322759-150.775172a213.874759 213.874759 0 0 0-150.951724-62.49931z m0 0"
          p-id="8909"
        ></path>
        <path
          d="M801.544828 761.82069c-0.353103-0.353103-0.706207-0.529655-0.882759-0.706207l1.05931-1.059311c142.477241-164.89931 129.412414-412.954483-29.660689-561.964138-159.073103-149.009655-407.304828-145.831724-562.493793 7.062069s-162.074483 401.125517-15.536552 562.493794c144.595862 159.073103 387.531034 177.434483 554.372414 43.431724 0.706207 0.706207 1.235862 1.588966 1.942069 2.471724l57.026206 57.37931c14.124138 14.30069 37.075862 14.30069 51.376552 0 14.124138-14.30069 14.124138-37.428966 0-51.553103l-57.202758-57.555862z m-307.906207 68.855172c-135.944828-0.353103-258.295172-82.449655-310.024828-208.154483a336.454621 336.454621 0 0 1 73.622069-366.168276 336.154483 336.154483 0 0 1 366.344828-72.033103c125.351724 52.25931 206.918621 175.13931 206.742069 311.084138-0.353103 185.732414-151.128276 335.801379-336.684138 335.271724z"
          p-id="8910"
        ></path>
      </svg>
    </div>
  </div>
  <div class="loading-style" v-if="loading">
    <img src="./loadingSvg.svg" alt="" style="height: 80px" />
  </div>
  <template v-else>
    <!-- 暂无结果 -->
    <div v-if="noResult" class="no-result">
      <img src="./no-result.svg" alt="" />
      <span>暂无搜索内容</span>
    </div>
    <div v-if="overSearch" class="no-result">
      <img src="./no-result.svg" alt="" />
      <span>今日搜索次数已达上限</span>
    </div>
    <div v-if="haveResult" class="res-card">
      <img class="star" src="./images/star.png" alt="" />
      <img class="tip" src="./images/right-tip2.png" alt="" />
      <div>
        <div class="title-box">
          <div class="title" :title="resultValue.name">
            {{ resultValue.name }}
          </div>
          <span class="new">licensed</span>
        </div>
        <div class="bottom-box">
          <div class="new bottom-desc">已获得授权权益</div>
          <div class="time" style="opacity: 0.4">|</div>
          <div class="time">授权编号: {{ resultValue.code }}</div>
          <div class="time" style="opacity: 0.4">|</div>
          <div class="time">授权时间: {{ resultValue.time }}</div>
        </div>
      </div>
      <!-- 水印 -->
      <div class="waterMark">
        <div
          v-for="item in 4"
          :key="item"
          :style="{
            transform: `translateY(${item * 30}px) rotate(-20deg)`,
            left: `${(item - 1) * 30}%`
          }"
        >
          {{ resultValue.code }} - {{ resultValue.name }}
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { contentMap } from './res.js'
import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('fgfdjgkj3455')

const cryptoDecode = data => {
  const decryptedData = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decryptedData.toString(CryptoJS.enc.Utf8)
}

const loading = ref(false)
const data = ref(JSON.parse(cryptoDecode(contentMap)))
const search = ref('')
const noResult = ref(false)
const haveResult = ref(false)
const overSearch = ref(false)
const resultValue = ref<any>(null)

const handleSubmit = () => {
  if (search.value === '') {
    noResult.value = false
    haveResult.value = false
    overSearch.value = false
    return
  }
  loading.value = true
  setTimeout(() => {
    loading.value = false

    const isHave =
      data.value.findIndex(item => item.name === search.value) !== -1
    if (isOverSearch()) {
      overSearch.value = true
      noResult.value = false
      haveResult.value = false
      return
    }
    if (isHave) {
      todaySearch()
      noResult.value = false
      haveResult.value = true
      resultValue.value = data.value.find(item => item.name === search.value)
    } else {
      noResult.value = true
      overSearch.value = false
      haveResult.value = false
    }
  }, 500)
}

const todaySearch = () => {
  const today = new Date().toLocaleDateString()
  const searchCount = localStorage.getItem(today) || 0
  localStorage.setItem(today, `${Number(searchCount) + 1}`)
}
const isOverSearch = () => {
  const today = new Date().toLocaleDateString()
  const searchCount = localStorage.getItem(today) || 0
  return Number(searchCount) >= 5
}
</script>

<style scoped>
.search-box {
  z-index: 2;
  box-sizing: border-box;
  gap: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  position: relative;
  margin: 0 auto;
  width: 100%;
  align-items: flex-end;
  padding: 3px;
  overflow: auto;
  border-radius: 10px;
  transition: border 0.4s ease;
  border: #e8eaf2 solid 1px;
  box-shadow: 0 12px 24px -16px rgba(54, 54, 73, 0.04),
    0 12px 40px 0 rgba(51, 51, 71, 0.08), 0 0 1px 0 rgba(44, 44, 54, 0.02);
}
.search-box:hover {
  border-color: #615ced;
}
.search-content {
  flex: 1;
  padding: 0 20px;
  display: block;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  font-size: 18px;
  line-height: 54px;
  cursor: text;
  /* 修改内部placeholder的样式 */
  &::placeholder {
    color: #c0c4cc;
    font-size: 16px;
  }
}

.loading-style {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-btn {
  box-sizing: content-box;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  background-color: #2e33380d;
  border-radius: 10px;
  transition: border 0.4s ease;
  background: radial-gradient(
      49% 49% at 23% 90%,
      rgb(170 214 233 / 20%) 0,
      rgba(51, 192, 253, 0) 100%
    ),
    radial-gradient(122% 122% at 94% -6%, #dbe2ff 0, #f7f8fc 100%);
}
.search-btn svg {
  fill: #3f8bdb;
}
/* 搜索结果*/
.no-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 160px;
    height: auto;
    display: block;
  }
  span {
    color: #737578;
    font-size: 16px;
  }
}
.res-card {
  position: relative;
  box-sizing: border-box;
  margin-top: 50px;
  padding: 10px 10px 10px 20px;
  height: 140px;
  user-select: none;
  border-radius: 8px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(./images/bg.png);
  color: #240a00;
  box-shadow: 0 12px 24px -16px rgba(54, 54, 73, 0.04),
    0 12px 40px 0 rgba(51, 51, 71, 0.08), 0 0 1px 0 rgba(44, 44, 54, 0.02);
  .star {
    z-index: 1;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 50px;
    box-shadow: #e8bf7b;
  }
  .tip {
    z-index: 1;
    position: absolute;
    right: -10px;
    top: -30px;
    width: 140px;
  }
  .title-box {
    z-index: 1;
    position: absolute;
    display: flex;
    align-items: center;
    top: 36px;
    left: 50px;
    display: flex;
    gap: 10px;
    .title {
      display: inline;
      font-weight: bolder;
      font-size: 24px;
      color: transparent;
      background: linear-gradient(to right, #6e4c3e, #e8bf7b);
      background-clip: text;
    }
  }

  .bottom-box {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    left: 50px;
    width: 100%;
    bottom: 10px;
    .time {
      z-index: 1;
      font-size: 14px;
      color: #7f6413;
    }
    .bottom-desc {
      color: #75400c;
      height: 26px;
      line-height: 26px;
      border-radius: 6px;
      background-color: #d4975b47;
    }
  }
  .new {
    z-index: 1;
    display: inline-block;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    box-shadow: 0 2px 4px -2px #00000026;
    background: #cfa76e;
  }
  .waterMark {
    z-index: 0;
    /* 里面的 每个div都是水印,从左到右均匀分布,上下层次不齐分布,距离30px,倾斜 30 ° */
    display: flex;
    gap: 0px;
    position: absolute;
    left: 0;
    width: 100%;
    height: 120px;
    overflow: hidden;
    user-select: none;
    div {
      position: absolute;
      transform: rotate(-20deg);
      font-size: 14px;
      color: #240a00;
      opacity: 0.1;
      white-space: nowrap;
      user-select: none;
    }
  }
}
/* 屏幕宽度小于820时候 */
@media (max-width: 820px) {
  .res-card {
    .tip {
      display: none;
    }
  }
  .bottom-box {
    bottom: 10px !important;
    left: 50px !important;
    /* 隐藏第一个和第二个元素 */
    .bottom-desc {
      display: none !important;
    }
    .time:nth-child(2) {
      display: none !important;
    }
  }
}

@media (max-width: 520px) {
  .bottom-box {
    left: 10px !important;
  }
}
</style>
<style>
.dark {
  .search-box {
    border: #3c3f44 solid 1px;
  }
  .search-content {
    background-color: #65758529;
  }
  .search-btn {
    background: radial-gradient(
        49% 49% at 23% 90%,
        rgba(170, 214, 233, 0.3) 0,
        rgba(51, 192, 253, 0) 100%
      ),
      radial-gradient(122% 122% at 94% -6%, #22273d 0, #244878 100%);
  }
}
</style>
