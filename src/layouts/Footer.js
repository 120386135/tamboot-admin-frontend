import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import defaultSettings from '@/defaultSettings';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'home',
          title: formatMessage({id: 'app.name'}),
          href: '/'
        }
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019-2022
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
