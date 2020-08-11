<template>
  <div class="backstage">
    <aside>
      <ul>
        <li><router-link to="/">返回前台</router-link></li>
        <li @click="pageLocate = 'products'"><router-link to="/admin" :class="{active:pageLocate == 'products'}">產品列表</router-link></li>
        <li @click="pageLocate = 'orders'"><router-link to="/admin/orders" :class="{active:pageLocate == 'orders'}">訂單列表</router-link></li>
        <li @click="pageLocate = 'coupons'"><router-link to="/admin/coupons" :class="{active:pageLocate == 'coupons'}">優惠卷列表</router-link></li>
        <li @click="pageLocate = 'storage'"><router-link to="/admin/storage" :class="{active:pageLocate == 'storage'}">檔案列表</router-link></li>
        <li><router-link to="/login">登出</router-link></li>
      </ul>
    </aside>
    <main>
      <header>
        <a class="burger" href="#"><font-awesome-icon  :icon="['fas', 'bars']"/></a>
        <h2>乾師傅壽司</h2>
      </header>
      <router-view></router-view>
    </main>
  </div>
</template>
<style lang="scss">
*{
  box-sizing: border-box;
}
.backstage {
  aside {
    position:fixed ;
    width: 10%;
    background: rgb(68, 68, 68);
    height:100vh;
    a {
      transition: all 0.3s;
      text-align: center;
      padding: 20px 0;
      display: block;
      color: white;
      background: rgb(68, 68, 68);
      &:hover {
        background: rgb(124, 155, 165);
      }
    }
    .active{
        background: rgb(192, 238, 253) !important;
        color: rgb(27, 27, 27);
    }
  }
  main{
    width: 90%;
    margin-left:10% ;
    header{
      background: rgb(68, 68, 68);
      color: white;
      padding: 15px 0;
      font-size: 26px;
      font-weight: bold;
      position: relative;
      a{
        color: white;
      }
    }
    .burger{
      display: none;
      position: absolute;
      top: 15px;
      left: 15px;
    }
  }
}
</style>

<script>
export default {
  data () {
    return {
      pageLocate: 'products'
    }
  }
}
</script>
