# <center> :maple_leaf:Activity笔记:maple_leaf: </center>

::: tip
	使用JDK17，MySQL5，SpringBoot3，Activity7，MyBatisFlex，log4j
	本项目踩坑如下:
		使用了mybatisflex，但activityEngine里自带mybatis，需要排除
	文档纠错邮箱: squirrelsflying@163.com
:::
[项目Demo地址](https://gitee.com/fufuandrice/flowable)
## 项目准备
Maven依赖导入
```xml
        <?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.2.3</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>

	<groupId>com.yun</groupId>
	<artifactId>flowable</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>flowable</name>

	<properties>
		<java.version>17</java.version>
	</properties>

	<dependencies>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-websocket</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<!-- 德鲁伊连接池配置 -->
		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid-spring-boot-starter</artifactId>
			<version>1.2.8</version>
		</dependency>

		<!-- MyBatis-flex -->
		<dependency>
			<groupId>com.mybatis-flex</groupId>
			<artifactId>mybatis-flex-spring-boot3-starter</artifactId>
			<version>1.8.8</version>
		</dependency>

		<dependency>
			<groupId>com.mybatis-flex</groupId>
			<artifactId>mybatis-flex-processor</artifactId>
			<version>1.8.8</version>
			<scope>provided</scope>
		</dependency>

		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-engine</artifactId>
			<version>7.1.0.M6</version>
			<!-- 排除掉activiti中的mybatis，否则项目启动会报错 -->
			<exclusions>
				<exclusion>
					<groupId>org.mybatis</groupId>
					<artifactId>mybatis</artifactId>
				</exclusion>
			</exclusions>
		</dependency>

		<!-- https://mvnrepository.com/artifact/org.activiti/activiti-spring -->
		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-spring</artifactId>
			<version>7.1.0.M6</version>
		</dependency>

		<!-- https://mvnrepository.com/artifact/org.activiti/activiti-bpmn-model -->
		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-bpmn-model</artifactId>
			<version>7.1.0.M6</version>
		</dependency>

		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-bpmn-converter</artifactId>
			<version>7.1.0.M6</version>
		</dependency>

		<!-- https://mvnrepository.com/artifact/org.activiti/activiti-json-converter -->
		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-json-converter</artifactId>
			<version>7.1.0.M6</version>
		</dependency>

		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-bpmn-layout</artifactId>
			<version>7.1.0.M6</version>
		</dependency>

		<!-- https://mvnrepository.com/artifact/org.activiti.cloud/activiti-cloud-services-api -->
		<dependency>
			<groupId>org.activiti.cloud</groupId>
			<artifactId>activiti-cloud-services-api</artifactId>
			<version>7-201802-EA</version>
		</dependency>

		<!-- log start -->
		<dependency>
			<groupId>org.apache.logging.log4j</groupId>
			<artifactId>log4j-core</artifactId>
			<version>2.14.0</version>
		</dependency>

		<!--	mysql	-->
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.44</version>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```
ymal文件配置
```yaml
server:
  port: 8080
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource
    url: jdbc:mysql://localhost:3306/activity?useUnicode=true&characterEncoding=utf8&useSSL=false
    username: root
    password: root
    druid:
      initialSize: 5
      minIdle: 5
      maxActive: 5
      maxWait: 60000
      timeBetweenEvictionRunsMillis: 60000
      minEvictableIdleTimeMillis: 300000
```
Activity配置类
 ```java

	/**
	 * 工作流配置类
	 */
	@Configuration
	public class ActivityConfig {
		@Value("${spring.datasource.driver-class-name}")
		private String driver;
		@Value("${spring.datasource.url}")
		private String url;
		@Value("${spring.datasource.username}")
		private String userName;
		@Value("${spring.datasource.password}")
		private String password;

		@Resource
		public DataSource dataSource;

		@Bean
		public ProcessEngine processEngine(){
			ProcessEngineConfiguration config = ProcessEngineConfiguration.createStandaloneProcessEngineConfiguration();
			config.setDataSource(dataSource);
        	// Activiti在启动时会自动检查并更新数据库架构，以确保与Activiti引擎版本的兼容性
			config.setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
			return config.buildProcessEngine();
		}
	}

 ```
安装IDEA插件``` Activiti BPMN visualizer ```
## 流程符号
版本: BPMN2.0

[流程符号文档](https://docs.awspaas.com/reference-guide/aws-paas-process-reference-guide/process_structure/README.html)

常见符号
 - 事件Event

![常见事件](/img/document/startevent.png)
 - 活动Activity

![活动](/img/document/active.png)
 - 网关GateWway

![网关](/img/document/gateway.png)

## 定义工作流
![alt text](/img/document/leave.png)
## 部署工作流
```java
  // 获取RepositoryService
        RepositoryService repositoryService = processEngine.getRepositoryService();
        // 部署流程，定义名字，把bpmn和png部署到数据中

        // add...resource自动从classpath路径下读取文件
        Deployment deploy = repositoryService.createDeployment()
                .name("请假申请流程")
                .addClasspathResource("processes/leave.bpmn20.xml")
                .addClasspathResource("processes/请假审批.png")
                .deploy();
        // 输出部署信息
        log.info("请假流程部署"+deploy.getId()+"-----"+deploy.getName());
```
## 启动工作流