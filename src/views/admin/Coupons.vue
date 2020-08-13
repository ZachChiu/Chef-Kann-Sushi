<template>
  <div class="couponsBack">
    <div class="mainHeader">
      <loading :active.sync="isLoading"
        :loader="loader"
        :color="color"></loading>
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
            <span v-if="item.enabled" class="text-enabled">啟用</span>
            <span v-else class="text-disabled">未啟用</span>
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
        <br>優惠卷刪除後將無法恢復
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
          <div class="body-center">
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
              <input id="title" v-model.trim="due_date" type="date" class="form-control"
                placeholder="請輸入標題" required>
            </div>
            <div class="form-group">
              <label for="title">到期時間</label>
              <input id="title" v-model.trim="due_time" type="time" class="form-control"
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
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  data () {
    return {
      coupons: {},
      roomStatus: '',
      tempCoupons: {},
      loadIcon: false,
      linkInfo: {
        uuid: '5155a807-b2d4-4641-9d36-faaaed6c8085',
        token: 'Ux5ISHWMSCd6fbze5neUq9u7sxcBIZWxjs1pTUJIDdmvtx0SMmux9NCn8Txw'
      },
      due_date: '',
      due_time: '',
      isLoading: false,
      color: '#3094bb',
      loader: 'dots'
    }
  },
  components: {
    Loading
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
        this.isLoading = true
        this.roomStatus = 'edit'
        const config = {
          url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/coupon/${item.id}`,
          method: 'get',
          headers: { Authorization: `Bearer ${this.linkInfo.token}` }
        }
        this.$http(config)
          .then((res) => {
            console.log(res)
            this.tempCoupons = { ...res.data.data }
            const dateLine = this.tempCoupons.deadline.datetime.split(' ');
            [this.due_date, this.due_time] = dateLine
            $('.editModal').show()
            $('.background').show()
            this.isLoading = false
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
      const config = {
        headers: { Authorization: `Bearer ${this.linkInfo.token}` }
      }
      const deadline = `${this.due_date} ${this.due_time} `
      if (this.roomStatus === 'new') {
        if (this.tempCoupons.title === undefined || deadline === undefined || this.tempCoupons.code === undefined || this.tempCoupons.percent === undefined) {
          alert('請輸入完整資料')
          return
        } else {
          config.url = `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/coupon`
          config.method = 'post'
        }
      } else if (this.roomStatus === 'edit') {
        config.url = `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/coupon/${this.tempCoupons.id}`
        config.method = 'patch'
      }
      this.loadIcon = true
      config.data = this.tempCoupons
      this.tempCoupons.deadline_at = deadline
      this.$http(config)
        .then((res) => {
          this.getData()
        })
        .catch((error) => {
          console.log(error); alert('發生一些不知名狀況'); this.loadIcon = false
        })
    },
    getData: function (page = 1) {
      this.isLoading = true
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
