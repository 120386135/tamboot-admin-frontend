import { Select } from 'antd';

const Option = Select.Option;

export function createByDataDict(dataDict) {
  return (
    <Select style={{width: '100%'}}>
      <Option key="all" value="">
        全部
      </Option>
      {Object.keys(dataDict).map(value => (
        <Option key={value}>{dataDict[value]}</Option>
      ))}
    </Select>
  );
}
