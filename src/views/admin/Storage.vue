<template>
<div class="storagesBack">
  <div class="mainHeader">
    <loading :active.sync="isLoading"
      :loader="loader"
      :color="color"></loading>
    <h2>圖片管理</h2>
  </div>
  <ul>
    <li v-for="(item) in storages" :key="item.id">
      <img :src="item.path" alt="">
      <button class="btn delBtn" @click="openModal(item)">刪除</button>
    </li>
  </ul>
  <div class="background" @click="closeModal"></div>
  <section class="delModal">
    <header class="modal-header">
      <p>刪除圖片</p>
      <button type="button" @click="closeModal">
        <span>&times;</span>
      </button>
    </header>
    <div class="modal-body">圖片刪除後將無法恢復</div>
    <footer class="modal-footer">
      <button type="button" class="btn cancelBtn" @click="closeModal">
        取消
      </button>
      <button type="button" :disabled="loadIcon" class="btn checkCancelBtn" @click="delImg">
        確認刪除<font-awesome-icon class="loadIcon" v-if="loadIcon" :icon="['fas', 'spinner']" spin />
      </button>
    </footer>
  </section>
</div>
</template>

<style lang="scss">
  .storagesBack{
      padding:10px 50px 50px;
      ul{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }
      li{
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 32%;
        margin: 10px 0.5%;
        border-radius: 5px;
        &:nth-child(odd){
          border:2px solid rgb(221, 233, 236);
        }
        &:nth-child(even){
          border:2px solid rgb(233, 221, 238);
        }
      }
      img{
        display: block;
        max-width: 100%;
      }
      .delBtn{
        margin-top: 10px;
        width: 100%;
        border:0;
        color:white;
        background: rgb(248, 82, 82);
        &:hover{
          background: rgb(209, 77, 77);
        }
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
      storages: {},
      tempStorage: {},
      loadIcon: false,
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
  created () {
    this.getData()
  },
  methods: {
    delImg: function () {
      this.loadIcon = true
      const config = {
        url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/storage/${this.tempStorage.id}`,
        method: 'delete',
        headers: { Authorization: `Bearer ${this.linkInfo.token}` }
      }
      this.$http(config)
        .then((res) => {
          console.log(res)
          this.getData()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    closeModal: function () {
      $('.delModal').hide()
      $('.background').hide()
    },
    openModal: function (img) {
      this.tempStorage = img
      $('.delModal').show()
      $('.background').show()
    },
    getData: function (page = 1) {
      this.isLoading = true
      this.loadIcon = false
      const config = {
        url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/storage?page=${page}`,
        method: 'get',
        headers: { Authorization: `Bearer ${this.linkInfo.token}` }
      }
      this.$http(config)
        .then((res) => {
          console.log(res)
          this.storages = res.data.data
          // this.closeModal()
          this.loadIcon = false
          this.isLoading = false
          this.closeModal()
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
    }
  }
}
</script>
