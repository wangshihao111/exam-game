<template>
  <div class="skill-chart" ref="chart" style="width: 260px;height: 260px"></div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    name: "Chant",
    props: {
      indicators: {
        type: Array,
        default: () => ([]),
      },
      data: {
        type: Array,
        default: () => ([])
      }
    },
    mounted() {
      this.chart = echarts.init(this.$refs.chart);
      this.loadOptions();
    },
    methods: {
      loadOptions() {
        // const indicator = this.indicators.map(v => ({text: v.label, max: 70}));
        const indicator = this.data.map(v => ({text: v.label, max: 70}))
        const value = this.data.map(v => v.value / 100 * 70)
        this.chart && this.chart.setOption(
            {
              radar: [
                {
                  indicator,
                  center: ['50%', '50%'],
                  radius: 70
                }
              ],
              series: [
                {
                  name: '成绩单',
                  type: 'radar',
                  radarIndex: 0,
                  data: [
                    {
                      value,
                      // name: '李四',
                      areaStyle: {
                        opacity: 0.9,
                        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                          {
                            color: '#B8D3E4',
                            offset: 0
                          },
                          {
                            color: '#72ACD1',
                            offset: 1
                          }
                        ])
                      }
                    }
                  ]
                }
              ]
            }
        );
      }
    },
    watch: {
      data() {
        this.loadOptions()
      }
    }
  }
</script>

<style lang="less">
  .skill-chart {
    /*margin-right: 32px;*/
  }
</style>