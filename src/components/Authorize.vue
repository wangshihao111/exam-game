<template>
  <div class="auth">
    <a-modal title="游戏登录" :visible="visible" @ok="handleOk" @cancel="visible = visible">
      <div class="wrapper">
        <label for="#id">请输入令牌:</label>
        <input id="id" type="text" v-model="id">
        <p class="error" v-if="error">{{error}}</p>
      </div>
    </a-modal>
  </div>
</template>


<script>
  import users from '../utils/imgList';
  export default {
    name: 'Authorize',
    data() {
      return {
        visible: true,
        id: '',
        error: ''
      }
    },
    mounted() {
      this.id = sessionStorage.getItem('token') || '';
      this.handleOk();
    },
    methods: {
      handleOk() {
        if (this.validateId(this.id)) {
          this.visible = false;
          this.error = '';
          sessionStorage.setItem('id', this.id)
          this.$emit('confirm', this.id);
        } else {
          this.error = this.id ? '非法令牌' : ''
        }
      },
      validateId(id) {
        return users.find(u => u.id === id);
      }
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    margin-top: 16px;
    text-align: center;
    height: 60px;
    label {
      margin-right: 8px;
    }
    input {
      height: 32px;
      border: none;
      outline: none;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      font-size: 16px;
      font-style: italic;
      font-weight: 400;
      background: none;
      color: rgba(255,255,255,.8);

      text-indent: 12px;
      text-align: center;
    }
    .error {
      color: #ef3223;
      margin-top: 8px;
    }
  }
  /deep/ .ant-modal-footer {
    .ant-btn {
      display: none;
    }
    .ant-btn-primary {
      display: inline-block;
    }
  }
</style>