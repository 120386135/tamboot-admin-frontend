import React, { PureComponent } from 'react';
import { Card, Button, Input, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import CreateModal from '@/components/CreateModal';
import ViewFile from '@/codes/CreateModalView';

class CreateModalDoc extends PureComponent {
    renderCreateModal = () => {
        const formItems = [
            {label: '属性1', name: 'field1', component: <Input/>, rules: [{required: true, message: '请输入属性1'}]},
            {label: '属性2', name: 'field2', component: <Input/>, rules: [{required: true, message: '请输入属性2'}]},
        ]
        
        return (
            <Card title="样例" bordered={false}>
                <Button type="primary" icon="plus" onClick={() => {this.showModal(true)}}>新建</Button>
                <CreateModal
                    title='新建模态框'
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

    renderApiForCreateModal = () => {
        const data = [
            {key: 'title', prop: 'title', desc: '必填，模态框标题', type: 'string'},
            {key: 'bindShowModal', prop: 'bindShowModal', desc: '必填，绑定触发模态框显示的函数，父组件可通过该函数控制模态框的显示', type: 'Function(showModal: Function)'},
            {key: 'formItems', prop: 'formItems', desc: '必填，新建form属性配置项，具体见下表', type: '[]'},
            {key: 'onConfirm', prop: 'onConfirm', desc: '必填，点击模态框确认按钮时的回调函数', type: 'Function(fieldsValue:{}, resetForm: Function)'},
            {key: 'confirmLoading', prop: 'confirmLoading', desc: '模态框确认按钮的加载状态', type: 'boolean | {delay:number}', default: 'false'},
            {key: 'formItemLayout', prop: 'formItemLayout', desc: 'form属性布局', type: '{labelCol:{span:number},  wrapperCol:{span:number}}', default: '{labelCol:{span:5},  wrapperCol:{span:15}}'}
        ];
        return <JsxApiView title="API - CreateModal" data={data}/>
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
                {this.renderCreateModal()}
                <br/>
                <JsxCodeView title="代码 - view" codeFile={ViewFile}/>
                <br/>
                {this.renderApiForCreateModal()}
                <br/>
                {this.renderApiForFormItem()}
            </PageHeaderWrapper>
        )
    }
}

export default CreateModalDoc;