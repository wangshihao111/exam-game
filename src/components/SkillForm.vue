<template>
  <div class="form">
    <RateInput
        v-for="value in value"
        :label="value.label"
        :key="value.name"
        :value="value.value"
        @change="handleChange(value.name, $event)"
    />
  </div>
</template>

<script>
  import RateInput from "./RateInput";
  export default {
    name: "SkillForm",
    components: {
      RateInput,
    },
    props: {
      // fields: {
      //   type: Array,
      //   default: () => [],
      // },
      value: {
        type: Array,
        default: () => [],
      }
    },
    data() {
      return {
        values: {},
      }
    },
    created() {
      this.initFields();
    },
    methods: {
      initFields() {
        this.value.forEach(f => {
          this.$set(this.values, f.name, f.value || 0)
        });
        this.$forceUpdate();
      },
      handleChange(name, v) {
        const tmp = [...this.value]
        const index = this.value.findIndex(v => v.name === name);
        tmp[index] = {...tmp[index], value: v}
        this.$emit('change', tmp)
      }
    },
    watch: {
      value() {
        this.initFields();
      },
    }
  }
</script>

<style scoped lang="less">
  .form {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>