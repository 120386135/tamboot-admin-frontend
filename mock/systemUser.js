import { delay } from 'roadhog-api-doc';
import { apiPath } from '@/defaultSettings';
import Constants from '@/utils/constants';

const proxy = {
  'GET /api/system/user/page': (req, res) => {
    res.json({
        code: Constants.BusinessCode.SUCCESS,
        msg: 'success',
        data: {
          pageNum: 1,
          pageSize: 10,
          pages: 1,
          total: 2,
          result: [
            {"id":"1","username":"admin","status":1,"roleCodes":"MANAGER","roleNames":"管理员","roleCodeList":["MANAGER"],"roleNameList":["管理员"]},
            {"id":"2","username":"sheng.chen","status":0,"roleCodes":"USER","roleNames":"用户","roleCodeList":["USER"],"roleNameList":["用户"]}
          ]
        }
    })
  },

  'POST /api/system/user/create': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },

  'POST /api/system/user/enable/:id': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },

  'POST /api/system/user/disable/:id': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },

  'POST /api/system/user/resetPassword': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },

  'POST /api/system/user/assignRoles': (req, res) => {
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
