export const defaultValue = [
  {label: 'React', name: 'react', value: 0},
  {label: 'Vue', name: 'vue', value: 0},
  {label: 'Nodejs', name: 'nodejs', value: 0},
  {
    label: '前端工程化',
    name: 'engineered',
    disabled: true,
    value: 0,
    children: [
      {label: 'webpack常用配置', name: 'webpackBase', value: 0},
      {label: 'webpack常用性能优化', name: 'webpackAdvanced', value: 0},
      {label: '网站性能优化', name: 'performance', value: 0},
      {label: '前端安全', name: 'security', value: 0},
      {label: '小程序', name: 'microApp', value: 0},
      {label: 'Serverless', name: 'serverless', value: 0},
    ]
  },
  {
    label: '设计模式', name: 'cli', disabled: true, value: 0,
    children: [
      {label: '设计模式基础', name: 'base', value: 0},
      {label: '设计模式实践', name: 'practice', value: 0},
      {label: '面向对象', name: 'oop', value: 0},
      {label: '观察者模式', name: 'observer', value: 0},
      {label: '单例模式', name: 'singleton', value: 0},
      {label: '代理模式', name: 'proxy', value: 0},
      {label: '装饰器模式', name: 'decorator', value: 0},
    ]
  },
  {
    label: '自动化测试', name: 'autoTesting', value: 0, disabled: true,
    children: [
      {label: 'React测试', name: 'oop', value: 0},
      {label: '单元测试', name: 'unity', value: 0},
      {label: 'e2e测试', name: 'e2e', value: 0},
      {label: 'jenkins', name: 'jenkins', value: 0},
    ]
  },
  {label: '后端能力', name: 'backend', value: 0, disabled: true,
    children: [
      {label: '数据库', name: 'database', value: 0},
      {label: '服务端编程', name: 'backendProgram', value: 0},
      {label: '服务器运维-docker容器管理', name: 'docker', value: 0},
      {label: '服务器运维-服务器管理', name: 'docker', value: 0},
      {label: '服务器运维-持续集成', name: 'ci', value: 0},
      {label: '服务器运维-linux命令', name: 'linux', value: 0},
      {label: '安全', name: 'security', value: 0},
    ]
  },
]