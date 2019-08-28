import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Input, Button, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import ListView from '@/components/ListView';
import TableRowActions from '@/components/TableRowActions';
import ViewFile from '@/codes/ListViewView';
import ServiceFile from '@/codes/ListViewService';
import ModelFile from '@/codes/ListViewModel';

@connect(({ systemRole, loading }) => ({
  systemRole,
  listViewLoading: loading.effects['systemRole/list'],
}))
class ListViewDoc extends PureComponent {
  renderListView = () => {
    const { dispatch, systemRole: { roleList }, listViewLoading } = this.props;

    const actions = [
      { name: '移除', onClick: (text, record, index) => {this.deleteRow(record);}, checkVisible: (text, record) => record.isNew}
    ];

    const columns = [
      { title: '序号', dataIndex: 'index', render: (val, record, index) => (index+1)},
      { title: 'ID', dataIndex: 'id' },
      { title: '角色编码', dataIndex: 'roleCode', editDefault: 'TEST', editable: true, editType: 'text', editRules: [{required: true, message: '请填写角色编码'}]},
      { title: '角色名称', dataIndex: 'roleName', editable: true, editType: 'text', editRules: [{required: true, message: '请填写角色名称'}]},
      { title: '操作', render: (text, record, index) => <TableRowActions actions={actions} record={record}/>}
    ];


    const operatorComponents = [
      <Button key="add" type="primary" icon="plus" onClick={this.handleAdd}>添加</Button>,
    ];

    return (
      <Card title="样例" bordered={false}>
        <ListView
          selectable={true}
          bindRefresh={func => this.refresh = func}
          bindGetSelectedRows={func => this.getSelectedRows = func}
          bindAddRow={func => this.addRow = func}
          bindDeleteRow={func => this.deleteRow = func}
          loading={listViewLoading}
          dispatch={dispatch}
          data={roleList}
          effectType="systemRole/list"
          reducerType="systemRole/saveRoleList"
          columns={columns}
          operatorComponents={operatorComponents}
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

  handleAdd = () => {
    this.addRow();
  }

  renderApiForListView = () => {
    const data = [
      {key: 'dispatch', prop: 'dispatch', desc: '必填，dva中的dispatch函数', type: 'Function(action: {})', },
      {key: 'data', prop: 'data', desc: '必填，列表数据', type: '[]', },
      {key: 'effectType', prop: 'effectType', desc: '必填，获取列表数据的action type', type: 'string', },
      {key: 'reducerType', prop: 'reducerType', desc: '保存列表数据的action type，只在新增行功能中用到。', type: 'string', },
      {key: 'loading', prop: 'loading', desc: '载入状态', type: 'boolean | { delay: number }', default: 'false', },
      {key: 'columns', prop: 'columns', desc: '表格列配置，具体见下表', type: '[]', default: '[]',},
      {key: 'operatorComponents', prop: 'operatorComponents', desc: '操作按钮配置项，比如按钮组件列表', type: '[object]', default: '[]', },
      {key: 'rowKey', prop: 'rowKey', desc: '结果列表行的key', type: 'string', default: 'id' },
      {key: 'selectable', prop: 'selectable', desc: '是否可勾选行', type: 'Boolean', default: 'false' },
      {key: 'onSaveRow', prop: 'onSaveRow', desc: '可编辑行的保存回调，当可编辑单元格失去焦点时会触发该方法。可通过record.isNew判断新增、更新操作。', type: 'Function(record: Object)'},
      {key: 'bindRefresh', prop: 'bindRefresh', desc: '绑定触发查询的函数，父组件可通过该函数触发查询操作', type: 'Function(refresh: Function(params:{}))', },
      {key: 'bindGetSelectedRows', prop: 'bindGetSelectedRows', desc: '绑定获取选定行的函数，父组件可通过该函数获取选定行。只有当selectable为true时有效', type: 'Function(getSelectedRow: Function)'},
      {key: 'bindAddRow', prop: 'bindAddRow', desc: '绑定添加新行函数，必须指定reducerType', type: 'Function(addRow: Function())'},
      {key: 'bindDeleteRow', prop: 'bindDeleteRow', desc: '绑定移除新行函数，必须指定reducerType', type: 'Function(deleteRow: Function(record))'},
      {key: 'hidePagination', prop: 'hidePagination', desc: '是否隐藏分页器，默认隐藏', type: 'Boolean', default: 'true'},
      {key: 'queryComponent', prop: 'queryComponent', desc: '查询条件组件', type: 'object'},
      {key: 'getQueryParams', prop: 'getQueryParams', desc: '获取查询条件', type: 'Function(params: {})'}
    ];
    return <JsxApiView title="API - ListView" data={data} />;
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
        {this.renderListView()}
        <br />
        <JsxCodeView title="代码 - view" codeFile={ViewFile} />
        <br />
        <JsxCodeView title="代码 - service" codeFile={ServiceFile} />
        <br />
        <JsxCodeView title="代码 - model" codeFile={ModelFile} />
        <br />
        {this.renderApiForListView()}
        <br />
        {this.renderApiForColumn()}
      </PageHeaderWrapper>
    );
  }
}

export default ListViewDoc;
