<template>
  <div class="form">
    <RateInput
        v-for="value in value"
        :label="value.label"
        :key="value.name"
        :value="value.value"
        :disabled="value.disabled"
        @change="handleChange(value.name, $event)"
        @click.native="handleClick(value)"
    />
    <a-modal v-model="visible" title="Basic Modal">
      <RateInput
          v-for="value in editingSubField"
          :label="value.label"
          :key="value.name"
          :value="value.value"
          :disabled="value.disabled"
          @change="handleChange(value.name, $event)"
          @click.native="handleClick(value)"
      />
    </a-modal>
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
      value: {
        type: Array,
        default: () => [],
      }
    },
    data() {
      return {
        values: {},
        visible: false,
        editingSubField: [],
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
      },
      handleClick(field) {
        if (field.disabled) {
          this.visible = true;
          this.editingSubField = field.children;
        }
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