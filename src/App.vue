<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

const hitokoto = ref("红豆生南国，春来发几枝。");
const from = ref("王维");

// onMounted(() => {
//   fetch('https://v1.hitokoto.cn')
//     .then(response => response.json())
//     .then(data => {
//       hitokoto.value = data.hitokoto;
//       from.value = data.from;
//     })
//     .catch(err => console.error(err));
// });

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
    <div>
      <img src="/src/assets/avatar/avatar.jpg" alt="avatar" class="avatar">
    </div>
    <div style="display: flex; flex-direction: column; text-align: center; ">
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
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
</style>
