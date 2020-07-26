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
      this.chart.on('click', (e) => {
        console.log(e)
      })
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
                  radius: 70,
                  axisLine: {show: false},
                  splitArea: {
                    show: true,
                    areaStyle: {
                      color: ['rgba(71,211,240,0.30)', 'rgba(71,211,240,0.22)', 'rgba(71,211,240,0.16)', 'rgba(71,211,240,0.08)', 'rgba(71,211,240,0.04)']
                    },
                  },
                  splitLine: { show: false }
                }
              ],
              series: [
                {
                  name: '成绩单',
                  type: 'radar',
                  radarIndex: 0,
                  itemStyle: {
                  },
                  lineStyle: {
                    color: 'rgba(0,0,0,0)'
                  },
                  data: [
                    {
                      value,
                      symbolSize: 0,
                      // name: '李四',
                      areaStyle: {
                        opacity: 1,
                        color: '#CFF8FF'
                      },
                      itemStyle:{
                        borderColor: 'none',
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