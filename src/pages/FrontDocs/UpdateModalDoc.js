import React, { PureComponent } from 'react';
import { Card, Button, Input, message, Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import UpdateModal from '@/components/UpdateModal';
import ViewFile from '@/codes/UpdateModalView';

class UpdateModalDoc extends PureComponent {
    renderUpdateModal = () => {
        const formItems = [
            {label: '属性1', name: 'field1', component: <Input/>, rules: [{required: true, message: '请输入属性1'}]},
            {label: '属性2', name: 'field2', component: <Input/>, rules: [{required: true, message: '请输入属性2'}]},
        ]
        
        return (
            <Card title="样例" bordered={false}>
                <a onClick={() => {this.showModal(true, {field1: '修改1-值1', field2: '修改1-值2'})}}>修改1</a>
                <Divider type="vertical"/>
                <a onClick={() => {this.showModal(true, {field1: '修改2-值1', field2: '修改2-值2'})}}>修改2</a>
                <UpdateModal
                    title='修改模态框'
                    bindShowModal={showModal => this.showModal = showModal}
                    formItems={formItems}
                    onConfirm={(fieldsValue, resetFrom) => {
                        message.success(`属性1:${fieldsValue.field1}`);
                        resetFrom();
                    }}
                />
            </Card>
        )
    }

    renderApiForUpdateModal = () => {
        const data = [
            {key: 'title', prop: 'title', desc: '必填，模态框标题', type: 'string'},
            {key: 'bindShowModal', prop: 'bindShowModal', desc: '必填，绑定触发模态框显示的函数，父组件可通过该函数控制模态框的显示', type: 'Function(showModal: Function)'},
            {key: 'formItems', prop: 'formItems', desc: '必填，新建form属性配置项，具体见下表', type: '[]'},
            {key: 'onConfirm', prop: 'onConfirm', desc: '必填，点击模态框确认按钮时的回调函数', type: 'Function(fieldsValue:{}, resetForm: Function)'},
            {key: 'loading', prop: 'loading', desc: '模态框form属性的加载状态', type: 'boolean | {delay:number}', default: 'false'},
            {key: 'confirmLoading', prop: 'confirmLoading', desc: '模态框确认按钮的加载状态', type: 'boolean | {delay:number}', default: 'false'},
            {key: 'formItemLayout', prop: 'formItemLayout', desc: 'form属性布局', type: '{labelCol:{span:number},  wrapperCol:{span:number}}', default: '{labelCol:{span:5},  wrapperCol:{span:15}}'}
        ];
        return <JsxApiView title="API - UpdateModal" data={data}/>
    }

    renderApiForFormItem = () => {
        const data = [
            {key: 'label', prop: 'label', desc: 'form属性标签', type: 'string'},
            {key: 'name', prop: 'name', desc: 'form属性名', type: 'string'},
            {key: 'component', prop: 'component', desc: 'form属性组件，比如<Input/>', type: 'object'},
            {key: 'rules', prop: 'rules', desc: (<span>form属性校验规则，参考ant design的<a href="https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99" target="_blank">校验规则</a></span>), type: '[]'}
        ];
        return <JsxApiView title="API - formItem" data={data}/>;
    }

    render() {
        return (
            <PageHeaderWrapper>
                {this.renderUpdateModal()}
                <br/>
                <JsxCodeView title="代码 - view" codeFile={ViewFile}/>
                <br/>
                {this.renderApiForUpdateModal()}
                <br/>
                {this.renderApiForFormItem()}
            </PageHeaderWrapper>
        )
    }
}

export default UpdateModalDoc;