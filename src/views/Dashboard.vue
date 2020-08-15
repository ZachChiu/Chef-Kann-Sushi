<template>
  <div class="backstage">
    <aside>
      <ul>
        <li><router-link to="/">返回前台</router-link></li>
        <li @click="pageLocate = '/admin'"><router-link to="/admin" :class="{active:pageLocate == '/admin'}">產品列表</router-link></li>
        <li @click="pageLocate = '/admin/orders'"><router-link to="/admin/orders" :class="{active:pageLocate == '/admin/orders'}">訂單列表</router-link></li>
        <li @click="pageLocate = '/admin/coupons'"><router-link to="/admin/coupons" :class="{active:pageLocate == '/admin/coupons'}">優惠卷列表</router-link></li>
        <li @click="pageLocate = '/admin/storage'"><router-link to="/admin/storage" :class="{active:pageLocate == '/admin/storage'}">檔案列表</router-link></li>
        <li><router-link to="/login">登出</router-link></li>
      </ul>
    </aside>
    <main>
      <header class="backstageHeader">
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
  font-family: 'Noto Sans TC', sans-serif;
  aside {
    position:fixed ;
    width: 10%;
    background: rgb(68, 68, 68);
    height:100vh;
    ul{
      margin-top: 65.5px;
    }
    a {
      transition: all 0.3s;
      text-align: center;
      padding: 30px 0;
      display: block;
      color: white;
      background: rgb(68, 68, 68);
      &:hover {
        background: rgb(134, 134, 134)
      }
    }
    .active{
        background: rgb(255, 255, 255) !important;
        color: rgb(27, 27, 27);
    }
  }
  main{
    width: 90%;
    margin-left:10% ;
    .backstageHeader{
      background: rgb(68, 68, 68);
      color: white;
      padding: 20px 0;
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
  .mainHeader{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    h2{
      font-size: 25px;
      font-weight: bold;
      margin-left: 20px;
    }
    a{
      font-size: 1rem;
      color: #fff;
      background-color: #007bff;
      font-weight: 600;
      padding: .375rem .75rem;
      line-height: 1.5;
      border-radius: .25rem;
      transition: all 0.25s;
      &:hover{
        background: #0b64c2;
      }
    }
  }
  .btn{
    font-weight: 600;
    padding: .375rem .75rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: all 0.25s;
    border: 0;
  }
  table{
    width: 100%;
    text-align: center;
    line-height: 3;
    thead {
      padding: 0 10px;
      border-top: 2px solid #a2cfe0;
      border-bottom: 4px solid #a2cfe0;
      font-weight: bold;
      background: rgb(204, 235, 255);
      th:nth-child(1) {
        border-left: 1px solid #a2cfe0;
      }
      th {
        border-right: 1px solid #a2cfe0;
      }
    }
    tbody{
      color: rgb(77, 77, 77);
      tr{
        border-bottom: 1px solid #dee2e6;
      }
      tr:nth-child(odd) {
        background: rgb(252, 252, 252);
      }
      tr:nth-child(even) {
        background: rgb(239, 247, 253);
      }
    }
    .text-enabled{
      color:rgb(53, 201, 53);
      font-weight: bold;
    }
    .text-disabled{
      color:rgb(158, 158, 158);
      font-weight: bold;
    }
    .editBtn{
      background: white;
      border:2px solid rgb(0, 88, 221);
      color: rgb(0, 88, 221);
      &:hover{
        background: rgb(0, 88, 221);
        color: white;
        border:2px solid rgb(0, 88, 221);
      }
    }
    .delBtn{
      background: white;
      margin-left: 5px;
      border:2px solid rgb(248, 82, 82);
      color:rgb(248, 82, 82);
      &:hover{
      background: rgb(248, 82, 82);
      color:white;
      border:2px solid rgb(248, 82, 82);
      }
    }
  }
  .delModal{
    display: none;
    border-radius: 5px;
    width: 500px;
    background: white;
    position: fixed;
    top:40%;
    left: 0;
    right: 0;
    margin: 0 auto;
    .modal-header{
      font-size: 20px;
      padding: 10px;
      border-radius: 5px 5px 0 0 ;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgb(240, 67, 67);
      button{
        border-radius: 50%;
      }
    }
    .modal-body{
      padding: 10px 10px;
      text-align: left;
      line-height: 1.5;
      strong{
        color: rgb(240, 67, 67);
        font-weight: bold;
      }
    }
    .modal-footer{
      display: flex;
      justify-content: flex-end;
      padding: 10px;
      border-top: 1px solid gray;
    }
    .cancelBtn{
      color: rgb(129, 129, 129);
      &:hover{
        background: rgb(129, 129, 129);
        color: white;
      }
    }
    .checkCancelBtn{
      margin-left: 10px;
      color: #fff;
      background-color: rgb(240, 67, 67);
      border-color: rgb(240, 67, 67);
      margin-left: 10px;
      &:hover{
        background: rgb(185, 38, 38);
      }
    }
    .loadIcon{
      margin-left: 5px;
    }
  }
  .editModal{
    *{
    text-align: left;
    }
    display: none;
    max-width: 1000px;
    padding-bottom: 0;
    border-radius: 10px;
    background: white;
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    bottom: 20px;
    margin: 0 auto;
    .modal-header{
    background: rgb(66, 66, 66);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem;
    font-size: 1.25rem;
    border-radius: 5px 5px 0 0;
    button{
      background-color: transparent;
      cursor: pointer;
      border-radius: 15px;
      color: #fff;
    }
    }
    .modal-body {
    overflow-x: hidden;
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    height: calc( 100% - 55px - 77px )  ;
    .form-control {
      display: block;
      width: 100%;
      padding: .375rem .75rem;
      border: 1px solid #ced4da;
      line-height: 1.5;
      font-size: 1rem;
      color: #495057;
      border-radius: .25rem;
      }
      .body-left {
        width: 33.333333%;
        margin: 0 15px 0 0px;
      }
      .body-right {
        width: 66.666667%;
        margin: 0 0 0 15px;
      }
      .body-center{
        width: 100%;
      }
      label {
          display: inline-block;
          margin-bottom: 0.5rem;
      }
      .img-fluid {
          width: 100%;
          margin-bottom: 10px;
      }
      .form-row {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
      }
      .form-group {
          margin-bottom: 1rem;
      }
      .form-row .form-group {
          width: 50%;
          padding-right: 5px;
          padding-left: 5px;
      }
      textarea{
        resize:vertical;
      }
    }
    .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 1.5rem 1rem;
        border-top: 1px solid #dee2e6;
      .cancelBtn{
        color: rgb(129, 129, 129);
        &:hover{
          background: rgb(129, 129, 129);
          color: white;
       }
      }
      .checkBtn{
        margin-left: 10px;
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
        margin-left: 10px;
        &:hover{
          background: #0d4d92;
          color: white;
        }
      }
      .loadIcon{
        margin-left: 5px;
      }
    }
  }
  .background{
    position: fixed;
    display: none;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5)
  }
}

</style>

<script>
export default {
  data () {
    return {
      pageLocate: '/admin'
    }
  },
  created () {
    this.pageLocate = this.$route.path
  }
}
</script>
