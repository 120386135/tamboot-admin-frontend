import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Input, message } from 'antd';
import { formatMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FormView from '@/components/FormView';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import ViewFile from '@/codes/FormViewView';
import ServiceFile from '@/codes/FormViewService';
import ModelFile from '@/codes/FormViewModel';

@connect(({ loading }) => ({
  submitLoading: loading.effects['commonUser/updatePassword'],
}))
class FormViewDoc extends PureComponent {
  handleSubmit = (fieldsValue, resolve) => {
    const { dispatch } = this.props;
    if (fieldsValue.newPassword !== fieldsValue.confirmPassword) {
      message.warning('两次密码输入不一致');
      return;
    }

    // eslint-disable-next-line
    fieldsValue.confirmPassword = undefined;
    dispatch({
      type: 'commonUser/updatePassword',
      payload: fieldsValue,
      success: () => {
        resolve();
        message.success('修改密码成功');
      },
    });
  };

  renderSampleView = () => {
    const { submitLoading } = this.props;
    const formItems = [
      {
        label: '原密码',
        name: 'oldPassword',
        component: <Input type="password" />,
        rules: [{ required: true, message: '请输入原密码' }],
      },
      {
        label: '新密码',
        name: 'newPassword',
        component: <Input type="password" />,
        rules: [{ required: true, message: '请输入新密码' }],
      },
      {
        label: '确认密码',
        name: 'confirmPassword',
        component: <Input type="password" />,
        rules: [{ required: true, message: '请输入确认密码' }],
      },
    ];

    return (
      <Card title="样例" bordered={false}>
        <FormView
          formItems={formItems}
          submitLoading={submitLoading}
          onSubmit={this.handleSubmit}
        />
      </Card>
    );
  };

  renderApi = () => {
    const data = [
      {
        key: 'submitText',
        prop: 'submitText',
        desc: '提交按钮文字',
        type: 'string',
        default: '提交',
      },
      { key: 'formItems', prop: 'formItems', desc: 'form表单属性配置项，具体见下表', type: '[]' },
      {
        key: 'onSubmit',
        prop: 'onSubmit',
        desc: '必填，点击提交按钮时的回调函数',
        type: 'Function(fieldsValue:{}, resolve: Function)',
      },
      {
        key: 'submitLoading',
        prop: 'submitLoading',
        desc: '点击提交按钮的加载状态',
        type: 'boolean | {delay:number}',
        default: 'false',
      },
      {
        key: 'initialValues',
        prop: 'initialValues',
        desc: 'form表单初始值',
        type: 'object',
        default: '{}',
      },
      {
        key: 'loading',
        prop: 'loading',
        desc: 'form表单初始值加载状态',
        type: 'boolean | {delay:number}',
        default: 'false',
      },
      {
        key: 'formItemLayout',
        prop: 'formItemLayout',
        desc: 'form表单项布局',
        type: '{labelCol:{span:number},  wrapperCol:{span:number}}',
        default:
          '{labelCol: { xs: { span: 24 }, sm: { span: 7 } }, wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 10 } } }',
      },
      {
        key: 'submitItemLayout',
        prop: 'submitItemLayout',
        desc: '提交按钮项布局',
        type: '{labelCol:{span:number},  wrapperCol:{span:number}}',
        default: '{wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 10, offset: 7 } } }',
      },
    ];
    return <JsxApiView title="API - FormView" data={data} />;
  };

  renderApiForFormItem = () => {
    const data = [
      { key: 'label', prop: 'label', desc: 'form属性标签', type: 'string' },
      { key: 'name', prop: 'name', desc: 'form属性名', type: 'string' },
      { key: 'component', prop: 'component', desc: 'form属性组件，比如<Input/>', type: 'object' },
      {
        key: 'rules',
        prop: 'rules',
        desc: (
          <span>
            form属性校验规则，参考ant design的
            <a
              href="https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99"
              target="_blank"
            >
              校验规则
            </a>
          </span>
        ),
        type: '[]',
      },
    ];
    return <JsxApiView title="API - formItem" data={data} />;
  };

  render() {
    return (
      <PageHeaderWrapper>
        {this.renderSampleView()}
        <br />
        <JsxCodeView title="代码 - view" codeFile={ViewFile} />
        <br />
        <JsxCodeView title="代码 - service" codeFile={ServiceFile} />
        <br />
        <JsxCodeView title="代码 - model" codeFile={ModelFile} />
        <br />
        {this.renderApi()}
        <br />
        {this.renderApiForFormItem()}
      </PageHeaderWrapper>
    );
  }
}

export default FormViewDoc;
