import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import UpdateModal from '@/components/UpdateModal';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import ViewFile from '@/codes/UpdateModalView';
import ServiceFile from '@/codes/UpdateModalService';
import ModelFile from '@/codes/UpdateModalModel';

@connect(({ loading }) => ({
  updateLoading: loading.effects['systemRole/update'],
}))
class UpdateModalDoc extends PureComponent {
  handleUpdate = (fieldsValue, resolve) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRole/update',
      payload: fieldsValue,
      success: () => {
        resolve();
        message.success('修改角色成功');
      },
    });
  };

  renderUpdateModal = () => {
    const formItems = [
      { label: '提示', name: 'tip', render: (val, record, form) => <span>这是提示内容</span> },
      { label: '编码', name: 'roleCode', component: <Input disabled={true} /> },
      { label: '名称', name: 'roleName', component: <Input placeholder="必填" />, rules: [{ required: true, message: '请输入名称' }] },
      { label: '描述', name: 'roleDesc', component: <Input placeholder="对角色职责的描述" /> },
    ];

    const modalProps = {
      title: '修改角色',
      formItems: formItems,
      confirmLoading: this.props.updateLoading,
    };

    const modalMethods = {
      bindShowModal: showModal => {
        this.showUpdateModal = showModal;
      },
      onConfirm: this.handleUpdate,
    };

    const record = {
      id: '9999999',
      roleCode: 'MANAGER',
      roleName: '管理员',
      roleDesc: '进行系统的日常运维',
    };
    return (
      <Card title="样例" bordered={false}>
        <Button
          type="primary"
          icon="edit"
          onClick={() => {
            this.showUpdateModal(true, record);
          }}
        >
          修改
        </Button>
        <UpdateModal {...modalProps} {...modalMethods} />
      </Card>
    );
  };

  renderApiForUpdateModal = () => {
    const data = [
      { key: 'title', prop: 'title', desc: '必填，模态框标题', type: 'string' },
      { key: 'bindShowModal', prop: 'bindShowModal', desc: '必填，绑定触发模态框显示的函数，父组件可通过该函数控制模态框的显示', type: 'Function(showModal: Function)' },
      { key: 'formItems', prop: 'formItems', desc: '必填，新建form属性配置项，具体见下表', type: '[]' },
      { key: 'onConfirm', prop: 'onConfirm', desc: '必填，点击模态框确认按钮时的回调函数', type: 'Function(fieldsValue:{}, resetForm: Function)' },
      { key: 'loading', prop: 'loading', desc: '模态框form属性的加载状态', type: 'boolean | {delay:number}', default: 'false' },
      { key: 'confirmLoading', prop: 'confirmLoading', desc: '模态框确认按钮的加载状态', type: 'boolean | {delay:number}', default: 'false' },
      { key: 'formItemLayout', prop: 'formItemLayout', desc: 'form属性布局', type: '{labelCol:{span:number},  wrapperCol:{span:number}}', default: '{labelCol:{span:5},  wrapperCol:{span:15}}' },
    ];
    return <JsxApiView title="API - UpdateModal" data={data} />;
  };

  renderApiForFormItem = () => {
    const data = [
      { key: 'label', prop: 'label', desc: 'form属性标签', type: 'string' },
      { key: 'name', prop: 'name', desc: 'form属性名', type: 'string' },
      { key: 'component', prop: 'component', desc: 'form属性组件，比如<Input/>', type: 'object' },
      { key: 'rules', prop: 'rules', desc: (<span>form属性校验规则，参考ant design的<a href="https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99" target="_blank">校验规则</a></span>), type: '[]' },
      { key: 'render', prop: 'render', desc: '自定义渲染组件函数,优先于component参数', type: 'Function({val: object, record: object, form: Form }: object)'}
    ];
    return <JsxApiView title="API - formItem" data={data} />;
  };

  render() {
    return (
      <PageHeaderWrapper>
        {this.renderUpdateModal()}
        <br />
        <JsxCodeView title="代码 - view" codeFile={ViewFile} />
        <br />
        <JsxCodeView title="代码 - service" codeFile={ServiceFile} />
        <br />
        <JsxCodeView title="代码 - model" codeFile={ModelFile} />
        <br />
        {this.renderApiForUpdateModal()}
        <br />
        {this.renderApiForFormItem()}
      </PageHeaderWrapper>
    );
  }
}

export default UpdateModalDoc;
