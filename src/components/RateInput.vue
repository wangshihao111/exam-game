<template>
  <div class="rate-input-wrapper" :class="`rate-input-${labelLayout}`">
    <label class="label" :style="{width: labelWidth}">{{label}}</label>
    <div
        class="item-wrapper"
        :style="{width: labelWidth ? `calc(100% - ${labelWidth})` : ''}"
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
      disabled: {type: Boolean, default: false},
      labelLayout: String,
      labelWidth: String,
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
    created() {
      this.activeLength = this.value / 100 * 40;
    },
    methods: {
      handleChange(index) {
        const value = Math.floor(Math.floor(index / 2)*2 / 40 * 100);
        this.$emit('change', value);
      },
      handleItemClick(index) {
        if (!this.disabled) {
          this.activeLength = index
        }
      },
      onMouseDown() {
        this.canMove = true;
      },
      onMouseMove(e) {
        const key = e.target.dataset.key;
        if (key && this.canMove && !this.disabled) {
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
        this.activeLength = v / 100 * 40;
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
    &.rate-input-horizontal {
      :after {
        content: "";
        height: 0;
        line-height: 0;
        display: block;
        clear: both;
      }
      .label, .item-wrapper {
        float: left;
        box-sizing: border-box;
      }
      .label {
        padding-right: 8px;
        text-align: right;
      }
      .item-wrapper {
        width: calc(100% - 120px);
      }
    }
    .label {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #CFF8FF;
      line-height: 24px;
    }
    .item-wrapper {
      width: 100%;
      height: 20px;
      display: flex;
      flex-flow: row nowrap;
      float: left;
      user-select: none;
    }
    .item {
      display: block;
      height: 100%;
      width: 2.5%;
      cursor: pointer;
      user-select: none;
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