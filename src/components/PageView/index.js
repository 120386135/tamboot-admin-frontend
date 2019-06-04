import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, Button, Card } from 'antd';
import StandardTable from '@/components/StandardTable';

import styles from '@/utils/custom.less';

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@Form.create()
class PageView extends PureComponent {
  static defaultProps = {
    loading: false,
    searchFormItems: [],
    searchFormItemLayout: {md: 6, sm: 24},
    operatorComponents: [],
    columns: [],
    pageData: {
      list: [],
      pagination: {}
    },
    pageEffectType: '',
    defaultPageNum: 1,
    defaultPageSize: 10,
    rowKey: 'id',
    bindSearch: (search) => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      searchFormValues: {}
    };
  }

  componentDidMount() {
    this.props.bindSearch(this.doSearch);

    const { dispatch, pageEffectType, defaultPageNum, defaultPageSize } = this.props;
    dispatch({
      type: pageEffectType,
      payload: {
        pageNum: defaultPageNum,
        pageSize: defaultPageSize
      }
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, pageEffectType } = this.props;
    const { searchFormValues } = this.state;

    const params = {
      ...searchFormValues,
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    };

    dispatch({
      type: pageEffectType,
      payload: params,
    });
  };

  handleSearchFormReset = () => {
    const { form, dispatch, pageEffectType, defaultPageNum, defaultPageSize } = this.props;
    form.resetFields();
    this.setState({
      searchFormValues: {},
    });
    dispatch({
      type: pageEffectType,
      payload: {
        pageNum: defaultPageNum,
        pageSize: defaultPageSize
      },
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.doSearch();
  };

  doSearch = () => {
    const { 
      dispatch, 
      pageEffectType, 
      defaultPageNum,
      defaultPageSize, 
      form, 
      pageData: { pagination }
    } = this.props;
    
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        pageNum: defaultPageNum,
        pageSize: pagination&&pagination.pageSize?pagination.pageSize:defaultPageSize
      };

      this.setState({
        searchFormValues: values,
      });

      dispatch({
        type: pageEffectType,
        payload: values,
      });
    });
  }

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
      searchFormItems,
      searchFormItemLayout
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {searchFormItems.map((item) => {
            return (
              <Col {...searchFormItemLayout} key={item.name}>
                <FormItem label={item.label}>
                  {getFieldDecorator(item.name)(item.component)}
                </FormItem>
              </Col>
            )
          })}
          <Col {...searchFormItemLayout}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleSearchFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      pageData,
      loading,
      columns,
      rowKey,
      operatorComponents
    } = this.props;

    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
          <div className={styles.tableListOperator}>
            {operatorComponents.map((operator) => (operator))}
          </div>
          <StandardTable
            rowKey={rowKey}
            loading={loading}
            data={pageData}
            columns={columns}
            onChange={this.handleStandardTableChange}
          />
        </div>
      </Card>
    );
  }
}

export default PageView;
