import { defineConfig } from 'vitepress'

const ogDescription =
  '低代码数据可视化开发平台, 开源、精美、便捷、规范、交互自然。'
const ogImage = '/logo-t-y.png'
const ogTitle = 'OpenApi'
const ogUrl = 'https://www.mtruning.club/'

export default defineConfig({
  title: 'OpenApi', // 独立设置网站标题
  description: '低代码数据可视化开发平台',
  lang: 'zh-CN',
  base: '/',
  outDir: './dist',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: 'GoView' }],
    ['meta', { name: 'theme-color', content: '#3f8bdb' }],
    [
      'script',
      {
        src: '',
        'data-site': '',
        'data-spa': '',
        defer: ''
      }
    ]
  ],
  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      text: '为此页提供修改建议',
      pattern: 'https://gitee.com/MTrun/go-view-doc'
    },

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/dromara/go-view' }
    ],

    algolia: {
      appId: '27GQF86TFH',
      apiKey: '5529275a1f0687fd78babb878f6c54a6',
      indexName: 'GoView',
      placeholder: '请输入关键词',
      searchParameters: '搜索'
    },

    nav: [   // 导航栏配置
      { text: '首页 🏠', link: '/api/start/', activeMatch: '/api/start/' },
      { text: '🎉️帮助中心', link: '/api/start/', activeMatch: '/api/start/' },
      { text: '更新日志 🔄', link: '/updateLog/', activeMatch: '/updateLog/' },
      { text: '权益 | 商业合作 🤝', link: '/rights/', activeMatch: '/rights/' },
      { text: '合作伙伴 🤝', link: '/cooperative/', activeMatch: '/cooperative/' },
      { text: '关于作者 | 赞助 🙏', link: '/author/', activeMatch: '/author/' },
      {
        text: '相关链接 🌐',
        items: [
          {
            text: '艺创AI 🤖',
            link: 'https://cn.vuejs.org/'
          },
          {
            text: '优刻云计算 ☁️',
            link: 'https://www.naiveui.com/zh-CN/dark'
          },
          {
            text: 'Pinia 🚀',
            link: 'https://pinia.vuejs.org/'
          },
          {
            text: 'Vite ⚡️',
            link: 'https://cn.vitejs.dev/'
          },
          {
            text: 'TypeScript 💻',
            link: 'https://www.typescriptlang.org/'
          },
          {
            text: 'ECharts 📈',
            link: 'https://echarts.apache.org/zh/index.html'
          }
        ]
      },
      { text: '橙单 🍊', link: '/chengDan/', activeMatch: '/chengDan/' },
    ],

    sidebar: {   // 侧边栏配置
      '/api/': [
        {
          text: '引导',
          items: [
            {
              text: '开始',
              link: '/api/start/index'
            },
            {
              text: '页面引导',
              link: '/api/start/pageapi'
            },
            {
              text: '设置介绍',
              link: '/api/start/globalSetting'
            },
            {
              text: '常见问题',
              link: '/api/start/more'
            }
          ]
        },
        {
          text: '设计',
          items: [
            {
              text: '目录结构',
              link: '/api/design/directory'
            },
            {
              text: '工作空间',
              link: '/api/design/canvas'
            },
            {
              text: '预览功能',
              link: '/api/design/preview'
            },
            {
              text: '单个图表',
              link: '/api/design/charts'
            },
            {
              text: '历史记录',
              link: '/api/design/history'
            }
          ]
        },
        {
          text: '开发',
          items: [
            {
              text: '新增 ECharts 等复杂图表组件',
              link: '/api/develop/addEcharts'
            },
            {
              text: '新增简单自定义图表组件',
              link: '/api/develop/addCharts'
            },
            {
              text: '新增联动控制组件',
              link: '/api/develop/addInteractCharts'
            },
            {
              text: '修改图表数据处理',
              link: '/api/develop/editChartsData'
            },
            {
              text: '修改图表默认颜色',
              link: '/api/develop/editGlobalColor'
            },
            {
              text: '修改右键功能',
              link: '/api/develop/editRight'
            },
            {
              text: '修改快捷键功能',
              link: '/api/develop/editKeyboard'
            },
            {
              text: '修改全局主题与颜色',
              link: '/api/develop/editGlobalColor'
            },
            {
              text: '修改 SCSS 亮/暗 主题',
              link: '/api/develop/scssColor'
            },
            {
              text: '修改全局语言',
              link: '/api/develop/editGlobalLang'
            }
          ]
        },
        {
          text: '其它',
          items: [
            {
              text: 'Vue 大屏模板',
              link: '/api/screenTemplate/vueScreenTemplate'
            },
            {
              text: 'React 大屏模板',
              link: '/api/screenTemplate/reactScreenTemplate'
            }
          ]
        }
      ]
    }
  }
})
