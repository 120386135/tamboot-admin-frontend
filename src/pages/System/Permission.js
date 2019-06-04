import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Input, Select, Button, Divider, Modal, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageView from '@/components/PageView';
import CreateModal from '@/components/CreateModal';
import UpdateModal from '@/components/UpdateModal';

const Option = Select.Option;
const confirm = Modal.confirm;

@connect(({systemPermission, systemRole, loading}) => ({
    systemPermission,
    systemRole,
    pageViewLoading: loading.effects['systemPermission/fetchPage'],
    createLoading: loading.effects['systemPermission/create'],
    updateLoading: loading.effects['systemPermission/update']
}))
class Permission extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'systemRole/list'
        })
    }

    handleCreate = (fieldsValue, resolve) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'systemPermission/create',
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
            type: 'systemPermission/update',
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
          title: '确认要删除这条权限?',
          content: (<div>URL：{record.url}<br/>角色：{record.roleNames.join(',')}</div>),
          onOk() {
            return new Promise((resolve, reject) => {
              dispatch({
                type: 'systemPermission/del',
                payload: record.id,
                successCallback: () => {
                    message.success('权限已删除');
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

    handleRefresh = () => {
        const { dispatch } = this.props;
        confirm({
          okText: '确认',
          cancelText: '取消',
          title: '确认要刷新访问权限?',
          content: '该操作将使更改后的访问权限信息生效',
          onOk() {
            return new Promise((resolve, reject) => {
              dispatch({
                type: 'systemPermission/refresh',
                successCallback: () => {
                    message.success('系统访问权限已刷新');
                    resolve();
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
        const { systemRole: { roleList } } = this.props;

        const formItems = [
            {label: 'URL', name: 'url', component: <Input placeholder='ant path格式'/>, rules: [{required: true, message: '请输入URL'}]},
            {label: '角色', name: 'roleCodes', component: (
                <Select mode="multiple" style={{width: '100%'}}>
                    {roleList.map((role) => (<Option key={role.id} value={role.roleCode}>{role.roleName}</Option>))}
                </Select>
            ), rules: [{required: true, message: '请先择角色'}]}
        ];

        const modalProps = {
            title: '新建权限',
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
        const { systemRole: { roleList } } = this.props;
    
        const formItems = [
            {label: 'URL', name: 'url', component: <Input placeholder='ant path格式'/>, rules: [{required: true, message: '请输入URL'}]},
            {label: '角色', name: 'roleCodes', component: (
                <Select mode="multiple" style={{width: '100%'}}>
                    {roleList.map((role) => (<Option key={role.id} value={role.roleCode}>{role.roleName}</Option>))}
                </Select>
            ), rules: [{required: true, message: '请先择角色'}]}
        ];

        const modalProps = {
            title: '修改权限',
            formItems: formItems,
            confirmLoading: this.props.updateLoading
        }

        const modalMethods = {
            bindShowModal: (showModal) => {this.showUpdateModal = showModal},
            onConfirm: this.handleUpdate
        }

        return <UpdateModal {...modalProps} {...modalMethods}/>;
    }

    renderPageView = () => {
        const { 
            pageViewLoading,
            dispatch,
            systemPermission: { pageData },
            systemRole: { roleList }
        } = this.props;

        const columns = [
            {title: 'URL', dataIndex: 'url'},
            {title: '角色', dataIndex: 'roleNames', render: (roleNames) => {
                return roleNames?roleNames.join(','):'';
            }},
            {title: '操作', render: (text, record) => (
                <Fragment>
                    <a onClick={() => {this.showUpdateModal(true, record)}}>修改</a>
                    <Divider type="vertical"/>
                    <a onClick={() => {this.handleDelete(record)}}>删除</a>
                </Fragment>
            )}
        ];

        const searchFormItems = [
            {label: 'URL', name: 'urlLike', component: <Input/>},
            {label: '角色', name: 'roleCode', component: (
                <Select>
                    <Option key="0" value="">全部</Option>
                    {roleList.map((role) => (<Option key={role.id} value={role.roleCode}>{role.roleName}</Option>))}
                </Select>
            )}
        ];

    const operatorComponents = [
        <Button icon="plus" type="primary" onClick={() => this.showCreateModal(true)}>新建</Button>,
        <Button icon="reload" type="primary" onClick={() => this.handleRefresh(true)}>刷新</Button>
    ];

        return (
            <PageView
                bindSearch={(search) => this.refreshPageView = search}
                dispatch={dispatch}
                loading={pageViewLoading}
                pageData={pageData}
                pageEffectType='systemPermission/fetchPage'
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
            </PageHeaderWrapper>
        )
    }
}

export default Permission;