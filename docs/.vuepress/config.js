module.exports = {
  title: 'yunsheng',
  description: '月下飞天镜，云生结海楼。',
  head:[
    [
      'link',
      {
        rel:'icon',
        href:'/favicon.ico'
      }
    ]
  ],
  nav: [
    {text:'主页', link:'/'},
    {text:'实用工具', link:'/tools'} 
  ],
  sidebar: {
    '/tools/':[
      {
        title: '实用工具',
        collapsable: false,
        children:[
          {title: '自动构建项目',path:'/tools/Y01autobuild'}
        ]
      }
    ]
  }
}
