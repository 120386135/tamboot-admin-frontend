import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Input, Divider, Button, Modal, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageView from '@/components/PageView';
import Ellipsis from '@/components/Ellipsis';
import RoleMenuModal from '@/components/RoleMenuModal';
import CreateModal from '@/components/CreateModal';
import UpdateModal from '@/components/UpdateModal';

const confirm = Modal.confirm;

/* eslint react/no-multi-comp:0 */
@connect(({ systemRole, loading }) => ({
  systemRole,
  pageViewLoading: loading.effects['systemRole/fetchPage'],
  createLoading: loading.effects['systemRole/create'],
  updateLoading: loading.effects['systemRole/update']
}))
class Role extends PureComponent {
  handleCreate = (fieldsValue, resolve) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRole/create',
      payload: fieldsValue,
      callback: () => {
        resolve();
        this.refreshPageView();
      }
    })
  }

  handleUpdate = (fieldsValue, resolve) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRole/update',
      payload: fieldsValue,
      callback: () => {
        resolve();
        this.refreshPageView();
      }
    })
  }

  handleDelete = (record) => {
    const { dispatch } = this.props;
    const refreshPageView = this.refreshPageView;
    confirm({
      okText: '确认',
      cancelText: '取消',
      title: '确认要删除这个角色?',
      content: `${record.roleName}`,
      onOk() {
        return new Promise((resolve, reject) => {
          dispatch({
            type: 'systemRole/del',
            payload: record.id,
            successCallback: () => {
              message.success('角色已删除');
              resolve();
              refreshPageView();
            },
            failCallback: () => {
              reject();
            }
          })
        }).catch(() => reject);
      },
      onCancel() {},
    });
  }

  renderCreateModal = () => {
    const formItems = [
      {label: '编码', name: 'roleCode', component: <Input placeholder='由大写字母、下划线组成'/>, rules: [{required: true, message: '请输入编码'}, {pattern: new RegExp(/^[A-Z_]+$/), message: '角色编码由大写字母、下划线组成'}]},
      {label: '名称', name: 'roleName', component: <Input placeholder='必填'/>, rules: [{required: true, message: '请输入名称'}]},
      {label: '描述', name: 'roleDesc', component: <Input placeholder='对角色职责的描述'/> }
    ];

    const modalProps = {
      title: '新建角色',
      formItems: formItems,
      confirmLoading: this.props.createLoading
    }

    const modalMethods = {
      bindShowModal: (showModal) => {this.showCreateModal = showModal},
      onConfirm: this.handleCreate
    }

    return <CreateModal {...modalProps} {...modalMethods}/>;
  }

  renderUpdateModal = () => {
    const formItems = [
      {label: '编码', name: 'roleCode', component: <Input disabled={true}/>},
      {label: '名称', name: 'roleName', component: <Input placeholder='必填'/>, rules: [{required: true, message: '请输入名称'}]},
      {label: '描述', name: 'roleDesc', component: <Input placeholder='对角色职责的描述'/> }
    ];

    const modalProps = {
      title: '修改角色',
      formItems: formItems,
      confirmLoading: this.props.updateLoading
    }

    const modalMethods = {
      bindShowModal: (showModal) => {this.showUpdateModal = showModal},
      onConfirm: this.handleUpdate
    }

    return <UpdateModal {...modalProps} {...modalMethods}/>;
  }

  renderRoleMenuModal = () => {
    const modalMethods = {
      bindShowModal: (showModal) => {this.showRoleMenuModal = showModal}
    }

    return <RoleMenuModal {...modalMethods}/>;
  }

  renderPageView = () => {
    const columns = [
      { title: '编码', dataIndex: 'roleCode' },
      { title: '名称', dataIndex: 'roleName' },
      { title: '描述', dataIndex: 'roleDesc',
        render(val) {
          return <Ellipsis length={10} lines={1} tooltip={true}>{val}</Ellipsis>;
        }
      },
      { title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => {this.showRoleMenuModal(true, record)}}>分配菜单</a>
            <Divider type="vertical"/>
            <a onClick={() => {this.showUpdateModal(true, record)}}>修改</a>
            <Divider type="vertical"/>
            <a onClick={() => {this.handleDelete(record)}}>删除</a>
          </Fragment>
        ),
      }
    ];

    const searchFormItems = [
      {label: '编码', name: 'roleCodeLike', component: <Input/>},
      {label: '名称', name: 'roleNameLike', component: <Input/>},
    ];

  const operatorComponents = [<Button icon="plus" type="primary" onClick={() => this.showCreateModal(true)}>新建</Button>];

    const {
      dispatch,
      systemRole: { pageData },
      pageViewLoading,
    } = this.props;

    return (
      <PageView
          bindSearch={(search) => {this.refreshPageView = search}}
          dispatch={dispatch}
          loading={pageViewLoading}
          pageData={pageData}
          pageEffectType='systemRole/fetchPage'
          columns={columns}
          searchFormItems={searchFormItems}
          operatorComponents={operatorComponents}
        >
      </PageView>
    )
  }

  render() {
    return (
      <PageHeaderWrapper>
        {this.renderPageView()}
        {this.renderCreateModal()}
        {this.renderUpdateModal()}
        {this.renderRoleMenuModal()}
      </PageHeaderWrapper>
    );
  }
}

export default Role;
