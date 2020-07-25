<template>
  <div id="app">
    <div class="app-header"/>
    <div class="content-wrapper">
      <div class="content-inner-wrapper">
        <div class="content">
          <section class="user-list">
            <div
                class="list-item"
                v-for="item in imgList"
                :key="item.id"
                @click="selectUser(item)"
                :class="item.id === current && 'list-item-active'"
            >
              <img :src="item.id === current ? item.enableSrc : item.src" alt="" class="src">
            </div>
          </section>
          <section class="content-main">
            <header class="content-header">
              <img class="left" src="./assets/control-center.png"/>
              <div class="right">
                {{currentTime}}
              </div>
            </header>
            <main class="content-main-content">
              <div class="content-human">
                <div class="human-wrapper">
                  <div class="back">
                    <img src="./assets/human-light.png" alt="">
                  </div>
                  <div class="box">
                    <img src="./assets/human-dark.png" alt="">
                  </div>
                </div>

                <div class="human-footer">
                  <img src="./assets/circle-light.png" alt="">
                </div>
              </div>
              <div class="content-data">
                <Chart :data="chartData"/>
                <div class="form-wrapper">
                  <SkillForm :value="chartData" @change="handleFormChange" />
                </div>
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import imgList from "./utils/imgList";
  import Chart from "./components/Chart";
  import SkillForm from "./components/SkillForm";

  const fields = [
    {label: 'Javascript', name: 'js'},
    {label: 'React', name: 'React'},
    {label: 'Vue', name: 'Vue'},
    {label: 'Nodejs', name: 'Nodejs'},
    {label: '持续集成', name: 'cxjc'},
    {label: '脚手架', name: 'cli'},
    {label: '脚手架1', name: 'cli1'},
    {label: '脚手架2', name: 'cli2'},
  ]

  const defaultValue = fields.map(f => ({...f, value: 0}))


  export default {
    name: 'App',
    components: {
      SkillForm,
      Chart,
    },
    data() {
      return {
        imgList,
        current: 'dw',
        currentTime: '',
        fields,
        chartData: defaultValue,
      }
    },
    mounted() {

      setInterval(() => {
        const date = new Date();
        const [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()]

        this.currentTime = `${h}:${m}:${s}`;
      }, 1000)
    },
    methods: {
      selectUser(item) {
        if (item.id === 'title') return;
        this.current = item.id;
      },
      handleFormChange(values) {
        this.chartData = values;
      }
    }
  }
</script>

<style lang="less">
  #app {
    position: relative;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100vw;
    height: 100vh;
    background: url(./assets/bg.jpg);
    background-size: cover;
    overflow-y: auto;

    .app-header {
      background-image: url("./assets/header.png");
      width: 100%;
      height: 73px;
      background-size: cover;
    }

    .content-wrapper {
      position: absolute;
      top: 123px;
      left: 50%;
      transform: translate(-50%, -0%);
      width: 60%;
      min-width: 1176px;
      height: 780px;
      margin-bottom: 32px;

      .content-inner-wrapper {
        width: 100%;
        height: 0%;
        padding-top: 66%;
        top: 0;
        left: 0;
        background: url("./assets/content-frame.png");
        background-size: 100% 100%;
        position: relative;

        .content {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          display: flex;
          padding: 60px;

          > section {
            height: 100%;
          }

          .user-list {
            flex: 0 0 180px;
            width: 180px;
            position: relative;
            overflow: auto;

            &:after {
              content: ' ';
              display: block;
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              width: 1px;
              background-image: url("./assets/line.png");
              background-size: 100% 100%;
            }

            .list-item {
              width: 100%;
              height: 60px;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 1px 0;
              cursor: pointer;
              user-select: none;

              :first-of-type {
                cursor: default;
                pointer-events: none;
              }

              &.list-item-active {
                justify-content: flex-end;
              }

              img {
                height: 100%;
              }
            }
          }

          .content-main {
            flex: 1;
            height: 100%;

            .content-header {
              width: 100%;
              height: 60px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: relative;

              .left {
                height: 100%;
                margin-left: 16px;
              }

              .right {
                top: 0;
                margin-top: -66px;
                margin-right: -12px;
                opacity: 0.39;
                font-family: DINAlternate-Bold;
                font-size: 12px;
                color: #47D3F0;
                letter-spacing: 3.7px;
                line-height: 12px;
              }
            }

            .content-main-content {
              display: flex;
              height: calc(100% - 60px);

              .content-human {
                margin-top: 32px;
                flex: 0 0 306px;
                width: 306px;
                /*margin-left: 60px;*/
                height: 530px;

                .human-wrapper {
                  letter-spacing: 0;
                  text-align: left;
                  position: relative;
                  width: 100%;
                  height: calc(100% - 48px);

                  .back {
                    position: relative;
                    height: 100%;
                    width: 100%;
                    animation: walk-back linear 5s infinite;
                    overflow: hidden;

                    > img {
                      width: 186px;
                      height: 482px;

                      position: absolute;
                      left: 60px;
                      right: 0;
                      top: 0;
                    }
                  }

                  > .box {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    bottom: 0;
                    overflow-y: hidden;
                    animation: walk linear 5s infinite;

                    &:after {
                      content: ' ';
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 4px;
                      background-image: url("./assets/ray.png");
                      background-size: 100% 100%;
                    }

                    > img {
                      width: 186px;
                      height: 482px;

                      position: absolute;
                      left: 60px;
                      right: 0;
                      bottom: 0;
                      z-index: 100;
                    }
                  }
                }

                .human-footer {
                  width: 100%;
                  height: 48px;
                  position: relative;
                  margin-top: 16px;

                  > img {
                    height: auto;
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                  }
                }
              }
              .content-data {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                .form-wrapper {
                  width: 260px;
                  flex: 1;
                  padding: 0;
                  overflow-x: hidden;
                  overflow-y: auto;
                  margin-bottom: 32px;
                  padding: 8px;
                }
              }
            }
          }
        }
      }
    }
  }

  @keyframes walk {
    0% {
      height: 100%;
      opacity: 1
    }
    /*50% {height: 0}*/
    50% {
      height: 0;
      opacity: 1
    }
    75% {
      height: 0;
      opacity: 1
    }
    100% {
      opacity: 0.2;
      height: 0
    }
  }

  @keyframes walk-back {
    0% {
      height: 0;
      opacity: 1;
    }
    50% {
      height: 100%;
      opacity: 1
    }
    75% {
      height: 100%;
      opacity: 1
    }
    100% {
      opacity: 0.2;
      height: 100%;
    }
  }
</style>
