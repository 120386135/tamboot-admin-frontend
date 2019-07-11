import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MarkdownView from '@/components/MarkdownView';
import SourceFile from '@/mds/RocketMQGuide.md';

class RedisDoc extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper>
        <MarkdownView sourceFile={SourceFile} />
      </PageHeaderWrapper>
    );
  }
}

export default RedisDoc;
