<script setup>
import { ref, computed } from 'vue';
import { onMounted, onBeforeMount } from 'vue';

const hitokoto = ref("红豆生南国，春来发几枝。愿君多采撷，此物最相思。");
const from = ref("王维");
const date = computed(() => {
  let now = new Date();
  return now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';
});

onMounted(() => {
  fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      hitokoto.value = data.hitokoto;
      from.value = data.from;
    })
    .catch(err => console.error(err));
});

onBeforeMount(() => {
  const controller = new AbortController();
  const signal = controller.signal;
  fetch("https://raw.githack.com/maifuwa/portal/main/src/assets/json/images.json", {
    signal
  })
    .then(response => response.json())
    .then(data => getBingImages(data))
    .catch(e => {
      console.log("获取图片失败, 正在尝试使用本地图片");
      fetch('images.json').then(res => res.json()).then(data => {
        getBingImages(data);
        console.log("使用本地图片成功");
      }).catch(e => console.error("使用本地图片失败", e));
    });

  setTimeout(() => {
    controller.abort();
  }, sessionStorage.getItem('watchTime') || 1000);
});

function getBingImages(imgUrls) {
  var indexName = "bing-image-index";
  var index = sessionStorage.getItem(indexName);
  var panel = document.body;
  if (isNaN(index) || index == 7) index = 0;
  else index++;
  var imgUrl = imgUrls[index];
  var url = "https://www.cn.bing.com" + imgUrl;
  panel.style.background = "url('" + url + "') center center no-repeat #666";
  panel.style.backgroundSize = "cover";
  sessionStorage.setItem(indexName, index);
  sessionStorage.setItem('watchTime', 100);
}

const navigation = ref([{
  href: '#',
  name: '首页'
}, {
  href: '#',
  name: '博客',
}, {
  href: '#',
  name: '简历'
}, {
  href: '#',
  name: '关于'
}]);

const social = ref([{
  href: 'https://github.com/maifuwa/portal',
  lable: 'GitHub',
  icon: 'social iconfont icon-github'
}, {
  href: '#',
  lable: '知识的荒漠',
  icon: 'social iconfont icon-cnblogs'
}, {
  href: '#',
  lable: '知识的荒漠',
  icon: 'social iconfont icon-zhihu'
}, {
  href: 'mailto:maifuwa@outlook.com',
  lable: 'email',
  icon: 'social iconfont icon-email'
}]);

</script>

<template>
  <div class="all">

    <div class="box">
      <img src="/src/assets/avatar/avatar.jpg" alt="avatar" class="avatar">
      <span class="date">{{ date }}</span>
    </div>

    <div tyle="display: flex; flex-direction: column; text-align: center; ">
      <a href="#" style="color: #D0ADF0;font-size: xx-large;font-family: EngraversOldEnglishBTW03-Rg;">MAIFUWA</a>
      <p
        style="letter-spacing: 2px; line-height: 0.8; font-family: 'Old English Text MT';font-size: large;margin: 1% 0 5% 0;">
        Maybe it's not the day?</p>
    </div>

    <hr style="width: 300px;">

    <div>
      <p>{{ hitokoto }}</p>
      <p>-「<span style="font-weight: bolder;">{{ from }}</span>」</p>
    </div>

    <div style="width: 300px; margin-top: 10%; display: flex; justify-content: space-between;">
      <button v-for="item in navigation"
        style="width: 70px; height: 40px; border: 1px gray solid;border-radius: 20px; background: none;">
        {{ item.name }}
      </button>
    </div>

    <div style="width: 200px; margin: 10% auto 0 auto; display: flex; justify-content: space-between;">
      <li v-for="item in social" style="list-style: none;">
        <a :href="item.href" :title="item.lable" target="_blank" style="text-align: center;">
          <i :class=item.icon></i>
        </a>
      </li>
    </div>

  </div>
</template>

<style scoped>
.all {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  animation: all 0.6s ease-out 1;
}

@keyframes all {
  0% {
    transform: translate(0, 100px);
  }

  100% {
    transform: translate(0, 0);
  }
}

.box {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin: 0 auto;
  overflow: hidden;
  background-color: gray;
  position: relative;

  transform-style: preserve-3d;
}

.date {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  text-align: center;
  white-space: pre-wrap;
  font-size: x-large;
}

.avatar {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
