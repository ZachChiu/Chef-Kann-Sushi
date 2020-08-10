<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">首頁</router-link> |
      <router-link to="/about">關於</router-link> |
      <router-link to="/products">產品</router-link> |
      <router-link to="/products">購物車</router-link> |
      <router-link to="/login">登入</router-link>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>
