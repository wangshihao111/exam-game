<template>
  <div class="rate-input-wrapper">
    <label class="label">{{label}}</label>
    <div
        class="item-wrapper"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
    >
      <span
          class="item"
          v-for="(item, index) in divs"
          :data-key="index"
          :class="index <= activeLength && 'active'"
          :key="index"
          @click="handleItemClick(index)"
      ></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RateInput",
    props: {
      label: String,
      value: Number,
    },
    data() {
      return {
        divs: Array.from({length: 40}),
        activeLength: 0,
        $value: 0,
      }
    },
    mounted() {
      document.body.addEventListener('mouseup', () => {
        this.canMove = false;
      })
    },
    methods: {
      handleChange(index) {
        const value = Math.floor(index / 2)*2 / 40 * 100;
        this.$emit('change', value);
      },
      handleItemClick(index) {
        this.activeLength = index
      },
      onMouseDown(e) {
        this.canMove = true;
      },
      onMouseMove(e) {
        const key = e.target.dataset.key;
        if (key && this.canMove) {
          this.activeLength = Number(key)
        } else {
          this.canMove = false;
        }
      },
    },
    watch: {
      activeLength(index) {
        this.handleChange(index)
      },
      value(v) {
        this.activeLength = v / 100 * (2/40);
        console.log(this.activeLength)
      }
    }
  }
</script>

<style scoped lang="less">
  .rate-input-wrapper {
    width: 100%;
    height: auto;
    display: inline-block;
    text-align: left;
    padding: 4px;
    /*:after {*/
    /*  display: block;*/
    /*  content: '';*/
    /*  height: 0;*/
    /*  line-height: 0;*/
    /*  clear: both;*/
    /*  zoom: 1;*/
    /*}*/
    .label {
      /*float: left;*/
      /*width: 100px;*/
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #CFF8FF;
      line-height: 24px;
    }
    .item-wrapper {
      width: 100%;
      /*width: calc(100% - 100px);*/
      height: 20px;
      display: flex;
      flex-flow: row nowrap;
      float: left;
    }
    .item {
      display: block;
      height: 100%;
      width: 2.5%;
      cursor: pointer;
      &:nth-of-type(n) {
        background: rgba(255,255,255,0.2);
      }
      &.active {
        background: #BAE2EA;
      }
      &:nth-of-type(2n) {
        opacity: 0;
      }
    }
  }
</style>