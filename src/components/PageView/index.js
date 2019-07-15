import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, Button, Card } from 'antd';
import StandardTable from '@/components/StandardTable';

import styles from '@/utils/custom.less';

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@Form.create()
class PageView extends PureComponent {
  static defaultProps = {
    selectable: false,
    loading: false,
    searchFormItems: [],
    searchFormItemLayout: { md: 6, sm: 24 },
    searchFormRowGutter: { md: 8, lg: 24, xl: 48 },
    columnSpan: 4,
    operatorComponents: [],
    columns: [],
    pageData: {
      list: [],
      pagination: {},
    },
    pageEffectType: '',
    defaultPageNum: 1,
    defaultPageSize: 10,
    rowKey: 'id',
    bindSearch: search => {},
    bindGetSelectedRows: getSelectedRows => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      searchFormValues: {},
      selectedRows: [],
      showAdvancedSearchForm: false
    };
  }

  componentDidMount() {
    this.props.bindSearch(this.doSearch);
    this.props.bindGetSelectedRows(this.doGetSelectedRows);

    const { dispatch, pageEffectType, defaultPageNum, defaultPageSize } = this.props;
    dispatch({
      type: pageEffectType,
      payload: {
        pageNum: defaultPageNum,
        pageSize: defaultPageSize,
      },
    });
  }

  handleRowSelectChange = (selectedRows) => {
    const { selectable } = this.props;
    if (!selectable) {
      return;
    }

    this.setState({
      selectedRows
    })
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, pageEffectType } = this.props;
    const { searchFormValues } = this.state;

    const params = {
      ...searchFormValues,
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
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
        pageSize: defaultPageSize,
      },
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.doSearch();
  };

  handleShowAdvancedSearchForm = () => {
    this.setState({
      showAdvancedSearchForm: !this.state.showAdvancedSearchForm
    })
  }

  doSearch = () => {
    const {
      dispatch,
      pageEffectType,
      defaultPageNum,
      defaultPageSize,
      form,
      pageData: { pagination },
    } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        pageNum: defaultPageNum,
        pageSize: pagination && pagination.pageSize ? pagination.pageSize : defaultPageSize,
      };

      this.setState({
        searchFormValues: values,
      });

      dispatch({
        type: pageEffectType,
        payload: values,
      });
    });
  };

  doGetSelectedRows = () => {
    return this.state.selectedRows;
  }

  doRenderSimpleSearchForm = () => {
    const {
      form: { getFieldDecorator },
      searchFormItems,
      searchFormItemLayout,
      searchFormRowGutter,
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={searchFormRowGutter}>
          {searchFormItems.map(item => {
            return (
              <Col {...searchFormItemLayout} key={item.name}>
                <FormItem label={item.label}>
                  {getFieldDecorator(item.name)(item.component)}
                </FormItem>
              </Col>
            );
          })}
          <Col {...searchFormItemLayout} key="action">
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

  doRenderAdvancedSearchForm = () => {
    const {
      form: { getFieldDecorator },
      searchFormItems,
      searchFormItemLayout,
      searchFormRowGutter,
      columnSpan
    } = this.props;

    const { showAdvancedSearchForm } = this.state;

    const totalItems = searchFormItems.length;
    const totalRows = (totalItems+1)/4 + (totalItems%4>0?1:0);

    let rows = [];
    let startIndex = 0;
    let endIndex = 0;
    for (let i=1; i<=totalRows; i++) {
      let rowItems = [];
      if (i === 1) {
        endIndex = totalItems<(columnSpan-1)?totalItems:(columnSpan-1);
      } else {
        endIndex = (i===totalRows?totalItems:startIndex+4);
      }
      rowItems = searchFormItems.slice(startIndex, endIndex);
      rows.push(rowItems);
      startIndex = endIndex;
    }
    
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        {rows.map((row, rowIndex) => {
          if (rowIndex === 0) {
            return (
              <Row gutter={searchFormRowGutter} key={rowIndex}>
                {row.map((item) => (
                  <Col {...searchFormItemLayout} key={item.name}>
                    <FormItem label={item.label}>
                      {getFieldDecorator(item.name)(item.component)}
                    </FormItem>
                  </Col>
                ))}
                <Col {...searchFormItemLayout} key="action">
                  <span className={styles.submitButtons}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleSearchFormReset}>
                      重置
                    </Button>
                    <Button style={{ marginLeft: 8 }} title="更多" type="link" icon={showAdvancedSearchForm?'up':'down'} onClick={this.handleShowAdvancedSearchForm}>
                    </Button>
                  </span>
                </Col>
              </Row>
            )
          }

          return (
            <Row gutter={searchFormRowGutter} key={rowIndex} className={showAdvancedSearchForm?'':styles.hidden}>
              {row.map((item) => (
                <Col {...searchFormItemLayout} key={item.name}>
                  <FormItem label={item.label}>
                    {getFieldDecorator(item.name)(item.component)}
                  </FormItem>
                </Col>
              ))}
            </Row>
          )
        })}
      </Form>
    )
  }

  renderSearchForm() {
    const { searchFormItems, columnSpan } = this.props;

    if (searchFormItems.length < columnSpan) {
      return this.doRenderSimpleSearchForm();
    }
    
    return this.doRenderAdvancedSearchForm();
  }

  render() {
    const { pageData, loading, columns, rowKey, operatorComponents, selectable } = this.props;

    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderSearchForm()}</div>
          <div className={styles.tableListOperator}>
            {operatorComponents.map(operator => operator)}
          </div>
          <StandardTable
            rowKey={rowKey}
            loading={loading}
            selectable={selectable}
            data={pageData}
            columns={columns}
            onChange={this.handleStandardTableChange}
            onSelectRow={this.handleRowSelectChange}
          />
        </div>
      </Card>
    );
  }
}

export default PageView;
