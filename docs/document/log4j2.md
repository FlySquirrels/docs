# 配置Log4j2

## 依赖添加
去除SpringWeb的干扰依赖logback
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```
添加log4j2依赖
```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-log4j2</artifactId>
   <version>3.2.5</version>
</dependency>
```
## log4j2
Log4j2是基于log4j和logback优化而来，所以要先了解Log4j和Logback

Log4j有三个主要的组件:
 - Loggers(记录器) 日志类别
 - Appenders(输出源) 日志要输出的地方
 - Layouts(布局) 日志以何种形式输出
 - 注意: 每条日志都要设置一个等级 DEBUG < INFO < WARN < ERROR < FATAL

Loggers:
 - 设置日志输出时,会给那个位置设置一个级别,大于那个级别的日志才会打印到输出位置

Appenders:
 - 禁用和使用日志请求只是Log4j的基本功能,还允许将日志输出到不同地方，控制台，文件等，可根据天数产生新文件。
 - 常用类: 
   - ConsoleAppender(控制台)
   - FileAppender(文件) 
   - DailyRollingFileAppender(每天产生一个日志文件) 
   - RollingFileAppender (文件大小达到指定尺寸的时候产生一个新的文件)
   - WriteAppender (将日志信息以流格式发送到任意指定的地方)
 
Layouts
 - 用户可以根据喜好格式化日志输出
 - PatternLayout (灵活指定布局样式)
  - %c 输出logger名称
  - %d{HH:mm:ss.SSS} 表示输出到毫秒的时间
  - %t 输出当前线程名称
  - %-5level 输出日志级别，-5表示左对齐，并固定输出五个字符，不足右边补0
  - %logger 输出logger名称，因为RootLogger没有名称,所以没有输出
  - %msg 日志文本
  - %n 换行
  - %p 该条日志的优先级
  - %C 输出类名 （影响性能)
  - %F 输出所在类文件名.如 xxx.java  （影响性能)
  - %L 输出行号  （影响性能)
  - %M或%method输出所在方法名  （影响性能)
  - %l 输出完整错误位置，包括类名,方法名，文件名，行数  （影响性能)

XML配置文件解析
   1. 根节点Configuration
    - status 指定本身打印级别
    - monitorinterval 指定自动重新配置的检测间隔时间,单位是s，最小是5s
   2. Appenders节点 
    - 常见的有三种子节点:Console,File,RollingFile
    - Console 用来定义输出到控制台的Appender
    - File 节点用来定义输出到指定位置的文件的Appender
    - RollingFile 用来定义超过指定大小自动删除旧的创建新的Appender
    - 子节点添加 PatternLayout (灵活指定布局样式) 指定样式

Loggers
 - Root 指定节点项目根日志
 - Logger 单独指定日志形式

样例配置文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--      Configuration后面的status，这个用于设置log4j2自身内部的信息输出，可以不设置，
     当设置成trace时，可以看到log4j2内部各种详细输出
-->
<!-- monitorInterval：Log4j能够自动检测修改配置 文件和重新配置本身，设置间隔秒数 -->
<configuration status="info">
    <!-- 日志级别以及优先级排序: OFF > FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL -->

    <!-- 变量配置 -->
    <Properties>
        <property name="LOG_PATTERN" value="%d{yyyy-MM-dd HH:mm:ss} %-5level [%thread] %logger : %msg%n" />

        <!-- 定义日志存储的路径，不要配置相对路径 -->
        <property name="FILE_PATH" value="/log" />
        <property name="FILE_NAME" value="application" />
    </Properties>

    <appenders>
        <console name="Console" target="SYSTEM_OUT">
            <!--输出日志的格式-->
            <PatternLayout pattern="${LOG_PATTERN}" disableAnsi="false" noConsoleNoAnsi="false"/>
            <!--控制台只输出level及其以上级别的信息（onMatch），其他的直接拒绝（onMismatch）-->
            <ThresholdFilter level="info" onMatch="ACCEPT" onMismatch="DENY"/>
        </console>

        <!--
        　　这个会打印出所有的info及以下级别的信息，每次大小超过size，
        　　则这size大小的日志会自动存入按年份-月份建立的文件夹下面并进行压缩，作为存档
        -->
        <RollingFile name="RollingFileInfo" fileName="${FILE_PATH}/info.log" filePattern="${FILE_PATH}/${FILE_NAME}-INFO-%d{yyyy-MM-dd}_%i.log.gz">
            <!--控制台只输出level及以上级别的信息（onMatch），其他的直接拒绝（onMismatch）-->
            <ThresholdFilter level="info" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="${LOG_PATTERN}"/>
            <Policies>
                <!--interval属性用来指定多久滚动一次，默认是1 hour-->
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="20MB"/>
            </Policies>
            <!-- DefaultRolloverStrategy属性如不设置，则默认为最多同一文件夹下7个文件开始覆盖 -->
            <DefaultRolloverStrategy max="15"/>
        </RollingFile>

        <!-- 这个会打印出所有的warn及以下级别的信息，每次大小超过size，则这size大小的日志会自动存入按年份-月份建立的文件夹下面并进行压缩，作为存档-->
        <RollingFile name="RollingFileWarn" fileName="${FILE_PATH}/warn.log" filePattern="${FILE_PATH}/${FILE_NAME}-WARN-%d{yyyy-MM-dd}_%i.log.gz">
            <!--控制台只输出level及以上级别的信息（onMatch），其他的直接拒绝（onMismatch）-->
            <ThresholdFilter level="warn" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="${LOG_PATTERN}"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="20MB"/>
            </Policies>
            <!-- DefaultRolloverStrategy属性如不设置，则默认为最多同一文件夹下7个文件开始覆盖-->
            <DefaultRolloverStrategy max="15"/>
        </RollingFile>

        <!-- 这个会打印出所有的error及以下级别的信息，每次大小超过size，则这size大小的日志会自动存入按年份-月份建立的文件夹下面并进行压缩，作为存档-->
        <RollingFile name="RollingFileError" fileName="${FILE_PATH}/error.log" filePattern="${FILE_PATH}/${FILE_NAME}-ERROR-%d{yyyy-MM-dd}_%i.log.gz">
            <!--控制台只输出level及以上级别的信息（onMatch），其他的直接拒绝（onMismatch）-->
            <ThresholdFilter level="error" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="${LOG_PATTERN}"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="20MB"/>
            </Policies>
            <!-- DefaultRolloverStrategy属性如不设置，则默认为最多同一文件夹下7个文件开始覆盖-->
            <DefaultRolloverStrategy max="15"/>
        </RollingFile>
    </appenders>

    <loggers>
        <logger name="org.mybatis" level="info" additivity="false">
            <AppenderRef ref="Console"/>
        </logger>
        <Logger name="org.springframework" level="info" additivity="false">
            <AppenderRef ref="Console"/>
        </Logger>

        <root level="info">
            <appender-ref ref="Console"/>
            <appender-ref ref="RollingFileInfo"/>
            <appender-ref ref="RollingFileWarn"/>
            <appender-ref ref="RollingFileError"/>
        </root>
    </loggers>
</configuration>
```
Pom文件
```pom
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
			<exclusions>
				<!-- 排除spring-web自带log依赖 -->
				<exclusion>
					<groupId>org.springframework.boot</groupId>
					<artifactId>spring-boot-starter-logging</artifactId>
				</exclusion>
			</exclusions>
		</dependency>
		<!-- 类上添加@log4j2 快速使用		-->
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
		</dependency>
		<!-- Log4j2 快速启动		-->
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-log4j2</artifactId>
			<version>3.2.5</version>
		</dependency>
```

::: danger
    xml文件存放resource目录下，并命名为log4j2-spring.xml
:::
## 使用log4j2
```java
@Slf4j
public class TestController {
    public String test(){
        // 类上添加@Slf4j 然后直接使用log.
        log.info("测试成功");
        return "测试成功";
    }
}
```