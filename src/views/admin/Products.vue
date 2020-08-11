<template>
  <div class="productsBack">
    <div class="productHeader">
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
        <h5> 新增產品 </h5>
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
  .productHeader{
    position: relative;
    h2{
    margin:30px 10px;
    font-size: 25px;
    font-weight: bold;
    }
    a{
      position: absolute;
      top: 0;
      right: 0;
      background: rgb(68, 68, 68);
      color:white;
      padding: 10px 20px;
      border-radius: 10px;
      &:hover{
        background: rgb(94, 94, 94);
      }
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
      padding:5px 8px;
      transition: all 0.2s;
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
    margin-left: 5px;
  }
}
.editModal{
  *{
  text-align: left;
  }
  display: none;
  width: 1000px;
  padding-bottom: 0;
  border-radius: 10px;
  background: white;
  position: fixed;
  top:20px;
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
  height: 80%;
  .form-control {
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    border: 1px solid #ced4da;
    line-height: 1.5;
    font-size: 1rem;
    color: #495057;
    background-color: #fff;
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
      padding: 1rem 1rem;
       border-top: 1px solid #dee2e6;
      background: white;
      border-radius: 5px;
  .btn{
      width:100px;
      line-height: 2;
      border: 0;
      color: rgb(39, 39, 39);
      background: rgb(204, 204, 204);
      border-radius: 5px;
      text-align: center;
    }
    .cancelBtn:hover{
      background: rgb(148, 148, 148);
      color: white;
    }
    .checkBtn{
      margin-left: 10px;
      &:hover{
        background: rgb(68, 68, 68);
        color: white;
      }
    }
    .loadIcon{
      margin-left: 5px;
    }
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
      loading: false,
      tempProduct: {
        imageUrl: []
      },
      products: {},
      pageInfo: {},
      linkInfo: {
        uuid: '5155a807-b2d4-4641-9d36-faaaed6c8085',
        token: 'FeV4c4PBhTxVobgNCovEMIdD9GBQzjeIzY5lW00l8BLwrgKZA8uo9OUTtmwg'
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
