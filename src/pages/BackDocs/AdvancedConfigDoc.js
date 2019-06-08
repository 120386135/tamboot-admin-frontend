import React, { PureComponent } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import JsxApiView from '@/components/JsxApiView';

class AdvancedConfigDoc extends PureComponent {
    renderSecurityApiView = () => {
        const data = [
            {prop: 'spring.security.useRedisRepo', desc: '是否使用redis来保存登录凭证、访问权限等系统安全有关的数据。默认为false，表示将这些数据保存在本地内存中。', type: 'Boolean', default: 'false'},
            {prop: 'spring.security.loginPath', desc: '登录接口地址。如果该项未配置，则系统内置的登录接口不可用，开发者可实现自己的登录接口。', type: 'String'},
            {prop: 'spring.security.ignoringAntMatchers', desc: '绕过权限检查的接口请求地址，采用ant path格式。比如一些接口数据不需要用户登录就能访问，则可通过该配置项绕过权限检查。', type: 'String[]'},
            {prop: 'spring.security.interceptAntMatcher', desc: '检查权限时，只检查满足指定ant path格式的接口请求地址，其它地址均绕过。默认为空，表示检查除了ignoringAntMatchers外的所有接口地址。', type: 'String'},
            {prop: 'spring.security.tokenExpirySeconds', desc: '登录凭证失效时长，单位:秒，默认为一个月。', type: 'Integer', default: '2592000'},
            {prop: 'spring.security.rejectPublicInvocations', desc: '当系统未配置访问权限信息时，是否拒绝所有的接口访问请求。', type: 'Boolean', default: 'true'}
        ]

        return <JsxApiView title="Security配置项" data={data}/>;
    }

    renderMybatisApiView = () => {
        const data = [
            {prop: 'mybatis.ignoreInterceptor', desc: '是否跳过对update和insert语句的拦截。默认为false，表示拦截update和insert语句，自动更新id、creator、create_time、modifier、modify_time、version通用字段的值。', type: 'Boolean', default: 'false'},
            {prop: 'mybatis.throwVersionLockException', desc: '当发生乐观锁错误时，是否抛出异常。默认为false，表示不抛出异常，些时需要根据update语句的返回值判断数据是否更新成功。建议将该项置设为true。', type: 'Boolean', default: 'false'},
            {prop: 'mybatis.snowFlake.*', desc: '分布式id生成算法的配置'},
            {prop: 'mybatis.snowFlake.dataCenterId', desc: '数据中心id，从1到1024。当应用要分布式部署时，不同服务器的应用配置不同的值。', type: 'Long'},
            {prop: 'mybatis.snowFlake.generatorStartTime', desc: 'id生成器的开始时间的毫秒数，不能大于当前时间，一般采用默认值即可。', type: 'Long', default: '1493737860828'},
            {prop: 'mybatis.configuration.mapUnderscoreToCamelCase', desc: '自动将数据库表中带下划线的字段与Model中的驼峰命名的字段对应起来，使用本框架需设为true。', type: 'Boolean', default: 'false'},
            {prop: 'mybatis.*', desc: (<span>更多的配置可参考<a href="https://github.com/mybatis/spring-boot-starter/blob/master/mybatis-spring-boot-autoconfigure/src/main/java/org/mybatis/spring/boot/autoconfigure/MybatisProperties.java" target="_blank">MybatisProperties</a>和<a href="http://www.mybatis.org/mybatis-3/zh/configuration.html#settings" target="_blank">mybatis设置</a></span>)}
        ]

        return <JsxApiView title="Mybatis配置项" data={data}/>
    }

    renderDatasourceApiView = () => {
        const data = [
            {prop: 'spring.datasource.url', desc: '数据库地址', type: 'String'},
            {prop: 'spring.datasource.username', desc: '数据库用户名', type: 'String'},
            {prop: 'spring.datasource.password', desc: '数据库密码', type: 'String'},
            {prop: 'spring.datasource.hikari.*', desc: (<span><a href="https://github.com/brettwooldridge/HikariCP" target="_blank">hikari</a>数据库连接池配置</span>)},
            {prop: 'spring.datasource.hikari.autoCommit', desc: '设置数据库连接的auto-commit行为。默认为true，表示自动提交。', type: 'Boolean', default: 'true'},
            {prop: 'spring.datasource.hikari.minimumIdle', desc: '连接池的最少空闲连接数，当空闲连接数小于该值时，连接池会自动新建连接以满足该值。默认情况下，该值与maximumPoolSize相同。为了性能最优化，建议不要设置该值，使连接池的连接数保持固定。', type: 'Integer', default: '与maximumPoolSize相同'},
            {prop: 'spring.datasource.hikari.maximumPoolSize', desc: '连接池的最大连接数，包含空闲的连接和在用的连接。当连接池的连接数达到该值，且没有空闲连接时，新的连接请求将会等待connectionTimeout毫秒直到超时。', type: 'Integer', default: '10'},
            {prop: 'spring.datasource.hikari.connectionTimeout', desc: '从连接池中获取连接时，最长的等待时长（单位：毫秒）。如果超过该时长还没有可用的连接，则会抛出SQLException。最小值为250。', type: 'Long', default: '30000'},
            {prop: 'spring.datasource.hikari.idleTimeout', desc: '允许一个连接保持空闲状态的最长时间（单位：毫秒）。如果空闲连接数超过了minimumIdle，空闲时长超过该值的连接将被移除。该配置项只有在minimumIdle小于maximumPoolSize时才有效。最小值为10000。', type: 'Long', default: '600000'},
            {prop: 'spring.datasource.hikari.maxLifetime', desc: '一个连接的最长生命周期（单位：毫秒）。生命周期超过该值的连接将会从连接池中移徐（正在使用中的连接除外）。值0表示连接最长生命周期不限。', type: 'Long', default: '1800000'},
            {prop: 'spring.datasource.hikari.connectionTestQuery', desc: '当从连接池中获取一个连接时，执行该值的查询语句，判断连接是否可用。如果数据库驱动支持JDBC4的Connection.isValid()方法，该项不用设置。', type: 'String'},
            {prop: 'spring.datasource.hikari.poolName', desc: '连接池名称', type: 'String', default: '系统自动生成'}
        ]

        return <JsxApiView title="Datasource配置" data={data}/>;
    }

    renderRedisApiView = () => {
        const data = [
            {prop: 'spring.redis.url', desc: 'redis连接URL. 包含host、port、password等信息，user信息可忽略。 例子: redis://user:password@example.com:6379', type: 'String'},
            {prop: 'spring.redis.host', desc: 'redis服务器主机名或ip地址', type: 'String'},
            {prop: 'spring.redis.port', desc: 'redis服务器端口', type: 'Integer', default: '6379'},
            {prop: 'spring.redis.password', desc: '登录redis服务器的密码', type: 'String'},
            {prop: 'spring.redis.ssl', desc: '是否开启SSL', type: 'Boolean', default: 'false'},
            {prop: 'spring.redis.timeout', desc: 'redis连接的超时时间', type: 'Duration', default: '60s'},
            {prop: 'spring.redis.sentinel.master', desc: '哨兵模式的redis server名字', type: 'String'},
            {prop: 'spring.redis.sentinel.nodes', desc: '哨兵模式的redis地址。例如: 192.167.1.168:26379,192.168.1.168:26379,192.168.1.169:26379'},
            {prop: 'spring.redis.lettuce.pool.maxActive', desc: '连接池的最大连接数。负值表示不限制。', type: 'Integer', default: '8'},
            {prop: 'spring.redis.lettuce.pool.maxIdle', desc: '连接池的最大空闲连接数。负值表示不限制。', type: 'Integer', default: '8'},
            {prop: 'spring.redis.lettuce.pool.maxWait', desc: '获取连接的最大等待时长，超过该时长还未获取到连接则会抛出异常。负值表示一直等待。', type: 'Duration', default: '-1ms'},
            {prop: 'spring.redis.lettuce.pool.minIdle', desc: '连接池的最小空闲连接数，空闲连接小于该值时，会新建连接。', type: 'Integer', default: '0'},
            {prop: 'spring.redis.lettuce.shutdownTimeout', desc: '关闭lettuce的超时时间', type: 'Duration', default: '100ms'}
        ]

        return <JsxApiView title="Redis配置" data={data}/>;
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Card title="高级配置项介绍" bordered={false}>
                    <p>大部分情况下，应用可以直接使用最小化配置。如果开发者需要根据实际情况对应用进行调优，可以使用相应的高级配置项。下面是一些可用的高级配置项。</p>
                </Card>
                <br/>

                {this.renderSecurityApiView()}
                <br/>

                {this.renderMybatisApiView()}
                <br/>

                {this.renderDatasourceApiView()}
                <br/>

                {this.renderRedisApiView()}
                <br/>

                <Card title="更多配置" bordered={false}>
                    <p>更多的配置信息可以查看<a href="https://docs.spring.io/spring-boot/docs/2.1.5.RELEASE/reference/htmlsingle/#common-application-properties" target="_blank">Spring Boot配置项</a></p>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default AdvancedConfigDoc;
