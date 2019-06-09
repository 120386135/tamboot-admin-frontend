import React, { PureComponent } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ClikeCodeView from '@/components/ClikeCodeView';
import XmlCodeView from '@/components/XmlCodeView';
import PageMapperJavaFile from '@/codes/PageMapper.java';
import PageConditionJavaFile from '@/codes/PageCondition.java';
import PageMapperXmlFile from '@/codes/PageMapper.xml';
import SelectOneMapperJavaFile from '@/codes/SelectOneMapper.java';
import SelectOneMapperXmlFile from '@/codes/SelectOneMapper.xml';
import SelectAllMapperJavaFile from '@/codes/SelectAllMapper.java';
import SelectAllMapperXmlFile from '@/codes/SelectAllMapper.xml';
import InsertMapperJavaFile from '@/codes/InsertMapper.java';
import InsertMapperXmlFile from '@/codes/InsertMapper.xml';
import UpdateMapperJavaFile from '@/codes/UpdateMapper.java';
import UpdateMapperXmlFile from '@/codes/UpdateMapper.xml';

class MapperSpecDoc extends PureComponent {
    render() {
        return (
            <PageHeaderWrapper>
                <Card title="常规用法" bordered={false}>
                    <p>框架的数据库访问层采用了<a href="http://www.mybatis.org/mybatis-3/zh/index.html" target="_blank">MyBatis</a>，并封装了分布式ID生成、分页查询、乐观锁等功能，以下是一些常规使用方法。</p>
                    <br/>

                    <p>一、Mapper中方法的命名规则，可参照以下几种格式：</p>
                    <ul style={{listStyle: 'square'}}>
                        <li>selectOne</li>
                        <li>selectAll</li>
                        <li>selectOneBy*</li>
                        <li>selectAllBy*</li>
                        <li>pageBy*</li>
                        <li>selectOneDto</li>
                        <li>selectAllDto</li>
                        <li>selectOneDtoBy*</li>
                        <li>selectAllDtoBy*</li>
                        <li>pageDtoBy*</li>
                        <li>insert</li>
                        <li>update</li>
                        <li>updateBy*</li>
                    </ul>
                    <br/>

                    <p>二、单条记录查询。</p>
                    <ClikeCodeView showTitle={false} codeFile={SelectOneMapperJavaFile}/>
                    <br/>
                    <XmlCodeView showTitle={false} codeFile={SelectOneMapperXmlFile}/>
                    <br/>

                    <p>三、多条记录查询。</p>
                    <ClikeCodeView showTitle={false} codeFile={SelectAllMapperJavaFile}/>
                    <br/>
                    <XmlCodeView showTitle={false} codeFile={SelectAllMapperXmlFile}/>
                    <br/>

                    <p>四、分页查询。框架使用了插件<a href="https://github.com/pagehelper/Mybatis-PageHelper" target="_blank">PageHelper</a>来实现分页查询，只需在Mapper接口方法加上分页参数即可。若有查询条件，需添加Condition类作为参数。</p>
                    <ClikeCodeView showTitle={false} codeFile={PageMapperJavaFile}/>
                    <br/>
                    <ClikeCodeView showTitle={false} codeFile={PageConditionJavaFile}/>
                    <br/>
                    <XmlCodeView showTitle={false} codeFile={PageMapperXmlFile}/>
                    <br/>

                    <p>五、插入记录。在insert语句中，通用字段id、creator、create_time、modifier、modify_time、version均不用声明，框架会自动处理。</p>
                    <ClikeCodeView showTitle={false} codeFile={InsertMapperJavaFile}/>
                    <br/>
                    <XmlCodeView showTitle={false} codeFile={InsertMapperXmlFile}/>
                    <br/>

                    <p>六、更新记录。在update语句中，通用字段creator、create_time、modifier、modify_time、version均不用声明，框架会自动处理。</p>
                    <ClikeCodeView showTitle={false} codeFile={UpdateMapperJavaFile}/>
                    <br/>
                    <XmlCodeView showTitle={false} codeFile={UpdateMapperXmlFile}/>

                </Card>
                <br/>

                <Card title="进阶用法">
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default MapperSpecDoc;