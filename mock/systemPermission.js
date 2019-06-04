import { delay } from 'roadhog-api-doc';
import { apiPath } from '@/defaultSettings';
import Constants from '@/utils/constants';

const proxy = {
  'GET /api/system/permission/page': (req, res) => {
    res.json({
        code: Constants.BusinessCode.SUCCESS,
        msg: 'success',
        data: {
          pageNum: 1,
          pageSize: 10,
          pages: 1,
          total: 2,
          result: [
            {"id":"3","url":"/**","roleCodes":["MANAGER"],"roleNames":["管理员"]},
            {"id":"1","url":"/user/**","roleCodes":["MANAGER","USER","TEST"],"roleNames":["管理员","用户",null]},
            {"id":"2","url":"/system/**","roleCodes":["MANAGER"],"roleNames":["管理员"]}
          ]
        }
    })
  },

  'POST /api/system/permission/create': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },

  'POST /api/system/permission/update': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },

  'POST /api/system/permission/delete/:id': (req, res) => {
    res.json({
      code: Constants.BusinessCode.SUCCESS,
      msg: 'success'
    })
  },

  'POST /api/system/permission/refresh': (req, res) => {
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
