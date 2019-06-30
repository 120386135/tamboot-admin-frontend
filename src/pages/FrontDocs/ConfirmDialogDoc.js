import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { showConfirmDialog } from '@/components/ConfirmDialog';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import ViewFile from '@/codes/ConfirmDialogView';
import ServiceFile from '@/codes/ConfirmDialogService';
import ModelFile from '@/codes/ConfirmDialogModel';

@connect()
class ConfirmDialogDoc extends PureComponent {
  handleDelete = record => {
    const { dispatch } = this.props;
    showConfirmDialog(
      '确认要删除这个角色?',
      record.roleName,
      dispatch,
      'systemRole/del',
      record.id,
      () => {
        message.success('角色已删除');
      }
    );
  };

  renderConfirmDialog = () => {
    const record = {
      id: '999999',
      roleCode: 'MANAGER',
      roleName: '管理员',
      roleDesc: '进行系统的日常运维',
    };
    return (
      <Card title="样例" bordered={false}>
        <Button
          type="primary"
          icon="trash"
          onClick={() => {
            this.handleDelete(record);
          }}
        >
          删除
        </Button>
      </Card>
    );
  };

  renderApi = () => {
    const data = [
      {
        key: 'dialogTitle',
        prop: 'dialogTitle',
        desc: '模态框标题',
        type: 'string',
        default: '确认要进行该操作?',
      },
      {
        key: 'dialogContent',
        prop: 'dialogContent',
        desc: '模态框的内容',
        type: 'string | component',
      },
      {
        key: 'dispatch',
        prop: 'dispatch',
        desc: 'dva中的dispatch函数',
        type: 'Function(action: {})',
      },
      {
        key: 'dispatchType',
        prop: 'dispatchType',
        desc: '点击确认后网络请求的action type',
        type: 'string',
      },
      { key: 'payload', prop: 'payload', desc: '点击确认后网络请求的参数', type: 'object' },
      { key: 'success', prop: 'success', desc: '网络请求成功后的回调函数', type: 'Function()' },
    ];
    return <JsxApiView title="API - showConfirmDialog" data={data} />;
  };

  render() {
    return (
      <PageHeaderWrapper>
        {this.renderConfirmDialog()}
        <br />
        <JsxCodeView title="代码 - view" codeFile={ViewFile} />
        <br />
        <JsxCodeView title="代码 - service" codeFile={ServiceFile} />
        <br />
        <JsxCodeView title="代码 - model" codeFile={ModelFile} />
        <br />
        {this.renderApi()}
      </PageHeaderWrapper>
    );
  }
}

export default ConfirmDialogDoc;
