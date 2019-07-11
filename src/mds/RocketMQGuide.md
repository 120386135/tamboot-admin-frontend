## 概述
tamboot-rocketmq-client模块基于[rocketmq-spring](https://github.com/apache/rocketmq-spring)，封装了普通消息、有序消息、延时消息、事务消息的收发方法。


## 最小配置

`在application.yml中添加以下配置:`

```yml
rocketmq:
  name-server: 127.0.0.1:9876
  producer:
    group: gid-sample-producer
```


## 普通消息

`发送消息:`

```java
@Autowired
private TambootRocketMQTemplate rocketMQTemplate;

public void sendSimpleMsg() {
    SimpleMessage msg = new SimpleMessage();
    msg.setOrderNo("NO3987359834759348534");
    msg.setAmount(new BigDecimal(200));
    msg.setOrderTime(new Date());
    msg.setUserId(888888l);
    rocketMQTemplate.syncSend("simple-topic", msg);
}
```

`接收消息（@RocketMQMessageListener中的topic、consumerGroup支持占位符${}）:`

```java
@Component
@RocketMQMessageListener(topic = "simple-topic", consumerGroup = "gid-sample-consumer_simple-topic")
public class SimpleMessageListener implements RocketMQListener<SimpleMessage>, RocketMQPushConsumerLifecycleListener {
    private static final Logger logger = LoggerFactory.getLogger(SimpleMessageListener.class);

    private AtomicInteger consumeTimes = new AtomicInteger(0);

    @Autowired
    private AppRocketMQProperties appRocketMQProperties;

    public void onMessage(SimpleMessage orderMessage) {
        if (consumeTimes.getAndIncrement() % 2 == 0) {
            logger.error("try to consume later");
            throw new BusinessException("consume later");
        }
        logger.info("receive simple message: {}", JsonMapper.nonNullMapper().toJson(orderMessage));
    }

    public void prepareStart(DefaultMQPushConsumer consumer) {
        //可以在此处，根据配置文件信息来设置消息消费者的参数
        consumer.setConsumeThreadMin(appRocketMQProperties.getSimpleMessage().getConsumeThreadMin());
        consumer.setConsumeThreadMax(appRocketMQProperties.getSimpleMessage().getConsumeThreadMax());
    }
}
```


## 有序消息

`发送消息：`

```java
@Autowired
private TambootRocketMQTemplate rocketMQTemplate;

public void sendOrderly() {
    for (int orderNo = 1; orderNo < 6; orderNo++) {
        for (int sequence = 1; sequence < 5; sequence ++ ) {
            OrderlyMessage msg = new OrderlyMessage();
            msg.setOrderNo("NO" + orderNo);
            msg.setSequence(sequence);
            //第3个能数"orderNo"表示：orderNo字段相同的消息保持有序
            rocketMQTemplate.syncSendOrderly("order-topic", msg, "orderNo");
        }
    }
}
```

`接收消息：`

```java
@Component
@RocketMQMessageListener(topic = "order-topic", consumerGroup = "gid-sample-consumer_order-topic", consumeMode = ConsumeMode.ORDERLY)
public class OrderlyMessageListener implements RocketMQListener<OrderlyMessage>,RocketMQPushConsumerLifecycleListener {
    private static final Logger logger = LoggerFactory.getLogger(OrderlyMessageListener.class);

    @Autowired
    private AppRocketMQProperties appRocketMQProperties;

    @Override
    public void onMessage(OrderlyMessage message) {
        logger.info("receive orderly message: {}", JsonMapper.nonNullMapper().toJson(message));
    }

    @Override
    public void prepareStart(DefaultMQPushConsumer consumer) {
        consumer.setConsumeThreadMin(appRocketMQProperties.getOrderlyMessage().getConsumeThreadMin());
        consumer.setConsumeThreadMax(appRocketMQProperties.getOrderlyMessage().getConsumeThreadMax());
    }
}
```


## 延时消息

延时消息会在发送消息后的某个时间被消息。以取消超时未付款订单为例：用户下单后，30分钟未付款则取消订单，此时可发送一条取消订单的延时消息，消费者30分钟后收到消息，判断是否已付款，如果未付款则取消订单。

`发送消息：`

```java
@Autowired
private TambootRocketMQTemplate rocketMQTemplate;

public void sendDelay() {
    DelayMessage msg = new DelayMessage();
    msg.setCreateTime(new Date());
    rocketMQTemplate.syncSendWithDelay("delay-topic", msg, MessageDelayLevel.DELAY_30S);
}
```

`接收消息：`

参考接收普通消息。


## 事务消息

事务消息一般用于保证多个系统间的数据一致性。以订单系统与库存系统的交互为例：用户下单成功后需扣减库存，些时可在下单的逻辑中添加发送减库存事务消息的代码，然后通过回查消息接口来判断下单的逻辑是否已成功，如果成功则提交事务消息，库存系统就能接收到减库存的事务消息来触发减库存操作，反之则回滚事务消息。

`发送消息：`

发送消息后，消息处于半事务状态，该状态下消息不会被消费者消费。

```java
@Autowired
private TambootRocketMQTemplate rocketMQTemplate;

public void sendTransaction() {
    TransactionMessage payload = new TransactionMessage();
    payload.setSequence(1);
    Message<TransactionMessage> message = MessageBuilder
        .withPayload(payload)
        .setHeader("msgType", TransactionMessage.class.getName())
        .setHeader("orderNo", "NO789798798798987")
        .build();
    rocketMQTemplate.syncSendInTransaction("transaction-topic", message, null);
}
```

`接收消息：`

可参考接收普通消息。

`回查消息：`

通过回查消息，来确认消息是否能被消费者消费。

```java
@RocketMQTransactionListener
public class ProducerTransactionListener implements RocketMQLocalTransactionListener {
    private static final Logger logger = LoggerFactory.getLogger(ProducerTransactionListener.class);

    private AtomicInteger checkTimes = new AtomicInteger(1);

    @Override
    public RocketMQLocalTransactionState executeLocalTransaction(Message msg, Object arg) {
        return RocketMQLocalTransactionState.UNKNOWN;
    }

    @Override
    public RocketMQLocalTransactionState checkLocalTransaction(Message msg) {
        MessageHeaders headers = msg.getHeaders();
        String msgType = (String) headers.get("msgType");

        if (TransactionMessage.class.getName().equals(msgType)) {
            return checkForTransactionMessage(headers);
        } else {
            return RocketMQLocalTransactionState.ROLLBACK;
        }
    }

    private RocketMQLocalTransactionState checkForTransactionMessage(MessageHeaders headers) {
        String orderNo = (String) headers.get("orderNo");
        int times = checkTimes.getAndIncrement();
        logger.info("check transaction message, times: {}, orderNo: {}", times, orderNo);
        if (times % 5 == 0) {
            return RocketMQLocalTransactionState.COMMIT;
        }

        return RocketMQLocalTransactionState.UNKNOWN;
    }
}
```

## 更多功能

更多功能可调用`TambootRocketMQTemplate#getDelegate()`。