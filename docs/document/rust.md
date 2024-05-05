# RUST

## 安装

1.  安装 Rust 程序设计语言 (rust-lang.org)
2.  下载安装环境
    *   <https://www.rust-lang.org/zh-CN/tools/install> 下载安装 **c++编译器**
    *   运行rustup-init
    *   创建RUST\_HOME,并将cargo\bin目录添加到系统变量中
    *   rustc --version 检查是否安装rust
3.  配置项目环境
    *   进入cargo目录,删除.package-cache文件
    *   创建一个名为config的无后缀文件
    ```config
        [source.crates-io]
        replace-with = 'sjtu' # 指定使用下面哪个源，修改为source.后面的内容即可
        
        # 中国科学技术大学
        [source.ustc]
        registry = "https://mirrors.ustc.edu.cn/crates.io-index"
        
        # 上海交通大学
        [source.sjtu]
        registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index/"
        
        # 清华大学
        [source.tuna]
        registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
        
        # rustcc社区
        [source.rustcc]
        registry = "https://code.aliyun.com/rustcc/crates.io-index.git"
    ```

## 入门神例

1.  创建工程 hello\_world文件夹
2.  新建文件main.rs
3.  添加代码
            fn main() {
              println!("你好世界");
            }
4.  编译\:rustc main.rs
5.  运行:`Windows->  .\main.exe Linux-> ./main`

## Cargo知识:

1.  构建系统和包管理器(Cargo)
    *   使用命令
        *   cargo new xxx\_xxx:构建项目
        *   cargo check:检查项目是否可运行
        *   cargo build:打包生成项目
        *   cargo build --release优化编译项目,使rust代码运行更快
        *   cargo run --release运行优化编译项目
        *   cargo update:更新依赖
        *   cargo-version 检查是否安装cargo
    *   构建项目
        *   创建名为hello\_cargo的项目
        *   cargo new hello\_cargo
        *   目录结构
        *   hello\_cargo
        *   src
        *   —main.rs
        *   gitigonre
        *   Cargo.lock
        *   Cargo.toml
        *   src:源代码路径
        *   .gitigonre:初始化一个git仓库,可以使用 --vcs=git覆盖行为
        *   toml\:Cargo的配置文件格式,package配置包,dependencies添加依赖
        *   lock\:Cargo的自动化可重现构建,确保每次构建的代码一致

## 通用编程概念

1.  Rust是一种静态类型的语言,必须在编译器知道所有变量的类型
2.  变量和可变性
    *   let修饰的变量是不可变的,不能被二次赋值
    *   &#x9;let mut修饰的变量是可变的
3.  遮蔽
    *   let修饰的变量可以被再次调用
    *   let变量名可以重复声明赋值,改变变量对应的值,影响范围是当前作用域(即代码块内)
    *   在代码块内更改的变量只在代码块内生效
4.  常量
    *   const SECRET\:u32=997788;
    *   常量不允许使用mut.常量不仅仅默认不可变,而且自始至终不允许更改的值
    *   使用const关键字,并且值的类型必须注明.
    *   常量可以在全局作用域内声明,包括全局作用域
    *   常量只能设置为常量表达式,而不能是函数调用的结果或是只能在运行时计算得到的值
5.  数据类型
    1.数据类型:标量类型和复合类型
    *   标量类型： 标量(scalar)类型表示单个值
    *   Rust有4个基本的标量类型:整数,浮点,布尔,字符
    *   整数(integer):
        *   没有小数部分的数字
        *   整数除法会向下取整
        *   长度    有符号类型    无符号类型
        *   8位     i8            u8
        *   16位    i16           u16
        *   32位    i32           U32
        *   64位    i64           u64
        *   128位   i128          u128
        *   arch    isize         usize
        *   整形字面量
        *   数字字面量      示例
        *   十进制          98
        *   十六进制        0xff
        *   八进制          0o77
        *   二进制          ob1111
        *   字节(仅限于u8)  b'A'
    *   浮点类型
        *   浮点数是带有小数点的数字,浮点数的基本类型是f32和f64,现在的cpu中速度与f32几乎相同,精度更高.
    *   所有的浮点数都是有符号的
    *   长度    符号类型\\
    *   32      f32
    *   64      f64

*   布尔类型
    *   布尔值大小为1字节
    *   Rust中的布尔类型也有两个可能的值 true和false
    *   长度 符号类型
    *   1    bool
*   字符类型
    *   Rust的char类型是最基本的字母类型
    *   函数入参和返回引用类型可写作  \&String
    *   字符串 slice： \&str \&name\[..]
    *   Rust的字符类型大小为4个字节,表示一个Unicode标量值
    *   String使用可变长的UTF-8编码,一个汉字三个字节;
    *   长度 符号类型
    *   4    char
*   复合类型
    *   复合类型可以将多个值组合成一个类型
    *   基本复合类型:元组(tuple),数组(array);
*   元组类型
    *   元组是将多种类型的值组合到一个复合类型中的一种基本方式.长度固定:声明后就无法增长或缩小
    *   创建元组
    *   let tup:(i32,f64,u8) = (500,6.6666666,7);
    *   解析元组(使用模式匹配来解构)
        *   方法一
            *   let (x,y,z)=tup;
            *   创建元组绑定到tup上,使用let匹配tup,分解为三个单独的变量x,y,z
            *   这个过程称为解构(destructuring)
        *   方法二
            *   通过.加上索引
            *   tup.1返回500
            *   没有任何值的元组
*   ()是一种特殊类型,只有一个值,也写成().
    *   该类型被称为单元类型,该值被称为单元值.
    *   如果表达式不返回任何其他值,就隐式的返回单元值
*   数组类型
    *   将多个相同类型的值组合在一起
    *   初始化数组
    *   let a = \[1,2,3,4,5,6];
    *   let a: \[i32;5] = \[1,2,3,4,5];
    *   let a = \[3;5]; //初始化为5个3的数组
    *   访问数组元素
    *   a\[索引下标]
    *   下标越界会导致运行时错误
    *   当你希望将数据分配到stack而不是heap中或是希望确保有固定数量的元素,数组特别有用.
    *   如果不确定使用数组还是vector,那就应该使用一个vector(动态数组,可变数组)
*   函数
            {}是一个表达式
            fn add(a:u32,b:u32) -> u32{
                let c = {
                    //带分号是语句
                    let d = a + b;
                    //是表达式
                    d+1
                };
                println!("{c}");
                c
            }
*   堆与stack
    *   堆上的数据有所有权，直接赋值会更新所有权，之前的变量会失效
        *   使用借用来使用变量 & xx
        *   使用可变引用来使用并修改变量 \&mut xx
        *   借用和可变引用只能同时存在一个
        *   借用可同时存在多个
    *   stack上的数据都是固定大小，可以直接复制值
*   slice
    *   \[..] 全部长度
    *   \[0..2] 0 - 2
    *   \[2..] 2 - 最终
*   结构
    *   结构体
        *   创建结构
        ```rust
        #[derive(Debug)]    //使用println!("{:?}",class_name);格式化类
        struct User {
            name: String,
            email: String,
            sex: bool,
        }
        //构造方法
        fn build_user(name:String,email:String,sex:bool) -> User{
            User { name, email, sex }
        }
        //方法 User.get_info进行调用 self可以调用User内的值 
        //关键字 Self 在函数的返回类型中代指在 impl 关键字后出现的类型，在这里是 User
        impl User {
            //&self==self:&self 第一个参数必须有,且是self
            fn get_info(&self,other:User) { 
                println!("get_info方法被调用");
            }
        }
        ```
        *   复制,复制后的数据将转换所有权，之前的数据失效
        ```rust
        let usr = User{
            name:String::from("哈哈"), 
            email:String::from("2097925751@qq.com"),
            phone:String::from("19216812222")
        } //以上属性全部无法使用，所有权更改为usr2

        let usr2 = User{
            ..usr
        }
        ```
    *   元组结构体
        *   使用没有命名字段的元组结构体
        *   使用变量解构(a,b,c) 或者使用 .1.2.3索引访问
        ```rust
        struct Color(i32,i32,i32);
        ```
    *   类单元结构体
        ```rust
            struct The;
        ```
*   枚举
    ```rust
    
        enum IpAddrKind{
            V4(),
            //可以是基础数据类型
            V6(String),
            //可以是一个类
            Info(struct),
            //可以是一个元组
            Address(i32,i32,i32,i32)
        }
        //枚举类的方法
        impl IpAddrKind {
            fn getInfo(&self){
            }
        }
        //获取枚举类的值，并与match控制流结合
        fn get_message(ipadd:IpAddrKind){
            match ipadd {
                IpAddrKind::V4()=>{
                    println!("V4");
                },
                IpAddrKind::V6(add)=>{
                    println!("{add}");
                },
                IpAddrKind::User(a,b,c,d)=>{
                    println!("{}{}{}{}",a,b,c,d);
                }
            }
        }
        
        //Option<T>是标准库内的特殊枚举类,无需导入即可使用
        let a:Option<String> = Some(String::from("666"));
        let b:Option<String> = None;
        //匹配Option<T>内的值需要转换为T
        fn get_message(a:Option<String>) -> String{
            match a {
                None => String::from("None"),
                Some(s) => s
            }    
        }
        //match中 可以使用_和
        match a {
            1|2 = > //匹配到1或2
            2..5 => 匹配到2-4之间的数
        }
        
    ```
- 控制流
    ```rust
    
        'a:while a>1 {
            while(b > 1){
                break 'a; //这会中断外层循环
            }
        }
        
        match xx {
            Ss => ss,
            Some(x) => x,
            _ => , //
        }
        
        loop{}
        
        //简洁控制流 if let 
        //是match的语法糖,会丢失简洁性和穷尽性
            //options使用简洁控制流
            let config = Some(String::from("666"));
            if let Some(max) = config {
                
            }
    ```
- 进阶知识
    - crate是rust在编译时的最小代码单位
    - 模块
        - 创建模块```cargo new --lib mod```
        - 在模块内定义函数
            ```
            //create::fn::house 绝对路径
            //super::house 相对路径
            //use 导入
            //pub use 重导出
            //嵌套导入
            //use create::home::{detail,big};
            //use create::home::*;引入所有公用域
            //使用pub能使当前作用域被上一个作用域所访问，使用::来不断深入作用域
            //使用super获取父级作用域下对象
            //导入User
            use crate::user_mod::User;
            //导入的数据添加别名 as
            // use crate::user_mod::User as HH;
            //use只在所在作用域生效
            //    pub use 导出的数据可以被其他的create访问
            //    通过 use lib_name::User直接访问
            mod user_mod {
                pub enum Sex {
                    Yes,
                    No
                }
                impl Sex {
                    fn get_sex_info(self:&Sex) -> String{
                        match self {
                            Self::Yes => "是".to_string(),
                            Self::No => "否".to_string()
                        }
                    }    
                }
                pub struct User{
                    name:String,
                    sex:String,
                    enable:String
                }
                impl User {
                    // 构造对象
                    pub fn new(name:String,sex:String,enable:&Sex) -> User {
                        let is = Sex::get_sex_info(enable);
            
                        User{
                            name:String::from(name),
                            sex:String::from(sex),
                            enable: is
                        }
                    }
                    // 打印对象
                    pub fn get_user_info(&self) {
                        let mut info = String::new();
            
                        info+=&self.name;
            
                        info+=" ";
            
                        info+=&self.sex;
            
                        info+=" ";
            
                        info+=&self.enable;
            
                        println!("{info}");
                    }
                }
            }
            fn main(){
                let liu = User::new("刘".to_string(), "男".to_string(), &user_mod::Sex::Yes);
             
                let xiang = User::new("相".to_string(), "女".to_string(), &user_mod::Sex::No);
            
                liu.get_user_info();
             
                xiang.get_user_info();
                
                get_user(&xiang)
            }
            fn get_user(u:&User) {
                u.get_user_info();
            }
            ```
        - 使用外部包
            - 在toml文件中填写外部包的名称和版本，rust将从下载仓库获取包
    - 分包
        ```rust
            /*
                使用cargo new --lib test 创建项目 会多一个lib.rs用来管理分包
                目录结构
                -src
                    -home
                        - out.rs
                    -home.rs
                    -lib.rs
            */
            //lib.rs
            mod home;
            pub use create::home::out;
            pub fn out_home(){
                out.out_home();
            }
            //home.rs
            pub mod out;
            //out.rs
            pub fn out_home(){
                println!("我出家了!");
            }
        ```
    - 集合
        - vector
            ```rust
            //创建集合
                let mut v: Vec<i32> = Vec::new();
            //使用宏初始化
                let mut v: Vec<i32> = vec[1,2,3,4];
            //创建使用enum的集合 结合match来解析数据
                let u = vec![Data::Int(12),Data::Text("刘相彤".to_string())];
            //修改集合
                v.push(4);
            //遍历集合
                for i in &v {
                    out_message += &i.to_string();
                }
            //数组越界程序并不会崩溃,而是返回None
            ```
        - String
            - 万万没想到,String竟然也是一个集合,意料之外,情理之中
            - String是utf8类型的,由char集合组成
            - String 往往指 String 和 slice str
            - rust字符串不支持索引,可以使用slice来获取 使用utf8编码除了英文其他字符都是两个字节占用
            - 使用slice获取字符串索引的时候,注意防止索引不足字符大小,会导致panic程序崩溃
            - 创建字符串
                - let s = String::new(); 创建空字符串
                - let s = ""; 使用字面量值创建字符串
                - let s = "str".to_string(); 使用to_string创建字符串
                - let s = s.to_string(); 同上
                - let s = String::from("str"); 使用字面量创建字符串,等同于调用toString;
            - 修改字符串
                - 增加
                    - push(String/char),push不会获取变量的所有权,使用的是str,slice
                    - 运算符 + 号,如果直接使用值会获取所有权,需要进行借用
                    - format!宏 format!("{s}---春风不度玉门关")
            - 遍历字符串
                - chars() 返回一个char数组.使用for in循环遍历
                - bytes() 返回一个原始字节数组
        - Hash Map
            ```rust
            // HashMap默认使用一种叫做SipHash的函数,他可以抵御哈希表的拒绝服务攻击，安全
            use std::collections::HashMap;
            //创建hashmap
            let mut scores = HashMap::new();
                
            //插入数据
            scores.insert(1, ("刘相彤","男","24岁"));
            scores.insert(2, ("香云","女","24岁"));
            // 当该键没有数据时就会进行插入
            // 该方法会返回一个 &mut v可变引用
            // 使用 * 来解引用就可以根据旧值来改变新值
            scores.entry(1).or_insert(("黄沙百战穿金甲","不破楼兰终不还","王昌龄"));
        
            //获取数据
            let index = 1;
            //获取返回值 类型是Option<&V>
            let res = scores.get(&index) 
                //将返回值获取为 Option<v>
                .copied() 
                //将键对应的值设置为默认值
                .unwrap_or(("","","")); 
            println!("get(1).copied() = {} {} {}",res.0,res.1,&res.2[0..2]);
        
        
            //遍历数据
            for (k,(a,b,c)) in &scores{
                println!("{k}:{a},{b},{c}");
            }
            ```
## 异常处理
 - panic意味恐慌,而rust的吉祥物是一个螃蟹,能想象到代码发生异常后rust就像一只慌乱的螃蟹
 - panic会在程序异常时出现或者手动调用panic!宏
 - panic后会展开程序，进行栈回收并清除所有数据。
 - panic后直接终止程序
     ```properties
         #cargo.toml
         [profile.release]
         panic = 'abort'
     ```
 - 返回值为Result或Option的函数
     - expect("自定义额外异常信息");
     - unwrap();默认异常信息
 - 返回值异常处理
     ```rust
     file.read_to_string(&mut content).unwrap();
     //用于返回值为Result的函数中
     file.read_to_string(&mut content)?Err(e) => panic!("{}",e)
     };
     ```
 - panic! 宏代表一个程序无法处理的状态
## 泛型,Trait和生命周期
 - 函数中使用泛型
     ```rust
     //进行比较的时候，该数组需要实现了比较的trait 如char i32等
     pub fn other_test<T:std::cmp::PartialOrd>(list:&[T]) -> &T {
         let mut max=&list[0];
         for item in list {
             if item > max {
                 max = item;
             }
         }
         max
     }
     ```
 - 结构体中使用泛型
     ```rust
     //使用两个泛型的 Point，这样 x 和 y 可能是不同类型
     struct Point<T, U> {
         x: T,
         y: U,
     }
     
     fn main() {
         let both_integer = Point { x: 5, y: 10 };
         let both_float = Point { x: 1.0, y: 4.0 };
         let integer_and_float = Point { x: 5, y: 4.0 };
     }
     ```
 - 泛型代码的性能
     - Rust 通过在编译时进行泛型代码的 单态化（monomorphization）
     - 为每种不同的值生成一个类型Some_type
 - trait
     - trait定义是一种将方法签名组合起来的方法,目的是定义实现一个目的所必须的行为的集合
     ```rust
         \\定义trait,并提供默认实现
         pub trait Summary {
             fn summarize(&self) -> String;
         }
         \\为类型实现trait
         pub struct B {
             pub headline: String,
             pub location: String,
             pub author: String,
             pub content: String,
         }
         impl Summary for B {
             fn summarize(&self) -> String {
                 format!("文章头部,{}",self.headline)
             }
         }
         \\调用时需要导入trait包
         use {B,Summary}
     ```
     - 默认实现
         - 需要通过impl Summary for NewsArticle {}
         - 一个空的impl块进行实现，会调用默认实现
     - trait作为参数，可以接受任何实现了该trait的参数
         ```rust
             //单个
             pub fn notify(item: &impl Summary) {
                 println!("Breaking news! {}", item.summarize());
             }
             pub fn notify(item: &impl Summary,item: &impl Summary) {
                 println!("Breaking news! {}", item.summarize());
             }
             //多个
             pub fn notify(item: &(impl Summary + impl Summary)) {
                 println!("Breaking news! {}", item.summarize());
             }
             
         //Trait Bound 语法
         pub fn notify<T: Summary>(item: &T) {
             println!("Breaking news! {}", item.summarize());
         }
         pub fn notify<T: Summary + Summary>(item: &T) {
             println!("Breaking news! {}", item.summarize());
         }
         fn some_function<T, U>(t: &T, u: &U) -> i32
         where
             T: Display + Clone,
             U: Clone + Debug,
         {
         ```
     - 返回trait -> impl Summary 可以返回任意实现了trait的类型
         - 只存在单一实现了trait的类型
     - 有条件的实现trait
         ```rust
         //需要实现了Display的trait才能实现ToString的trait
         impl<T: Display> ToString for T {
             // --snip--
         }
         ```
 - 生命周期确保引用有效
     - 生命周期也是一种泛型
     - 生命周期的目的是避免悬垂引用,后者会导致程序引用了非预取引用的数据.
     - 生命周期注解语法
         - 使用生命周期注解,说明参数要和类型存在一样久的生命周期
         - &i32 //引用
         - &'a i32 //带有显式生命周期的引用
         - &‘a mut i32 //带有显式生命周期的可变引用
     - 函数签名中的生命周期注解
         - 泛型生命周期 'a 的具体生命周期等同于 x 和 y 的生命周期中较小的那一个。
         ```rust
         fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
             if x.len() > y.len() {
                 x
             } else {
                 y
             }
         }
         ```
     - 结构体定义中的生命周期注解
         ```rust
         //意为ImporttantExcerpt不能比part存在的更久
         //存放引用需要定义生命周期注解
         struct ImportantExcerpt<'a> {
             part: &'a str,
         }
         ```
     - 生命周期省略
         - 函数或方法的参数的生命周期被称为 输入生命周期（input lifetimes），而返回值的生命周期被称为 输出生命周期（output lifetimes）。
         - 三规则,减少无用代码
         ```rust
             //一 为参数添加不同生命周期
                 函数有一个引用参数的就有一个生命周期参数：fn foo<'a>(x: &'a i32)，有两个引用参数的函数就有两个不同的生命周期参数，fn foo<'a, 'b>(x: &'a i32, y: &'b i32)，依此类推。
             //二 一个参数 默认所有生命周期
                 第二条规则是如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数：fn foo<'a>(x: &'a i32) -> &'a i32。
             //三 对象生命周期自动填充
                 第三条规则是如果方法有多个输入生命周期参数并且其中一个参数是 &self 或 &mut self，说明是个对象的方法 (method)(译者注：这里涉及 rust 的面向对象参见 17 章)，那么所有输出生命周期参数被赋予 self 的生命周期。第三条规则使得方法更容易读写，因为只需更少的符号。
         ```
     - 方法定义中的生命周期注解
         ```rust
         //impl之后声明生命周期，并在接口体后使用，因为生命周期也是结构体的一部分
         //这里使用了第三条生命周期注解规则
         impl<'a> ImportantExcerpt<'a> {
             fn announce_and_return_part(&self, announcement: &str) -> &str {
                 println!("Attention please: {}", announcement);
                 self.part
             }
         }
         ```
     - 静态生命周期
         ```rust
             let s: &'static str = "I have a static lifetime.";
             生命周期存活于整个程序期间。
             所有字符串字面值都拥有'static生命周期
         ```
## 自动化测试
 - 使用``` cargo test ```进行自动化测试
 - 测试常用宏/注解
     ```rust
     //宏
         #[test] //表示这是一个测试函数
         #[should_panic(expected = "")] //测试出现panic时打印的信息
         #[ignore] //忽略当前测试函数
     //注解    
         assert!(true/false);
         assert_eq!(impl std::cmp::Eq,impl std::cmp::Eq)
         assert_ne!(impl std::cmp::Eq,impl std::cmp::Eq)
     ```
 - 基础测试
     - ``` #[should_panic(excepted="")] 与 Result<T,E> 冲突,不要组合使用  assert!会返回一个Err,为了正常返回,请不要为Result<T,E>值使用问号表达式```
     ```rust
     #[cfg(test)]
     pub mod auto_test {
         #[test] //表示这是一个测试函数
         #[should_panic(expected = "")] //测试出现panic时打印的信息
         pub fn it_works(){
             let result = 2 + 2;
             assert_eq!(result,4);  //断言
             //（true/false,打印painc, 需要打印的值）
             // assert!(a.max(&b),"结果不成立{}",a.max(&b));
         }
         //将Result<T,E>用于测试
         #[test]
         pub fn it_works() -> Result<(),String>{
             let result = 2 + 2;
             if result == 4 {
                 Ok(())
             } else {
                 Err("结果不相等".to_string())
             }
         }
     }
     ```
     - Result简洁,assert复杂
 - 控制测试
     - 精确控制测试所需的线程 ``` cargo test -- --test-threads=1```
     - 显示函数输出,即程序正确时的输出 ``` cargo test -- --show-output```
     - 指定函数名测试 ``` cargo test workds```
     - 指定多个函数测试符合add开头 ``` cargo test add```
 - 单元测试
     - 文件中创建包含测试函数的tests模块 并使用 #[cfg(test)] 标注模块
     - 可以测试私有函数
 - 集成测试
     - 创建一个tests目录
     - 创建测试代码 使用#[test]标识函数
     - 可以使用 ``` cargo test --test xx xxx```来表示需要测试的文件
## 迭代器与闭包
 - 闭包,可以捕获其环境的匿名函数
    - 创建闭包: ```   let example_closure = |x| x;```
    - 使用 : ``` example_closure(str) //返回str ``` 
    - 如同同一个闭包两次传入的值不一致，编译器会报错，第一次传入值这个闭包的类型就被锁定
    - 一个变量不能被多个闭包同时借用
    - 闭包实现修改时必须实现FnMut，即为闭包添加mut
    - 可为闭包的参数和返回值增加可选的类型注解
    - 创建线程移动变量到线程中使用 使用move移动所有权
        ```
            thread::spawn(move || println!("From thread: {:?}", name))
            .join()
            .unwrap();
        ```
 - 迭代器
    - 通过.iter()获取 
    - 都实现了Iterator trait
        - 内含item和next
        - sum方法获取迭代器的所有权并进行累加
        - 产生其他迭代器
            - iter()不会获取所有权
            - into_iter()会获取所有权
            ```rust
             //迭代器传入引用，调用clone复制，最后返回新数据，调用collect消费生成新数组
             let hit2:Vec<stu> = hit.iter().map(|h:&stu| -> stu { 
                let mut c = h.clone();
                c.hit=1;
                c
            }).collect();//消费迭代器生成数组 源数据并没有改变
            println!("{:#?}",hit2);
            //过滤hit大于1的结构
            hit.into_iter().filter(|s| s.hit > 1).collect()
            ```
    - 迭代器是 Rust 的 零成本抽象（zero-cost abstractions）之一(也就是说几乎找不到更快的解决方案了)
## 智能指针
 - Box<T>
    - box允许将一个值放在堆上而不是栈上,同样的是一个0开销的技术
    - 使用场景
        - 未知大小的类型,再上下文中需要确切类型值的时候
        - 大量数据不用拷贝直接转移所有权
        - 希望获得的值是实现了某个trait,而不关心具体的类型
    - 举几个栗子
        ```rust
            //sample a 栗子
                let box_char = Box::new('L');
                println!("{}",box_char);
            //box递归类型
                //使用智能指针创建cons list
                //box只解决了间接存储和和堆分配，没有其他特殊功能
                //Box创建的对象相当于一个引用，可以用*解引用
                enum List {
                    Cons(i32,Box<List>),
                    Nil
                }
                let list = Cons(1,Box::new(Cons(2,Box::new(Cons(3,Box::new(Nil))))));
                let (k,_v) = get_value(list);
                print!("{}",k);
        ```
     - 函数和方法的隐式转换
        - Deref 强制转换可以将 &String 转换为 &str,因为String 实现了 Deref trait
    - Deref 强制转换如何与可变性交互
        - DerefMut trait 用于重载可变引用的 * 运算符。
        - Rust 在发现类型和 trait 实现满足三种情况时会进行 Deref 强制转换：
            
            - 当 T: Deref<Target=U> 时从 &T 到 &U。
            - 当 T: DerefMut<Target=U> 时从 &mut T 到 &mut U。
            - 当 T: Deref<Target=U> 时从 &mut T 到 &U。
 - 使用DropTrait清理代码
    - 指定在值离开作用域时应该执行的代码的方式是实现 Drop trait
    ```rust
    impl<T> Drop for MyBox<T> {
        fn drop(&mut self) {
            println!("自定义指针被清理")
        }
    }
    ```
 - Rc<T>引用计数
    - Rc::clone(&a) Rc智能指针和Box类似，但是能进行,进行浅拷贝增加引用计数
    - Rc::strong_count(&a) 根据引用对象查看该数据有几个引用
    - Rc::weak_count(&a) 获取一个弱引用
    - 单线程环境中使用，多线程中使用Arc
 - weak<T>弱引用
    - weak::weak_count 获取所有的弱引用个数
    - upgrade 返回引用
 - RefCell 可修改不可变值
    - 在运行时检查借用规则
    - borrow_mut 获取不可变变量的可变引用
        - 返回Ref<T>类型的指针
    - borrow 获取不可变引用
        - 返回RefMut<T>类型指针
    - RefCell<T> 在任何时候只允许有多个不可变借用或一个可变借用。
 - 智能指针使用场景
    - Rc<T> 允许相同数据有多个所有者；Box<T> 和 RefCell<T> 有单一所有者。
    - Box<T> 允许在编译时执行不可变或可变借用检查；Rc<T>仅允许在编译时执行不可变借用检查；RefCell<T> 允许在运行时执行不可变或可变借用检查。
    - 因为 RefCell<T> 允许在运行时执行可变借用检查，所以我们可以在即便 RefCell<T> 自身是不可变的情况下修改其内部的值。
## 并发
 - 线程
    - Rust的线程使用1:1线程实现，这代编每一个语言级线程使用了一个系统线程。
    - 某些crate实现了不同于1:1模型的线程取舍
    - thread::spawn 传递一个闭包执行代码
    - thread::sleep(Duration::from_millis(1)); 暂停线程1毫秒
    - JoinHandle是thread::spawn的返回值 调用join能阻塞并等待线程执行完毕
    - move || 能移动被使用变量的所有权 drop可以提前丢弃所有权，使其变量无效
 - 消息传递
    - Rust提供了一个信道，将数据从一个线程发送到另一个线程
    - 分为发送者transmitter和接收者receiver，任何一方被丢弃认为信道被关闭closed
    - 可以通过clone创建多个生产者每个生产者向消费者发送不同消息
    - 接收者可以被当作迭代器通多for来使用
        ```rust
        for message in revIter{
            println!("{}",message);
        }
        ```
 - 宏
    - 宏分为 声明式宏 和 过程宏
    - 过程宏
        - #[derive] 为目标结构体或枚举派生指定代码
        - 类属性宏 为目标添加自定义属性
        - 类函数宏 看上去就像函数调用
    - 宏与函数的区别
        - 减少编写的代码
## 其他知识点
 - "" 常量字符串是&引用类型
- to_string方法是返回String值,而不是    引用,是值复制
-  &String 可以被 强转（coerced）成 &str 使用了Deref 强制转换（deref coercion）的技术 &String -> &str[..]
- Result<E,R>
    - 一个特殊的返回值
    - 成功返回 Ok(E)
    - 失败返回 Err(R)
    - 可用unwrap..或excepted自定义异常信息
        - unwrap("")
        - excepted("")
        ```rust
        //打印错误信息并退出程序
        unwrap_or_else(|err|{
            println!("参数输入错误: {err}");
            process::exit(1)
        });
        ```
    - 没有发生Err后会自动解构成E
    
- 收集程序启动参数及全局变量
        ```
            std::env::var("IGNORE_CASE").is_ok();//获取环境变量是否存在
            std::env::args() //获取启动时的参数 第一个默认程序启动路径
            linux: IGNORE_CASE=1; cargo run param1 param...
            windows powershell: $Env:ENV_NAME=1; cargo run 秋 param1 param...
        ```
- 特殊注解
    ```rust
        #[derive(Debug)]    //使用println!("{:?}",class_name);格式化类
        
    ```
- windows环境中文编码错误
    ```
    1、以管理员身份打开powershell，运行下面代码
     New-Item $PROFILE  -ItemType File -Force
    2、 打开C盘，找到我的文档中的WindowsPowerShell文件夹
    3、编辑这个ps1文件（默认是空的），加上以下代码
    $OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
    4、以管理员身份打开powershell，运行下面代码
    Set-ExecutionPolicy Unrestricted
    按Y确认即可
    5、打开powershell，输入chcp，查看代码活动页是否是65001 
    ```godot
    ru