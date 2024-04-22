# <center> :maple_leaf:Activity笔记:maple_leaf: </center>
## 项目准备
Maven依赖导入
```xml
        <!-- springboot3-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<!-- 核心依赖 activit7 -->
		<dependency>
			<groupId>org.activiti.dependencies</groupId>
			<artifactId>activiti-dependencies</artifactId>
			<version>7.1.0.M6</version>
			<type>pom</type>
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
```
安装IDEA插件``` Activiti BPMN visualizer ```