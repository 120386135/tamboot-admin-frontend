import React, { PureComponent } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ClikeCodeView from '@/components/ClikeCodeView';
import XmlCodeView from '@/components/XmlCodeView';
import JsxCodeView from '@/components/JsxCodeView';
import JsxApiView from '@/components/JsxApiView';
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
import AutoIdMapperJavaFile from '@/codes/AutoIdMapper.java';
import AutoIdMapperXmlFile from '@/codes/AutoIdMapper.xml';
import DeleteMapperJavaFile from '@/codes/DeleteMapper.java';
import DeleteMapperXmlFile from '@/codes/DeleteMapper.xml';
import CommonMapperJavaFile from '@/codes/CommonMapper.java';

class MapperSpecDoc extends PureComponent {
    renderInsertApiView = () => {
        const data = [
            {prop: 'autoInsertId', desc: '是否使用分布式ID算法生成id。', type: 'Boolean', default: 'true'},
            {prop: 'idColumnName', desc: '数据库表主键的字段名。', type: 'String', default: 'id'},
            {prop: 'overrideColumn', desc: '当Model的通用字段有值时，是否使用框架生成的值覆盖原有的值。', type: 'Boolean', default: 'false'},
            {prop: 'columnAndFieldMapping', desc: '指定数据库字段与Model字段的映射关系。大部分情况下该项无需配置，框架会自动将下划线命名的数据库字段映射为驼峰标识的Model字段。例：{"USER_NAME", "userName"}', type: 'String[]'},
            {prop: 'ignoreInterceptor', desc: '是否绕过对insert语句的拦截。如果绕过，则框架不会自动处理Model的通用字段，开发者需手动设置这些字段。', type: 'Boolean', default: 'false'}
        ];

        return <JsxApiView title="API - @InsertConfig" data={data}/>;
    }

    renderUpdateApiView = () => {
        const data = [
            {prop: 'versionColumnName', desc: '数据库表版本字段名，版本字段是用于控制记录乐观锁的。', type: 'String', default: 'version'},
            {prop: 'overrideColumn', desc: '当Model的通用字段有值时，是否使用框架生成的值覆盖原有的值。', type: 'Boolean', default: 'false'},
            {prop: 'columnAndFieldMapping', desc: '指定数据库字段与Model字段的映射关系。大部分情况下该项无需配置，框架会自动将下划线命名的数据库字段映射为驼峰标识的Model字段。例：{"USER_NAME", "userName"}', type: 'String[]'},
            {prop: 'versionLock', desc: '是否开启乐观锁功能。默认true，表示开启。', type: 'Boolean', default: 'true'},
            {prop: 'ignoreInterceptor', desc: '是否绕过对update语句的拦截。如果绕过，则框架不会自动处理Model的通用字段，开发者需手动设置这些字段。', type: 'Boolean', default: 'false'}
        ];

        return <JsxApiView title="API - @UpdateConfig" data={data}/>;
    }

    render() {
        return (
            <PageHeaderWrapper>
                <Card title="概述" bordered={false}>
                    <p>框架的数据库访问层采用了<a href="http://www.mybatis.org/mybatis-3/zh/index.html" target="_blank">MyBatis</a>，并封装了通用mapper、分布式ID生成、分页查询、乐观锁等功能。</p>
                </Card>
                <br/>

                <Card title="通用Mapper" bordered={false}>
                    <p>通用Mapper实现了常用的增删改查方法，只需要继承自CommonMapper就能直接使用这些方法。</p>
                    <br/>

                    <p>一、代码示例</p>
                    <ClikeCodeView showTitle={false} codeFile={CommonMapperJavaFile}/>
                    <br/>

                    <p>二、CommonMapper的常用方法如下：</p>
                    <ul style={{listStyle: 'square'}}>
                        <li>insert(MODEL model)</li>
                        <li>updateById(MODEL model)</li>
                        <li>updateNotNullById(MODEL model)</li>
                        <li>deleteById(ID id)</li>
                        <li>selectOneById(ID id)</li>
                        <li>selectAllByExample(MODEL example, String[] orderBys)</li>
                        <li>pageByExample(MODEL example, int pageNum, int pageSize, String[] orderBys)</li>
                        <li>countByExample(MODEL example)</li>
                    </ul>
                    <p>参数说明：</p>
                    <p>1. example参数：匹配与example中不为空字段值相等的数据。</p>
                    <p>2. orderBys参数： 排序方式，例如"create_time desc"。</p>
                </Card>
                <br/>

                <Card title="自动生成Model" bordered={false}>
                    <p>开发者可通过运行maven插件，根据数据库的表结构生成Model。</p>
                    <br/>

                    <p>一、运行以下命令后，将根据system_user表，在com.tamboot.admin.system.model包下生成SystemUserModel.java文件。</p>
                    <JsxCodeView showTitle={false} codeValue="mvn mybatis-generator:generate -Dmbg.table=system_user -Dmbg.package=com.tamboot.admin.system.model -Dmbg.model=SystemUserModel"/>
                    <br/>

                    <p>二、由于自动生成的Model不会自动生成serialVersionUID，开发者需手动添加。</p>
                    <ClikeCodeView showTitle={false} codeValue="private static final long serialVersionUID = 3514782545721387801L;"/>
                    <br/>

                    <p>三、命令行参数。</p>
                    <p>1. mbg.table：必填，数据库表名。</p>
                    <p>2. mbg.package：必填，Model所有的包。</p>
                    <p>3. mbg.model：必填，Model名称。</p>
                    <p>4. mbg.jdbcUrl：可选，数据库连接，默认值为jdbc:mysql://localhost:3306/tamboot_admin_db。</p>
                    <p>5. mbg.jdbcUsername：可选，数据库用户名，默认值为root。</p>
                    <p>6. mbg.jdbcPassword：可选，数据库密码，默认值为Aa123456。</p>
                </Card>
                <br/>

                <Card title="自定义Mapper方法" bordered={false}>
                    <p>在某些业务场景下，需要编写复杂的sql，CommonMapper的通用方法可能无法满足要求，此时可以在Mapper.java中实现自定义的方法，并创建对应的Mapper.xml文件。</p>
                    <br/>

                    <p>一、自定义Mapper方法的命名规则，可参照以下几种格式：</p>
                    <ul style={{listStyle: 'square'}}>
                        <li>insert</li>
                        <li>updateBy*</li>
                        <li>deleteBy*</li>
                        <li>selectOneBy*</li>
                        <li>selectAllBy*</li>
                        <li>selectOneDtoBy*</li>
                        <li>selectAllDtoBy*</li>
                        <li>pageBy*</li>
                        <li>pageDtoBy*</li>
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
                    <br/>

                    <p>七、删除记录。</p>
                    <ClikeCodeView showTitle={false} codeFile={DeleteMapperJavaFile}/>
                    <br/>
                    <XmlCodeView showTitle={false} codeFile={DeleteMapperXmlFile}/>
                </Card>
                <br/>

                <Card title="进阶用法" bordered={false}>
                    <p>开发者可通过在Mapper的方法上添加@InsertConfig和@UpdateConfig注解来进行一些高级配置，比如关闭自动生成分布式ID、指定主键字段、指定数据库字段与Model字段映射关系。</p>
                    <br/>

                    <p>一、使用数据库的自增ID，比如mysql。</p>
                    <ClikeCodeView showTitle={false} codeFile={AutoIdMapperJavaFile}/>
                    <br/>
                    <XmlCodeView showTitle={false} codeFile={AutoIdMapperXmlFile}/>
                    <br/>

                    {this.renderInsertApiView()}
                    <br/>

                    {this.renderUpdateApiView()}
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default MapperSpecDoc;