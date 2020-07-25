<template>
  <div class="form">
    <RateInput
        v-for="field in fields"
        :label="field.label"
        :key="field.name"
        :value="values[field.name]"
        @change="handleChange"
        v-model="values[field.name]"
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
      fields: {
        type: Array,
        default: () => [],
      },
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
        this.fields.forEach(f => {
          this.$set(this.values, f.name, 10)
        });
      },
      handleChange(v) {
        console.log(v)
      }
    },
    watch: {
      fields() {
        this.initFields();
      },
      values: {
        deep: true,
        handler() {
          console.log('inner')
          this.$emit('change', {...this.values})
        }
      }
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