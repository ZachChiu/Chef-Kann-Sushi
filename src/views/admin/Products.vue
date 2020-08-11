<template>
  <div class="productsBack">
    <h2>產品管理</h2>
    <table>
      <thead>
        <tr>
          <th>分類</th>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>是否啟用 </th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in products" :key="index">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td> {{ item.origin_price | commaFormat | priceFormat}} </td>
          <td> {{ item.price | commaFormat | priceFormat}} </td>
          <td>
            <span v-if="item.enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn editBtn" @click="openModal('edit', item)">編輯</button>
              <button class="btn delBtn" @click="openModal('delete', item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="background" @click="closeModal"></div>
    <div class="delModal">
      <div class="modal-header">
        <p>刪除產品</p>
        <button type="button" @click="closeModal">
          <span>&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{ tempProduct.title }}</strong>
        <br>商品刪除後將無法恢復
      </div>
      <div class="modal-footer">
        <button type="button" class="btn cancelBtn" @click="closeModal">
          取消
        </button>
        <button type="button" :disabled="loadIcon" class="btn checkCancelBtn" @click="delProduct">
          確認刪除<font-awesome-icon class="loadIcon" v-if="loadIcon" :icon="['fas', 'spinner']" spin />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.productsBack{
  padding:10px 50px 50px;
  h2{
    margin:30px 10px;
    font-size: 25px;
    font-weight: bold;
  }
  table{
    width: 100%;
    text-align: center;
    line-height: 3;
    thead tr{
      background: rgb(247, 247, 247);
      font-weight: bold;;
      border-top: 2px solid rgb(177, 177, 177);
      border-bottom: 2px solid rgb(177, 177, 177);
    }
    tbody{
      tr{
        border-top: 1px solid rgb(177, 177, 177);
        border-bottom: 1px solid rgb(177, 177, 177);
        &:hover{
          background: rgb(248, 248, 248);
        }
      }
    }
    .text-success{
      color:rgb(53, 201, 53);
      font-weight: bold;
    }
    .btn{
      background: white;
      padding:5px 8px;
    }
    .editBtn{
      border-radius:5px 0 0 5px;
      border:1px solid rgb(0, 88, 221);
      color: rgb(0, 88, 221);
      &:hover{
        background: rgb(0, 88, 221);
        color: white;
        border:1px solid rgb(0, 88, 221);
      }
    }
    .delBtn{
      border-radius:0 5px 5px 0;
      border:1px solid rgb(248, 82, 82);
      color:rgb(248, 82, 82);
      &:hover{
      background: rgb(248, 82, 82);
      color:white;
      border:1px solid rgb(248, 82, 82);
      }
    }
  }
  .delModal{
    display: none;
    padding-bottom: 20px;
    border-radius: 10px;
    width: 400px;
    background: white;
    position: fixed;
    top:40%;
    left: 0;
    right: 0;
    margin: 0 auto;
    .modal-header{
      padding: 10px;
      border-radius: 10px 10px 0 0 ;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgb(240, 67, 67);
      button{
        border-radius: 50%;
      }
    }
    .modal-body{
      padding: 30px 10px;
      text-align: center;
      line-height: 1.5;
      strong{
        color: rgb(240, 67, 67);
        font-weight: bold;
      }
    }
    .btn{
      width:100px;
      line-height: 2;
      border: 0;
      color: rgb(39, 39, 39);
      background: rgb(204, 204, 204);
      border-radius: 5px;
    }
    .cancelBtn:hover{
      background: rgb(68, 68, 68);
      color: white;
    }
    .checkCancelBtn{
      margin-left: 10px;
      &:hover{
        background: rgb(240, 67, 67);
        color: white;
      }
    }
    .loadIcon{
      margin-left: 10px;
    }
  }
  .background{
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5)
  }
}
</style>

<script>
/* global $ */

export default {
  data () {
    return {
      delModal: false,
      loadIcon: false,
      tempProduct: {},
      products: {},
      pageInfo: {},
      linkInfo: {
        uuid: '5155a807-b2d4-4641-9d36-faaaed6c8085',
        token: 'FeV4c4PBhTxVobgNCovEMIdD9GBQzjeIzY5lW00l8BLwrgKZA8uo9OUTtmwg'
      }
    }
  },
  created () {
    this.getData()
  },
  filters: {
    priceFormat: function (value) {
      return '$ ' + value
    },
    commaFormat: function (value) {
      return value
        .toString()
        .replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function (all, pre, groupOf3Digital) {
          return pre + groupOf3Digital.replace(/\d{3}/g, ',$&')
        })
    }
  },
  methods: {
    closeModal: function () {
      $('.delModal').hide()
      $('.background').hide()
    },
    openModal: function (name, item) {
      this.tempProduct = item
      if (name === 'delete') {
        $('.delModal').show()
        $('.background').show()
      } else if (name === 'edit') {
        $('.background').show()
      }
    },
    delProduct: function () {
      this.loadIcon = true
      const config = {
        url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/product/${this.tempProduct.id}`,
        method: 'delete',
        headers: { Authorization: `Bearer ${this.linkInfo.token}` }
      }
      this.$http(config)
        .then((res) => {
          this.getData()
        })
        .catch((error) => {
          console.log(error); alert('發生一些不知名狀況'); this.loadIcon = false
        })
    },
    getData: function (page = 1) {
      const config = {
        url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/products?page=${page}`,
        method: 'get',
        headers: { Authorization: `Bearer ${this.linkInfo.token}` }
      }
      this.$http(config)
        .then((res) => {
          console.log(res)
          this.products = res.data.data
          this.pageInfo = res.data.meta.pagination
          $('.delModal').hide()
          $('.background').hide()
          this.loadIcon = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
