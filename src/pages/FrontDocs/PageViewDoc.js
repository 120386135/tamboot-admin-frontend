import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Input, Button, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import PageView from '@/components/PageView';
import ViewFile from '@/codes/PageViewView';
import ServiceFile from '@/codes/PageViewService';
import ModelFile from '@/codes/PageViewModel';

@connect(({ systemUser, loading }) => ({
  systemUser,
  pageViewLoading: loading.effects['systemUser/page'],
}))
class PageViewDoc extends PureComponent {
  renderPageView = () => {
    const {
      dispatch,
      systemUser: { pageData },
      pageViewLoading,
      selectable
    } = this.props;

    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: '用户名', dataIndex: 'username' },
      { title: '角色', dataIndex: 'roleNameList', render: val => val.join(',') },
    ];

    const searchFormItems = [
      { label: '用户名', name: 'usernameLike', component: <Input placeholder="支持模糊查询" /> },
      { label: '条件1', name: 'field1', component: <Input/> },
      { label: '条件2', name: 'field2', component: <Input/> },
      { label: '条件3', name: 'field3', component: <Input/> },
      { label: '条件4', name: 'field4', component: <Input/> },
      { label: '条件5', name: 'field5', component: <Input/> },
      { label: '条件6', name: 'field6', component: <Input/> },
    ];

    const operatorComponents = [
      <Button key="batchEnable" type="primary" icon="check" onClick={this.handleBatchEnable}>
        启用
      </Button>,
    ];

    return (
      <Card title="样例" bordered={false}>
        <PageView
          selectable={true}
          bindGetSelectedRows={(func) => this.getSelectedRows = func}
          loading={pageViewLoading}
          dispatch={dispatch}
          pageData={pageData}
          pageEffectType="systemUser/page"
          columns={columns}
          searchFormItems={searchFormItems}
          operatorComponents={operatorComponents}
          defaultPageSize={2}
        />
      </Card>
    );
  };

  handleBatchEnable = () => {
    const selectedRows = this.getSelectedRows();
    if (!selectedRows || selectedRows.length === 0) {
      message.warning('请勾选要启用的数据');
      return;
    }

    message.success('已启用');
  }

  renderApiForPageView = () => {
    const data = [
      {
        key: 'dispatch',
        prop: 'dispatch',
        desc: '必填，dva中的dispatch函数',
        type: 'Function(action: {})',
      },
      {
        key: 'pageData',
        prop: 'pageData',
        desc: '必填，分页数据',
        type: '{list:[], pagination: {current:number, total:number, pageSize:number}}',
      },
      {
        key: 'pageEffectType',
        prop: 'pageEffectType',
        desc: '必填，获取分页数据的action type',
        type: 'string',
      },
      {
        key: 'loading',
        prop: 'loading',
        desc: '载入状态',
        type: 'boolean | { delay: number }',
        default: 'false',
      },
      {
        key: 'columns',
        prop: 'columns',
        desc: (
          <span>
            表格列的配置描述，参考ant design的
            <a href="https://ant.design/components/table-cn/#Table" target="_blank">
              Table
            </a>
          </span>
        ),
        type: '[]',
        default: '[]',
      },
      {
        key: 'searchFormItems',
        prop: 'searchFormItems',
        desc: '查询条件配置项，具体见下表',
        type: '[]',
        default: '[]',
      },
      {
        key: 'operatorComponents',
        prop: 'operatorComponents',
        desc: '操作按钮配置项，比如按钮组件列表',
        type: '[object]',
        default: '[]',
      },
      {
        key: 'bindSearch',
        prop: 'bindSearch',
        desc: '绑定触发查询的函数，父组件可通过该函数触发查询操作',
        type: 'Function(search: Function)',
      },
      {
        key: 'selectable',
        prop: 'selectable',
        desc: '是否可勾选行',
        type: 'Boolean',
        default: 'false'
      },
      {
        key: 'bindGetSelectedRows',
        prop: 'bindGetSelectedRows',
        desc: '绑定获取选定行的函数，父组件可通过该函数获取选定行。只有当selectable为true时有效',
        type: 'Function(getSelectedRow: Function)'
      },
      {
        key: 'searchFormItemLayout',
        prop: 'searchFormItemLayout',
        desc: '查询条件布局',
        type: '{md:number, sm:number}',
        default: '{md: 6, sm: 24}',
      },
      {
        key: 'defaultPageNum',
        prop: 'defaultPageNum',
        desc: '默认页码',
        type: 'number',
        default: '1',
      },
      {
        key: 'defaultPageSize',
        prop: 'defaultPageSize',
        desc: '默认分页大小',
        type: 'number',
        default: '10',
      },
      { key: 'rowKey', prop: 'rowKey', desc: '结果列表行的key', type: 'string', default: 'id' },
    ];
    return <JsxApiView title="API - PageView" data={data} />;
  };

  renderApiForSearchFormItem = () => {
    const data = [
      { key: 'label', prop: 'label', desc: '查询条件标签', type: 'string' },
      { key: 'name', prop: 'name', desc: '查询条件属性名', type: 'string' },
      {
        key: 'component',
        prop: 'component',
        desc: '查询条件所用组件，比如<Input/>',
        type: 'object',
      },
    ];
    return <JsxApiView title="API - searchFormItem" data={data} />;
  };

  render() {
    return (
      <PageHeaderWrapper>
        {this.renderPageView()}
        <br />
        <JsxCodeView title="代码 - view" codeFile={ViewFile} />
        <br />
        <JsxCodeView title="代码 - service" codeFile={ServiceFile} />
        <br />
        <JsxCodeView title="代码 - model" codeFile={ModelFile} />
        <br />
        {this.renderApiForPageView()}
        <br />
        {this.renderApiForSearchFormItem()}
      </PageHeaderWrapper>
    );
  }
}

export default PageViewDoc;
