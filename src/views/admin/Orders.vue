<template>
  <div class="ordersBack">
    <div class="mainHeader">
      <loading :active.sync="isLoading"
        :loader="loader"
        :color="color"></loading>
      <h2>優惠卷管理</h2>
    </div>
    <table>
      <thead>
        <tr>
          <th>下單時間</th>
          <th>購買款項</th>
          <th>付款方式</th>
          <th>應付金額 </th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in orders" :key="item.id">
          <td>{{ item.created.datetime }}</td>
          <td >
            <p class="detailOrder" v-for="(detail,index) in item.products" :key="index">
              {{ detail.product.title }} / 數量：
              <span>{{ detail.quantity }}</span>
            </p>
          </td>
          <td> {{ item.payment }} </td>
          <td> {{ item.amount|commaFormat|priceFormat }} </td>
          <td>
            <div class="btn-group">
              <input type="checkbox" :checked="item.paid" :id="item.id" @change="pay(item)">
              <label :for="item.id"><span v-show="item.paid" class="paid">已付款</span><span v-show="!item.paid" class="unpaid">未付款</span></label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
  .ordersBack{
      padding:10px 50px 50px;
      .detailOrder{
        text-indent: 20px;
        text-align: left;
      }
      .paid{
        color: green;
        font-weight: bold;
      }
      .unpaid{
        color: red;
        font-weight: bold;
      }
  }
</style>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      orders: {},
      linkInfo: {
        uuid: '5155a807-b2d4-4641-9d36-faaaed6c8085',
        token: 'RzvnhXsZlKXxBANNpSqtBcnomblHc5vJYEzeFeYPvFuOwVgLBKSiJMmyCKhQ'
      },
      isLoading: false,
      color: '#3094bb',
      loader: 'dots'
    }
  },
  components: {
    Loading
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
  created () {
    this.getData()
  },
  methods: {
    pay: function (order) {
      this.isLoading = true
      if (order.paid === true) {
        const config = {
          url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/orders/${order.id}/unpaid`,
          method: 'patch',
          headers: { Authorization: `Bearer ${this.linkInfo.token}` }
        }
        this.$http(config)
          .then((res) => {
            console.log(res)
            this.getData()
          })
          .catch((error) => {
            console.log(error)
            this.isLoading = false
          })
      } else if (order.paid === false) {
        const config = {
          url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/orders/${order.id}/paid`,
          method: 'patch',
          headers: { Authorization: `Bearer ${this.linkInfo.token}` }

        }
        this.$http(config)
          .then((res) => {
            console.log(res)
            this.getData()
          })
          .catch((error) => {
            console.log(error)
            this.isLoading = false
          })
      }
    },
    getData: function (page = 1) {
      this.isLoading = true
      const config = {
        url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/orders?page=${page}`,
        method: 'get',
        headers: { Authorization: `Bearer ${this.linkInfo.token}` }
      }
      this.$http(config)
        .then((res) => {
          console.log(res)
          this.orders = res.data.data
          // this.closeModal()
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
    }
  }
}
</script>
