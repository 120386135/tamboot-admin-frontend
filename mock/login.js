import { delay } from 'roadhog-api-doc';
import { apiPath } from '@/defaultSettings';
import Constants from '@/utils/constants';

const proxy = {
  'POST /api/login': (req, res) => {
    const { username, password} = req.body;
    if (username === 'admin' && password === 'admin123456') {
      res.json({
        code: Constants.BusinessCode.SUCCESS,
        msg: 'success'
      })
      return;
    }

    if (username === 'user' && password === 'user123456') {
      res.json({
        code: Constants.BusinessCode.SUCCESS,
        msg: 'success'
      })
      return;
    }

    res.json({
      code: Constants.BusinessCode.FAIL,
      msg: '用户名或密码错误'
    });
  }
};

const filteredProxy = {};
for (let key in proxy) {
  const newKey = key.replace('/api', apiPath);
  filteredProxy[newKey] = proxy[key];
}

export default delay(filteredProxy, 1000);
