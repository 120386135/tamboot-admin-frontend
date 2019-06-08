import React, { PureComponent } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ClikeCodeView from '@/components/ClikeCodeView';
import XmlCodeView from '@/components/XmlCodeView';
import ModelJavaFile from '@/codes/SystemUserModel.java';
import MapperJavaFile from '@/codes/SystemUserMapper.java';
import MapperXmlFile from '@/codes/SystemUserMapper.xml';
import ServiceJavaFile from '@/codes/SystemUserService.java';
import ServiceImplJavaFile from '@/codes/SystemUserServiceImpl.java';
import FormJavaFile from '@/codes/SystemUserForm.java';
import ControllerJavaFile from '@/codes/SystemUserController.java';

class CodeSpecDoc extends PureComponent {
    render() {
        return (
            <PageHeaderWrapper>
                <Card title="接口开发流程">
                    <p>Tamboot采用了SSM(spring+spring mvc+mybatis)架构，接口的开发一般需要创建以下几个文件：</p>
                    <ul style={{listStyle: 'square'}}>
                        <li>*Model.java</li>
                        <li>*Mapper.java</li>
                        <li>*Mapper.xml</li>
                        <li>*Form.java</li>
                        <li>*Service.java</li>
                        <li>*ServiceImpl.java</li>
                        <li>*Controller.java</li>
                    </ul>
                    <p>下面将以新建用户的接口为例，讲解具体的开发流程:</p>
                    <br/>

                    <p>一、创建SystemUserModel.java。Model对应数据库表system_user，继承自BaseModel，包括通用字段id、creator、create_time、modifier、modify_time、version。</p>
                    <ClikeCodeView showTitle={false} codeFile={ModelJavaFile}/>
                    <br/>

                    <p>二、创建SystemUserMapper.java。Mapper.java是一个DAO(data access object)，与Mapper.xml文件相对应。</p>
                    <ClikeCodeView showTitle={false} codeFile={MapperJavaFile}/>
                    <br/>

                    <p>三、创建SystemUserMapper.xml。Mapper.xml中定义具体的sql语句，与Mapper.java在同一个包中。在定义insert或update语句时，通用字段均不用在sql中声明，框架会自动处理通用字段的值。其中id采用了twitter的snow flake分布式id生成算法。</p>
                    <XmlCodeView showTitle={false} codeFile={MapperXmlFile}/>
                    <br/>

                    <p>四、创建SystemUserForm.java。Form中定义了接口需要的一些字段，以及字段校验的规则，校验规则是基于<a href="https://beanvalidation.org/2.0/spec/#builtinconstraints" target="_blank">hibernate validator</a>实现的，具体的规则可参考相关文档。</p>
                    <ClikeCodeView showTitle={false} codeFile={FormJavaFile}/>
                    <br/>

                    <p>五、创建SystemUserService.java。Service为一个interface，定义了业务逻辑的接口，具体的业务逻辑在ServiceImpl中实现。</p>
                    <ClikeCodeView showTitle={false} codeFile={ServiceJavaFile}/>
                    <br/>

                    <p>六、创建SystemUserServiceImpl.java。ServiceImpl需实现Service接口，并在类上添加@Service注解，实现具体的业务逻辑。如果业务逻辑涉及到数据库的修改，则需要在方法上添加@Transactional(readOnly=false)注解。框架会统一处理业务逻辑异常，开发者只需在代码中抛出BusinessException异常消息，异常消息的code和msg均可自定义。</p>
                    <ClikeCodeView showTitle={false} codeFile={ServiceImplJavaFile}/>
                    <br/>

                    <p>七、创建SystemUserController.java。Controller定义了接口的请求地址及返回数据，前端请求接口将返回json格式数据。如果以json格式上传Form参数，则需要在方法的Form参数前添加@RequestBody注解。如果要校验Form的参数，则需要在方法的Form参数前添加@Valid注解。如果接口http请求方法为POST，则在方法上使用@PostMapping注解，若方法为GET，则用@GetMapping注解。</p>
                    <ClikeCodeView showTitle={false} codeFile={ControllerJavaFile}/>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default CodeSpecDoc;