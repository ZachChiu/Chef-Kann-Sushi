<template>
  <div class="productsBack">
    <div class="mainHeader">
      <h2>產品管理</h2>
      <a href="#" @click.prevent="openModal('new')">新增產品</a>
    </div>
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
    <section class="delModal">
      <header class="modal-header">
        <p>刪除產品</p>
        <button type="button" @click="closeModal">
          <span>&times;</span>
        </button>
      </header>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{ tempProduct.title }}</strong>
        <br>商品刪除後將無法恢復
      </div>
      <footer class="modal-footer">
        <button type="button" class="btn cancelBtn" @click="closeModal">
          取消
        </button>
        <button type="button" :disabled="loadIcon" class="btn checkCancelBtn" @click="delProduct">
          確認刪除<font-awesome-icon class="loadIcon" v-if="loadIcon" :icon="['fas', 'spinner']" spin />
        </button>
      </footer>
    </section>
    <section class="editModal">
      <header class="modal-header">
        <h5 v-if="roomStatus == 'new'">新增產品</h5>
        <h5 v-if="roomStatus == 'edit'">編輯產品</h5>
        <button type="button" class="close" @click="closeModal">
          <span>&times;</span>
        </button>
      </header>
      <div class="modal-body">
          <div class="body-left">
            <div class="form-group">
              <label for="imageUrl1">輸入封面圖片網址</label>
              <input id="imageUrl1" v-model.trim="tempProduct.imageUrl[0]" type="text" class="form-control"
                placeholder="請輸入圖片連結">
            </div>
            <div class="form-group">
              <label for="imageUrl2">輸入圖片網址</label>
              <input id="imageUrl2" v-model.trim="tempProduct.imageUrl[1]" type="text" class="form-control"
                placeholder="請輸入圖片連結">
            </div>
            <div class="form-group">
              <label for="imageUrl3">輸入圖片網址</label>
              <input id="imageUrl3" v-model.trim="tempProduct.imageUrl[2]" type="text" class="form-control"
                placeholder="請輸入圖片連結">
            </div>
            <div class="form-group">
              <label for="imageUrl4">輸入圖片網址</label>
              <input id="imageUrl4" v-model.trim="tempProduct.imageUrl[3]" type="text" class="form-control"
                placeholder="請輸入圖片連結">
            </div>
            <div class="form-group">
              <label for="imageUrl5">輸入圖片網址</label>
              <input id="imageUrl5" v-model.trim="tempProduct.imageUrl[4]" type="text" class="form-control"
                placeholder="請輸入圖片連結">
            </div>
            <div class="form-group">
              <label for="customFile">
                上傳圖片
                <font-awesome-icon class="loadIcon" v-if="fileUploading" :icon="['fas', 'spinner']" spin />
              </label>
              <input id="customFile" ref="file" type="file" class="form-control" @change="uploadFile">
            </div>
            <img class="img-fluid" :src="tempProduct.imageUrl[0]">
          </div>

          <div class="body-right">
            <div class="form-group">
              <label for="title">標題</label>
              <input id="title" v-model.trim="tempProduct.title" type="text" class="form-control"
                placeholder="請輸入標題" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="category">分類</label>
                <input id="category" v-model.trim="tempProduct.category" type="text" class="form-control"
                  placeholder="請輸入分類" required>
              </div>
              <div class="form-group">
                <label for="price">單位</label>
                <input id="unit" v-model.trim="tempProduct.unit" type="unit" class="form-control"
                  placeholder="請輸入單位">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="origin_price">原價</label>
                <input id="origin_price" v-model.trim="tempProduct.origin_price" type="number" class="form-control"
                  placeholder="請輸入原價">
              </div>
              <div class="form-group">
                <label for="price">售價</label>
                <input id="price" v-model.trim="tempProduct.price" type="number" class="form-control"
                  placeholder="請輸入售價">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品說明</label>
              <textarea id="description" rows="3"  v-model.trim="tempProduct.description" type="text" class="form-control"
                placeholder="請輸入產品描述" required>
                  </textarea>
            </div>
            <div class="form-group">
              <label for="content">產品描述</label>
              <textarea id="content" rows="5" v-model.trim="tempProduct.content" type="text" class="form-control"
                placeholder="請輸入說明內容" required>
              </textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input id="enabled" v-model="tempProduct.enabled" class="form-check-input" type="checkbox"
                  :ckecked="tempProduct.enabled">
                <label class="form-check-label" for="enabled">是否啟用</label>
              </div>
            </div>
          </div>
      </div>
      <footer class="modal-footer" >
        <button type="button" class="btn cancelBtn" @click="closeModal">
          取消
        </button>
        <button  type="button" :disabled="loadIcon" class="btn checkBtn" @click="updateProduct">
          確認<font-awesome-icon class="loadIcon" v-if="loadIcon" :icon="['fas', 'spinner']" spin />
        </button>
      </footer>
    </section>
  </div>
</template>

<style lang="scss">
.productsBack{
  padding:10px 50px 50px;
}

</style>

<script>
/* global $ */

export default {
  data () {
    return {
      delModal: false,
      loadIcon: false,
      loading: false,
      tempProduct: {
        imageUrl: []
      },
      products: {},
      pageInfo: {},
      linkInfo: {
        uuid: '5155a807-b2d4-4641-9d36-faaaed6c8085',
        token: '3a7hkHfxDGg844VDa3lw4g7GlYurHi8iw73ssauSmfxW92AR4Tjrhoi4jb5F'
      },
      fileUploading: false,
      roomStatus: 'new'
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
      $('.editModal').hide()
      $('.delModal').hide()
      $('.background').hide()
      this.tempProduct = { imageUrl: [] }
    },
    openModal: function (name, item) {
      if (name === 'delete') {
        this.tempProduct = item
        $('.delModal').show()
        $('.background').show()
      } else if (name === 'edit') {
        this.roomStatus = 'edit'
        const config = {
          url: `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/product/${item.id}`,
          method: 'get',
          headers: { Authorization: `Bearer ${this.linkInfo.token}` }
        }
        this.$http(config)
          .then((res) => {
            console.log(res)
            res.data.data.imageUrl.forEach(index => {
              if (index == null) {
                res.data.data.imageUrl.splice(res.data.data.imageUrl.indexOf(index), 1)
              }
            })
            this.tempProduct = Object.assign({}, res.data.data)
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
    uploadFile () {
      const uploadedFile = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('file', uploadedFile)
      const url = `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/storage`
      this.fileUploading = true
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.linkInfo.token}`
        }
      }).then((response) => {
        this.fileUploading = false
        console.log(response)
        if (response.status === 200) {
          this.tempProduct.imageUrl.push(response.data.data.path)
        }
      }).catch(() => {
        alert('上傳不可超過 2 MB')
        this.fileUploading = false
      })
    },
    updateProduct: function (roomStatus) {
      const config = {
        headers: { Authorization: `Bearer ${this.linkInfo.token}` }
      }
      if (this.roomStatus === 'new') {
        if (this.tempProduct.title === undefined || this.tempProduct.category === undefined || this.tempProduct.origin_price === undefined || this.tempProduct.price === undefined) {
          alert('請輸入完整資料')
          return
        } else {
          config.url = `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/product`
          config.method = 'post'
        }
      } else if (this.roomStatus === 'edit') {
        config.url = `https://course-ec-api.hexschool.io/api/${this.linkInfo.uuid}/admin/ec/product/${this.tempProduct.id}`
        config.method = 'patch'
      }
      this.loadIcon = true
      config.data = this.tempProduct
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
