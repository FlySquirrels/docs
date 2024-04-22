module.exports = {
  title: 'yunsheng',
  description: '月下飞天镜，云生结海楼。',
  head:[
    [
      'link', {rel:'icon', href:'/favicon.ico'}
    ]
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '实用工具', link: '/tools/' },
      { text: '云界游戏文档', link: '/onliegame/' },
      { text: 'GitHub', link: 'https://github.com/FlySquirrels/docs',target:'_blank' }
    ],
    sidebar: {
      '/onliegame/': [
        {
          title: '云界游戏文档', 
          collapsable: false,
          children: [
            {title: '简要', path: '/onliegame/'},
            {title: 'Godot核心类', path: '/onliegame/core/Y01coregodot'},
            {title: 'Java核心类', path: '/onliegame/core/Y01corejava'},
            {title: '登录业务', path: '/onliegame/Y01login'},
            {title: '房间业务', path: '/onliegame/Y02room'},
            {title: '项目展示', path: '/onliegame/Y03display'},
          ]
        },
      ],
      '/tools/': [
        {
          title: '实用工具', 
          collapsable: false,
          children: [
            {title: '温馨提示', path: '/tools/'},
            {title: 'Git自动构建', path: '/tools/Y01autobuild'},
            {title: '服务器流量监控', path: '/tools/Y02autoclose'},
          ]
        },
      ],
      '/':[''],
    }
  },
}
