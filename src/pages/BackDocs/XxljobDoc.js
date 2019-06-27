import React, { PureComponent } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import XxljobConfigFile from '@/codes/XxljobConfig.yml';
import XxljobJavaFile from '@/codes/TestXxlJob.java';

class ApiResponseDoc extends PureComponent {
  renderApiView = () => {
    const data = [
      {
        prop: 'tamboot.xxljob.client.appName',
        desc: '执行器AppName [选填]：执行器心跳注册分组依据；为空则关闭自动注册',
        type: 'String',
      },
      {
        prop: 'tamboot.xxljob.client.adminAddresses',
        desc:
          '调度中心部署跟地址 [选填]：如调度中心集群部署存在多个地址则用逗号分隔。执行器将会使用该地址进行"执行器心跳注册"和"任务结果回调"；为空则关闭自动注册；',
        type: 'String',
      },
      {
        prop: 'tamboot.xxljob.client.ip',
        desc:
          '执行器IP [选填]：默认为空表示自动获取IP，多网卡时可手动设置指定IP，该IP不会绑定Host仅作为通讯实用；地址信息用于 "执行器注册" 和 "调度中心请求并触发任务"；',
        type: 'String',
      },
      {
        prop: 'tamboot.xxljob.client.port',
        desc:
          '执行器端口号 [选填]：小于等于0则自动获取；默认端口为9999，单机部署多个执行器时，注意要配置不同执行器端口；',
        type: 'Integer',
        default: '9999',
      },
      {
        prop: 'tamboot.xxljob.client.accessToken',
        desc: '执行器通讯TOKEN [选填]：非空时启用；',
        type: 'String',
      },
      {
        prop: 'tamboot.xxljob.client.logPath',
        desc:
          '执行器运行日志文件存储磁盘路径 [选填] ：需要对该路径拥有读写权限；为空则使用默认路径；',
        type: 'String',
      },
      {
        prop: 'tamboot.xxljob.client.logRetentionDays',
        desc:
          '执行器日志保存天数 [选填] ：值大于3时生效，启用执行器Log文件定期清理功能，否则不生效；',
        type: 'Integer',
      },
    ];

    return <JsxApiView title="更多配置" data={data} />;
  };

  render() {
    return (
      <PageHeaderWrapper>
        <Card title="概述" bordered={false}>
          <p>
            框架封装了分布式任务调度平台
            <a href="http://www.xuxueli.com/xxl-job/#/" target="_blank">
              xxl-job
            </a>
            的客户端，引入tamboot-xxljob-client后，进行简单的配置就能使用。
          </p>
        </Card>
        <br />

        <Card title="简单配置" bordered={false}>
          <JsxCodeView showTitle={false} codeFile={XxljobConfigFile} />
        </Card>
        <br />

        <Card title="实现定时任务" bordered={false}>
          <p>
            开发者只需要继承IJobHandler，并添加@Component和@JobHandler注解，就能实现一个定时任务。
          </p>
          <JsxCodeView showTitle={false} codeFile={XxljobJavaFile} />
        </Card>
        <br />

        {this.renderApiView()}
      </PageHeaderWrapper>
    );
  }
}

export default ApiResponseDoc;
