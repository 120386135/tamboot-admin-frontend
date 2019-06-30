import React, { PureComponent } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import XmlCodeView from '@/components/XmlCodeView';
import ClikeCodeView from '@/components/ClikeCodeView';
import MockmvcPomXmlFile from '@/codes/MockmvcPom.xml';
import MockmvcTestJavaFile from '@/codes/MockmvcTest.java';
import MockmvcIndexJavaFile from '@/codes/MockmvcIndex.java';

class MockmvcDoc extends PureComponent {
  renderApiView = () => {
    const data = [
      {
        prop: 'title',
        desc: '文档或接口的标题。如果不设置该项，则默认使用测试类或测试方法的名称。',
        type: 'String',
      },
      {
        prop: 'orderIndex',
        desc: '文档的排序，值越小排序越靠前。',
        type: 'Integer',
        default: '0',
      },
      {
        prop: 'snippets',
        desc:
          '在文档中使用哪些代码片段，系统中内置了QUERY_PARAMS_SNIPPETS（请求参数都在url参数上）、BODY_PARAMS_SNIPPETS（请求参数都在body中）、PATH_PARAMS_SNIPPETS（请求参数都在url路径上）三种类型。如果系统内置的代码片段不满足要求，开发者可以填写自定义的代码片段。',
        type: 'String',
        default: 'QUERY_PARAMS_SNIPPETS',
      },
      {
        prop: 'id',
        desc:
          '生成的adoc文件的id。测试类id生成方式为：将类名转成中划线分隔的字符串，并去除DocTest后缀。测试方法id生成方式为：类id-方法名',
        type: 'String',
      },
      {
        prop: 'ignore',
        desc: '是否跳过文档的生成',
        type: 'Boolean',
        default: 'false',
      },
    ];

    return <JsxApiView title="@AsciidocConfig配置" data={data} />;
  };

  render() {
    return (
      <PageHeaderWrapper>
        <Card title="概述" bordered={false}>
          <p>
            框架封装了API文档生成工具
            <a href="https://spring.io/projects/spring-restdocs" target="_blank">
              Spring Rest Docs
            </a>
            ，引入tamboot-restdocs-mockmvc后，只需编写相应的单元测试用例，就能自动生成API文档。
          </p>
        </Card>
        <br />

        <Card title="添加maven插件" bordered={false}>
          <XmlCodeView showTitle={false} codeFile={MockmvcPomXmlFile} />
        </Card>
        <br />

        <Card title="添加首页和数据字典文档" bordered={false}>
          <p>
            为了避免接口文档过于分散，开发者需单独添加一个测试类，生成数据字典的文档，并将所有子文档整合在一起。
          </p>
          <ClikeCodeView showTitle={false} codeFile={MockmvcIndexJavaFile} />
        </Card>
        <br />

        <Card title="编写测试用例" bordered={false}>
          <p>开发者只需要继承TambootDocTest，并针对相应的接口编写单元测试用例。</p>
          <ClikeCodeView showTitle={false} codeFile={MockmvcTestJavaFile} />
        </Card>
        <br />

        <Card title="生成文档" bordered={false}>
          <p>执行mvn package命令，默认会在src/main/apidoc目录下生成API文档。</p>
        </Card>
        <br />

        <Card title="模拟登录" bordered={false}>
          <p>
            当测试一些需要登录后才能操作的API时，开发者只需要在测试类或测试方法上添加@WithUserDetails(value
            = "user")注解（value值为对应的用户名，且系统中必须存在该用户）。
          </p>
        </Card>
        <br />

        {this.renderApiView()}
      </PageHeaderWrapper>
    );
  }
}

export default MockmvcDoc;
