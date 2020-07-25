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
      this.loadOptions()
      // this.chart.setOption(
      //     {
      //       // title: {
      //       //     text: '自定义雷达图'
      //       // },
      //       // legend: {
      //       //     data: ['图一', '图二', '张三', '李四']
      //       // },
      //       radar: [
      //         {
      //           indicator: [
      //             {text: '语文', max: 70},
      //             {text: '数学', max: 70},
      //             {text: '英语', max: 70},
      //             {text: '物理', max: 70},
      //             {text: '化学', max: 70},
      //             {text: '生物', max: 70}
      //           ],
      //           center: ['50%', '50%'],
      //           radius: 70
      //         }
      //       ],
      //       series: [
      //         {
      //           name: '成绩单',
      //           type: 'radar',
      //           radarIndex: 0,
      //           data: [
      //             {
      //               value: [30, 40, 50, 30, 70, 60],
      //               name: '李四',
      //               areaStyle: {
      //                 opacity: 0.9,
      //                 color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
      //                   {
      //                     color: '#B8D3E4',
      //                     offset: 0
      //                   },
      //                   {
      //                     color: '#72ACD1',
      //                     offset: 1
      //                   }
      //                 ])
      //               }
      //             }
      //           ]
      //         }
      //       ]
      //     }
      // )
    },
    methods: {
      loadOptions() {
        const indicator = this.indicators.map(v => ({text: v.label, max: 70}));
        const value = indicator.map(({text}) => this.data.find(v => v.type === text).value / 100 * 70);
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
        console.log('load options')
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