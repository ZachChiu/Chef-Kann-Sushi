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
      border-radius: 5px;
      cursor: pointer;
      padding:5px 8px;
    }
    .editBtn{
      margin-right: 10px;
      border:2px solid rgb(0, 88, 221);
      color:rgb(0, 88, 221);
      &:hover{
        background: rgb(0, 88, 221);
        color: white;
      }
    }
    .delBtn{
      border:2px solid rgb(248, 82, 82);
      color:rgb(248, 82, 82);
      &:hover{
        background: rgb(248, 82, 82);
        color:white;
      }
    }
  }
</style>

<script>
export default {
  data () {
    return {
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
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
