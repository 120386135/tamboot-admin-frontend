import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Input, Button, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import PageView from '@/components/PageView';
import TableRowActions from '@/components/TableRowActions';
import ViewFile from '@/codes/PageViewView';
import ServiceFile from '@/codes/PageViewService';
import ModelFile from '@/codes/PageViewModel';

@connect(({ systemUser, loading }) => ({
  systemUser,
  pageViewLoading: loading.effects['systemUser/page'],
}))
class PageViewDoc extends PureComponent {
  renderPageView = () => {
    const { dispatch, systemUser: { pageData }, pageViewLoading } = this.props;

    const actions = [
      { name: '移除', onClick: (text, record, index) => {this.deleteRow(record);}, checkVisible: (text, record) => record.isNew}
    ];

    const columns = [
      { title: '序号', dataIndex: 'index', render: (val, record, index) => (index+1)},
      { title: '用户名', dataIndex: 'username', editable: true, editType: 'text', editRules: [{required: true, message: '请填写用户名'}]},
      { title: '角色', dataIndex: 'roleCodeList', render: (val, record) => record.roleNameList?record.roleNameList.join(','):'', editable: true, editType: 'select', editData: {'MANAGER':'管理员', 'USER': '用户'}, editProps: {mode: 'multiple'} },
      { title: '操作', render: (text, record, index) => <TableRowActions actions={actions} record={record}/>}
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
      <Button key="batchEnable" type="primary" icon="check" onClick={this.handleBatchEnable}>启用</Button>,
      <Button key="add" type="primary" icon="plus" onClick={this.handleAddRow}>添加</Button>
    ];

    return (
      <Card title="样例" bordered={false}>
        <PageView
          selectable={true}
          bindRefresh={func => this.refresh = func}
          bindGetSelectedRows={func => this.getSelectedRows = func}
          bindAddRow={func => this.addRow = func}
          bindDeleteRow={func => this.deleteRow = func}
          loading={pageViewLoading}
          dispatch={dispatch}
          data={pageData}
          effectType="systemUser/page"
          reducerType="systemUser/savePageData"
          columns={columns}
          searchFormItems={searchFormItems}
          operatorComponents={operatorComponents}
          defaultPageSize={2}
          onSaveRow={this.handleSaveRow}
        />
      </Card>
    );
  };

  handleSaveRow = (record) => {
    if (record.isNew) {
      message.success('新增成功');
    } else {
      message.success('更新成功');
    }
    this.refresh();
  }

  handleAddRow = () => {
    this.addRow();
  }

  handleBatchEnable = () => {
    const selectedRows = this.getSelectedRows();
    if (!selectedRows || !selectedRows.length) {
      message.warning('请勾选要启用的数据');
      return;
    }

    message.success('已启用');
    this.refresh();
  }

  renderApiForPageView = () => {
    const data = [
      {key: 'dispatch', prop: 'dispatch', desc: '必填，dva中的dispatch函数', type: 'Function(action: {})', },
      {key: 'data', prop: 'data', desc: '必填，分页数据', type: '{list:[], pagination: {current:number, total:number, pageSize:number}}', },
      {key: 'effectType', prop: 'effectType', desc: '必填，获取分页数据的action type', type: 'string', },
      {key: 'reducerType', prop: 'reducerType', desc: '保存分页数据的action type，只在新增行功能中用到。', type: 'string', },
      {key: 'loading', prop: 'loading', desc: '载入状态', type: 'boolean | { delay: number }', default: 'false', },
      {key: 'columns', prop: 'columns', desc: '表格列配置，具体见下表', type: '[]', default: '[]',},
      {key: 'operatorComponents', prop: 'operatorComponents', desc: '操作按钮配置项，比如按钮组件列表', type: '[object]', default: '[]', },
      {key: 'searchFormItems', prop: 'searchFormItems', desc: '查询条件配置项，具体见下表', type: '[]', default: '[]', },
      {key: 'searchFormItemLayout', prop: 'searchFormItemLayout', desc: '查询条件项布局', type: '{md:number, sm:number}', default: '{md: 6, sm: 24}', },
      {key: 'searchFormRowGutter', prop: 'searchFormRowGutter', desc: '查询条件项间隔', type: '{md:number, lg:number, xl:number}', default: '{md: 8, lg: 24, xl: 48}'},
      {key: 'defaultPageNum', prop: 'defaultPageNum', desc: '默认页码', type: 'number', default: '1', },
      {key: 'defaultPageSize', prop: 'defaultPageSize', desc: '默认分页大小', type: 'number', default: '10', },
      {key: 'rowKey', prop: 'rowKey', desc: '结果列表行的key', type: 'string', default: 'id' },
      {key: 'selectable', prop: 'selectable', desc: '是否可勾选行', type: 'Boolean', default: 'false' },
      {key: 'onSaveRow', prop: 'onSaveRow', desc: '可编辑行的保存回调，当可编辑单元格失去焦点时会触发该方法。可通过record.isNew判断新增、更新操作。', type: 'Function(record: Object)'},
      {key: 'bindRefresh', prop: 'bindRefresh', desc: '绑定触发查询的函数，父组件可通过该函数触发查询操作', type: 'Function(refresh: Function(params:{}))', },
      {key: 'bindGetSelectedRows', prop: 'bindGetSelectedRows', desc: '绑定获取选定行的函数，父组件可通过该函数获取选定行。只有当selectable为true时有效', type: 'Function(getSelectedRow: Function)'},
      {key: 'bindAddRow', prop: 'bindAddRow', desc: '绑定添加新行函数，必须指定reducerType', type: 'Function(addRow: Function())'},
      {key: 'bindDeleteRow', prop: 'bindDeleteRow', desc: '绑定移除新行函数，必须指定reducerType', type: 'Function(deleteRow: Function(record))'}
    ];
    return <JsxApiView title="API - PageView" data={data} />;
  };

  renderApiForSearchFormItem = () => {
    const data = [
      { key: 'label', prop: 'label', desc: '查询条件标签', type: 'string' },
      { key: 'name', prop: 'name', desc: '查询条件属性名', type: 'string' },
      { key: 'component', prop: 'component', desc: '查询条件所用组件，比如<Input/>', type: 'object' },
    ];
    return <JsxApiView title="API - searchFormItem" data={data} />;
  };

  renderApiForColumn = () => {
    const data = [
      { key: 'title', prop: 'title', desc: '列头显示文字', type: 'string'},
      { key: 'dataIndex', prop: 'dataIndex', desc: '列数据在数据项中对应的 key，支持 a.b.c、a[0].b.c[1] 的嵌套写法', type: 'string'},
      { key: 'render', prop: 'render', desc: '生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并', type: 'Function(text, record, index) {}	'},
      { key: 'editable', prop: 'editable', desc: '是否可编辑', type: 'boolean', default: 'false'},
      { key: 'editType', prop: 'editType', desc: '编辑控件类型，目前支持text、number、select三种类型', type: 'string', default: 'text'},
      { key: 'editRules', prop: 'editRules', desc: '编辑控件的内容检验规则，比如[{required: true, message: "该项值不能为空"}]', type: 'array', default: '[]'},
      { key: 'editData', prop: 'editData', desc: '渲染编辑控件时用到的数据，比如editType为select时的数据为{"1":"选项1", "2":"选项2"}', type: 'object'},
      { key: 'editProps', prop: 'editProps', desc: '编辑控件的属性，比如多选的select，可加上editProps选项{mode: "multiple"}', type: 'object', default: '{}'},
      { key: 'editDefault', prop: 'editDefault', desc: '编辑控件的默认值', type: 'object' },
      { key: 'more', prop: '...', desc:  (<span>更多的配置描述，参考ant design的<a href="https://ant.design/components/table-cn/#Table" target="_blank">Table</a></span>)}
    ];

    return <JsxApiView title="API - columns" data={data}/>;
  }

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
        {this.renderApiForColumn()}
        <br />
        {this.renderApiForSearchFormItem()}
      </PageHeaderWrapper>
    );
  }
}

export default PageViewDoc;
