module.exports = {
  title: 'yunsheng',
  description: '月下飞天镜，云生结海楼。',
  head:[
    [
      'link', {rel:'icon', href:'/favicon.ico'}
    ]
  ],
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '实用工具', link: '/tools/' },
      { text: 'GitHub', link: 'https://github.com/FlySquirrels/docs',target:'_blank' }
    ],
    sidebar: {
      '/tools/': [
        {
          title: '实用工具', 
          collapsable: false,
          children: [
            {title: '温馨提示', path: '/tools/'},
            {title: 'Git自动构建', path: '/tools/Y01autobuild'},
          ]
        },
      ],
      '/':[''],
    }
  },
}
