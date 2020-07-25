<template>
  <div class="form">
    <RateInput
        v-for="v in value"
        :label="v.label"
        :key="v.name"
        :value="v.value"
        :disabled="v.disabled || disabled"
        @change="handleChange(v.name, $event)"
        @click.native="handleClick(v)"
    />
    <a-modal v-model="visible" :title="modalTitle" @ok="handleOk">
      <div class="input-wrapper">
        <RateInput
            v-for="value in editingSubField"
            :label="value.label"
            :key="value.name"
            :value="value.value"
            label-layout="horizontal"
            label-width="160px"
            :disabled="value.disabled || disabled"
            @change="editingValue[value.name] = $event"
            @click.native="handleClick(value)"
        />
      </div>
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
      disabled: Boolean,
      value: {
        type: Array,
        default: () => [],
      }
    },
    data() {
      return {
        visible: false,
        editingSubField: [],
        modalTitle: '',
        modalId: '',
        editingValue: {},
      }
    },
    methods: {
      handleChange(name, v) {
        const tmp = [...this.value]
        const index = this.value.findIndex(v => v.name === name);
        tmp[index] = {...tmp[index], value: v}
        this.$emit('change', tmp)
      },
      handleClick(field) {
        if (field.disabled) {
          this.visible = true;
          this.editingValue = {};
          this.modalTitle = field.label;
          this.modalId = field.name;
          this.editingSubField = [...field.children];
        }
      },
      handleOk() {
        if (this.disabled) return;
        let total = 0;
        const tmp = [...this.value]
        const index = this.value.findIndex(v => v.name === this.modalId);
        const nextChildren = this.editingSubField.map(v => ({...v, value: this.editingValue[v.name] || v.value}));
        nextChildren.forEach(v => {
          console.log(v)
          return total += (v.value || 0)
        });
        const value = Math.floor(total / nextChildren.length)
        tmp[index] = {
          ...tmp[index], value, children: nextChildren,
        }
        this.$emit('change', tmp, total)
        console.log(tmp, this.editingValue, tmp[index].children, value)
        this.visible = false;
      }
    },
  }
</script>

<style scoped lang="less">
  .form {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .input-wrapper {
    /*width: 260px;*/
    margin: 0 auto;
  }
</style>