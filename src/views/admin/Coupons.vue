<template>
  <div class="couponsBack">
    <div class="mainHeader">
      <h2>優惠卷管理</h2>
      <a href="#" @click.prevent="openModal('new')">新增優惠卷</a>
    </div>
    <table>
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用 </th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in coupons" :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td> {{ item.deadline.datetime }} </td>
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
    <section class="delModal">
      <header class="modal-header">
        <p>刪除優惠卷</p>
        <button type="button" @click="closeModal">
        <span>&times;</span>
        </button>
      </header>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{ tempCoupons.title }}</strong>
        <br>商品刪除後將無法恢復
      </div>
      <footer class="modal-footer">
        <button type="button" class="btn cancelBtn" @click="closeModal">
          取消
        </button>
        <button type="button" :disabled="loadIcon" class="btn checkCancelBtn" @click="delCoupons">
          確認刪除<font-awesome-icon class="loadIcon" v-if="loadIcon" :icon="['fas', 'spinner']" spin />
        </button>
      </footer>
    </section>
    <section class="editModal">
      <header class="modal-header">
        <h5> 新增優惠卷 </h5>
        <button type="button" class="close" @click="closeModal">
          <span>&times;</span>
        </button>
      </header>
      <div class="modal-body">
          <div class="body-right">
            <div class="form-group">
              <label for="title">標題</label>
              <input id="title" v-model.trim="tempCoupons.title" type="text" class="form-control"
                placeholder="請輸入標題" required>
            </div>
            <div class="form-group">
              <label for="title">優惠碼</label>
              <input id="title" v-model.trim="tempCoupons.code" type="text" class="form-control"
                placeholder="請輸入標題" required>
            </div>
            <div class="form-group">
              <label for="title">到期日</label>
              <input id="title" v-model.trim="tempCoupons.due_date" type="date" class="form-control"
                placeholder="請輸入標題" required>
            </div>
            <div class="form-group">
              <label for="title">到期時間</label>
              <input id="title" v-model.trim="tempCoupons.due_time" type="time" class="form-control"
                placeholder="請輸入標題" required>
            </div>
            <div class="form-group">
              <label for="title">折扣百分比</label>
              <input id="title" v-model.trim="tempCoupons.percent" type="number" class="form-control"
                placeholder="請輸入標題" required>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input id="enabled" v-model="tempCoupons.enabled" class="form-check-input" type="checkbox"
                  :ckecked="tempCoupons.enabled">
                <label class="form-check-label" for="enabled">是否啟用</label>
              </div>
            </div>
          </div>
      </div>
      <footer class="modal-footer" >
        <button type="button" class="btn cancelBtn" @click="closeModal">
          取消
        </button>
        <button  type="button" :disabled="loadIcon" class="btn checkBtn" @click="updateCoupons">
          確認<font-awesome-icon class="loadIcon" v-if="loadIcon" :icon="['fas', 'spinner']" spin />
        </button>
      </footer>
    </section>
  </div>
</template>

<style lang="scss">
.couponsBack{
  padding:10px 50px 50px;
  .editModal{
    max-width: 500px;
  }
}
</style>

<script>
/* global $ */

export default {
  data () {
    return {
      coupons: {},
      tempCoupons: {},
      loadIcon: false,
      linkInfo: {
        uuid: '5155a807-b2d4-4641-9d36-faaaed6c8085',
        token: '3a7hkHfxDGg844VDa3lw4g7GlYurHi8iw73ssauSmfxW92AR4Tjrhoi4jb5F'
      },
      due_date: '',
      due_time: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    openModal: function (name, item) {
      if (name === 'delete') {
        this.tempCoupons = item
        $('.delModal').show()
        $('.background').show()
      } else if (name === 'edit') {
        this.roomStatus = 'edit'
        const config = {
          url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/coupon/${item.id}`,
          method: 'get',
          headers: { Authorization: `Bearer ${this.linkInfo.token}` }
        }
        this.$http(config)
          .then((res) => {
            console.log(res)
            this.tempCoupons = res.data.data
            $('.editModal').show()
            $('.background').show()
          })
          .catch((error) => { console.log(error) })
      } else if (name === 'new') {
        this.roomStatus = 'new'
        $('.editModal').show()
        $('.background').show()
      }
    },
    closeModal: function () {
      $('.editModal').hide()
      $('.delModal').hide()
      $('.background').hide()
      this.tempCoupons = {}
    },
    delCoupons: function () {
      this.loadIcon = true
      const config = {
        url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/coupon/${this.tempCoupons.id}`,
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
    updateCoupons: function () {
    },
    getData: function (page = 1) {
      const config = {
        url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/coupons?page=${page}`,
        method: 'get',
        headers: { Authorization: `Bearer ${this.linkInfo.token}` }
      }
      this.$http(config)
        .then((res) => {
          console.log(res)
          this.coupons = res.data.data
          this.closeModal()
          this.loadIcon = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
