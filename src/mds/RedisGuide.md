## 概述
框架的tamboot-redis模块基于[spring-data-redis](https://spring.io/projects/spring-data-redis)，封装了常用的redis操作，并实现命名空间、分布式锁功能。


## 创建命名空间
命名空间可以防止redis的key产生冲突，一般使用枚举值enum。

```java
public enum CustomRedisNamespace {
    TOKEN("token", "用户登录凭证"),
    CONFIG("config", "系统安全配置信息");

    private String code;

    private String msg;

    CustomRedisNamespace(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
```


## 创建redis模板
开发者需继承`TambootRedisTemplate`，并将其注册为spring的bean。

```java
@Component
public class CustomRedisTemplate extends TambootRedisTemplate<CustomRedisNamespace> {
    @Autowired
    private RedisTemplate redisTemplate;

    public SecurityRedisTemplate() {
        super(redisTemplate);
    }

    @Override
    protected String resolveNamespaceValue(CustomRedisNamespace namespace) {
        return "customApp:" + namespace.getCode();
    }
}
```


## 使用redis模板

```java
@Service
public class TestServiceImpl implements TestService {
    @Autowired
    private CustomRedisTemplate customRedisTemplate;

    @Override
    public void test() {
        customRedisTemplate.set(CustomRedisNamespace.CONFIG, "key", "value");
    }
}
```


## 分布式锁方法

方法 | 说明
-----|-----
lock(T namespace, String key, Duration timeout) | 尝试获取锁。如果该锁还未被释放，则获取失败，返回false。反之则获取成功，返回true，且经过timeout时长后，该锁将自动释放。
releaseLock(T namespace, String key) | 手动释放锁。在某些场景下，锁可能已获取成功，但后续的业务处理出现异常，需要释放锁来避免资源的占用，此时可以在finally中使用该方法来手机释放锁。
lockInDuration(T namespace, String key, Duration duration, long concurrent) | 尝试获取锁。该锁表示某个时间段内最多允许n个线程或进程同时获得锁。
