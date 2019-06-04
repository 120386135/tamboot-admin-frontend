import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MarkdownView from '@/components/MarkdownView';
import SourceFile from '@/mds/QuickStartBack.md';

class QuickStartDoc extends PureComponent {
    render() {
        return (
            <PageHeaderWrapper>
                <MarkdownView sourceFile={SourceFile}/>
            </PageHeaderWrapper>
        )
    }
}

export default QuickStartDoc;