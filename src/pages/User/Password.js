import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;

@connect(({ loading }) => ({
  updateLoading: loading.effects['commonUser/updatePassword'],
}))
@Form.create()
class Password extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return;

      if (fieldsValue.newPassword !== fieldsValue.confirmPassword) {
        message.warning('两次密码输入不一致');
        return;
      }

      // eslint-disable-next-line
      fieldsValue.confirmPassword = undefined;
      dispatch({
        type: 'commonUser/updatePassword',
        payload: fieldsValue,
        callback: () => {
          message.success('密码修改成功');
          form.resetFields();
        },
      });
    });
  };

  render() {
    const {
      updateLoading,
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="原密码">
              {getFieldDecorator('oldPassword', {
                rules: [{ required: true, message: '请输入原密码' }],
              })(<Input type="password" placeholder="请输入原密码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="新密码">
              {getFieldDecorator('newPassword', {
                rules: [
                  { required: true, message: '请输入新密码' },
                  {
                    pattern: /^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{8,}$/,
                    message: '至少8位数字、大小写字母、特殊字符_#@!组成',
                  },
                ],
              })(<Input type="password" placeholder="至少8位数字、大小写字母、特殊字符_#@!组成" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="确认密码">
              {getFieldDecorator('confirmPassword', {
                rules: [
                  { required: true, message: '请输入确认密码' },
                  {
                    pattern: /^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{8,}$/,
                    message: '至少8位数字、大小写字母、特殊字符_#@!组成',
                  },
                ],
              })(<Input type="password" placeholder="至少8位数字、大小写字母、特殊字符_#@!组成" />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateLoading}
                style={{ width: '100%' }}
              >
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Password;
