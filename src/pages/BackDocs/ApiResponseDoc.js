import React, { PureComponent } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
import ApiResponseFile from '@/codes/ApiResponse';

class ApiResponseDoc extends PureComponent {
    renderResponseApiView = () => {
        const data = [
            {prop: 'code', desc: '状态码。除了框架定义的几种状态码外（见下表），开发者也可自定义状态码。', type: 'String', default: '1'},
            {prop: 'msg', desc: '提示信息。开发者可通过在抛出BusinessException的方式，定义具体的业务异常消息。', type: 'String', default: 'success'},
            {prop: 'data', desc: '接口返回的具体数据。', type: 'Object', default: 'null'}
        ];

        return <JsxApiView title="返回字段说明" data={data}/>;
    }

    renderCodeApiView = () => {
        const data = [
            {prop: '0', desc: '失败。当开发者在业务代码中抛出BusinessException或Form校验未通过，均返回该状态码。', type: 'String'},
            {prop: '1', desc: '成功', type: 'String'},
            {prop: '1001', desc: '未登录', type: 'String'},
            {prop: '1002', desc: '无权限', type: 'String'},
            {prop: '9999', desc: '系统异常', type: 'String'}
        ];

        return <JsxApiView title="系统状态码说明" data={data}/>;
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Card title="返回示例" bordered={false}>
                    <p>所有接口统一返回json格式数据，返回格式如下：</p>
                    <JsxCodeView showTitle={false} codeFile={ApiResponseFile}/>
                </Card>
                <br/>
                {this.renderResponseApiView()}
                <br/>
                {this.renderCodeApiView()}
            </PageHeaderWrapper>
        )
    }
}

export default ApiResponseDoc;