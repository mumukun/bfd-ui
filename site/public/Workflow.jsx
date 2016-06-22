import React from 'react'
import Pre from './Pre'
import Warn from './Warn'

export default React.createClass({

  render() {
    return (
      <div className="guide">
        <p>主要介绍一个项目从零到上线的工作流，让开发人员更多的关注业务编写，同时也是 bfd-ui 的最佳使用环境</p>
        
        <h1>1、项目构建</h1>

        <p>项目生成器有助于快速产生一个项目的脚手架，同时避免的不同项目间结构的混乱</p>

        <p>安装 Node.js <a href="https://nodejs.org/en/" target="_blank">https://nodejs.org/en/</a></p>

        <p>安装后会集成 npm 包管理工具</p>

        <Warn>npm 版本要求 3.x+</Warn>
        
        <p>安装 yeoman 脚手架构建平台</p>
        
        <Pre lang="sh">{
`# 安装yeoman构建平台
$ npm install -g yo

# 安装百分点项目构建器
$ npm install -g generator-bfd`}</Pre>
        
        <p>接下来就可以生成一个新项目了，请自定义项目名，如 myapp</p>
        
        <Pre>{
`$ cd workspace

$ yo bfd myapp`}</Pre>
        
        <Warn>
          <p>1、如果不定义项目名，则在当前文件夹下生成</p>
          <p>2、生成后会自动安装 npm 依赖</p>
        </Warn>

        <p><strong>文件结构介绍：</strong></p>

        <pre>{
`myapp
  |-- bin/               一些工程化辅助脚本
  |-- data/              本地模拟数据，baseUrl 统一配置成 '/data'，具体 URL 定义为 xxx.json
  |-- src/               业务逻辑源代码，包括 less 源代码
      
      |-- functions/            各个页面功能
      |-- public/               业务逻辑中可复用的资源（代码、图片等等）
      |-- App.jsx               root 组件
      |-- App.less             
      |-- env.js                开发、线上不同环境下的配置，打包前请注意配置是否正确
      |-- index.js              整个应用的入口
      |-- pace.js               http://github.hubspot.com/pace/docs/welcome/
      |-- pace.less           
      |-- router.jsx            前端路由配置

  |-- .eslintrc          eslint 代码规范配置
  |-- .gitignore         
  |-- index.tpl          HTML 入口，采用模版形式的原因是可以动态生成不同后端语言下的模版
  |-- package.json
  |-- server.js          开发阶段服务环境，并处理 webpack 编译服务
  |-- webpack.config.js  编译、打包配置`}</pre>

        <Warn>
          <p>1、主色调修改：组件库和脚手架模版默认色调不适合所有项目，但具体开发无需手写 css 覆盖样式，只需跑个任务即可自动修改，详细说明查看 bin/theme.js</p>
          <p>2、开发、线上环境配置：比如请求地址、页面根路径等等，详细查看 src/env.js</p>
          <p>3、脚手架模版：具体的文件内容可以灵活修改，这里只是定义一种常规的模板，比如登录、权限、左右布局等等，不需要的话直接去掉即可</p>
        </Warn>

        <h1>2、开发</h1>

        <Pre lang="sh">{
`$ cd myapp

$ npm start`}</Pre>

        <p>到此为止，前端环境配置完成，戳 <a href="http://localhost:9000" target="_blabk">http://localhost:9000</a></p>

        <p>如果有多个项目或者 9000 端口已经被使用，可指定端口，如 4001</p>

        <Pre lang="sh">{
`$ npm start -p 4001`}</Pre>

        <Warn>
          <p>1、直接修改 index.tpl，以便生成不同服务器环境下的模板文件</p>
          <p>2、数据接口请允许跨域（CORS），接口的命名规则见下方服务器配置，防止和单页面冲突</p>
        </Warn>


        <h1>3、部署测试/上线</h1>

        <h3>3.1、代码规范检查</h3>

        <Pre lang="sh">{
`$ cd myapp

$ npm run lint`}</Pre>

        <p>
          代码规范：
          <a href="http://git.baifendian.com/front-end/style-guide">http://git.baifendian.com/front-end/style-guide</a>
        </p>

        <h3>3.2、生成线上代码</h3>

        <Pre lang="sh">{
`$ cd myapp

$ npm run build -- jsp`}</Pre>

        <p>完成后，myapp 下的 build 目录及 index.jsp 发送给后台即可，如 Java web 项目下的 webapp 目录</p>
        
        <h3>3.3、修改服务器配置（以 Java 为例）</h3>
        
        <h5>3.3.1、配置数据接口匹配规则，防止和下面的单页面功能冲突修改 web.xml，增加 servlet 节点</h5>
        
        <Pre lang="markup">{
`<servlet> 
  <servlet-name>dispatcher</servlet-name> 
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class> 
  <init-param> 
    <param-name>contextConfigLocation</param-name> 
    <param-value>classpath*:/springmvc-context.xml</param-value> 
  </init-param> 
  <load-on-startup>1</load-on-startup> 
</servlet> 
<servlet-mapping> 
  <servlet-name>dispatcher</servlet-name> 
  <url-pattern>正则，用于拦截数据接口请求，eg：*.do</url-pattern> 
</servlet-mapping>`}</Pre>
        <h5>3.3.2、配置单页面功能，除数据接口外，所有 URL 均渲染 index.jsp，修改 web.xml，增加 welcome-file</h5>
        <Pre lang="markup">{
`<welcome-file-list>
  <welcome-file>index.jsp</welcome-file>
</welcome-file-list>`}</Pre>
        <h5>3.3.3、设置 tomcat 启用 gzip 压缩</h5>
      </div>
    )
  }
})