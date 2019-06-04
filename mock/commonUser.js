import { delay } from 'roadhog-api-doc';
import { apiPath } from '@/defaultSettings';
import Constants from '@/utils/constants';

const proxy = {
  'GET /api/common/user/details': (req, res) => {
    res.json({
        code: Constants.BusinessCode.SUCCESS,
        msg: 'success',
        data: {
          userId: '1',
          username: 'admin'
        }
    })
  },

  'POST /api/common/user/updatePassword': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },
  
};

const filteredProxy = {};
for (let key in proxy) {
  const newKey = key.replace('/api', apiPath);
  filteredProxy[newKey] = proxy[key];
}

export default delay(filteredProxy, 1000);
