import { BusinessCode } from '@/utils/constants';
import { mockDelay } from '@/utils/utils';

const proxy = {
  'GET /api/system/user/page': (req, res) => {
    res.json({
      code: BusinessCode.SUCCESS,
      msg: 'success',
      data: {
        pageNum: 1,
        pageSize: 7,
        pages: 1,
        total: 4,
        result: [
          { id: '1', username: 'admin', status: 1, roleCodes: 'MANAGER,USER', roleNames: '管理员,用户', roleCodeList: ['MANAGER', 'USER'], roleNameList: ['管理员', '用户'] },
          { id: '2', username: 'sheng.chen', status: 1, roleCodes: 'USER', roleNames: '用户', roleCodeList: ['USER'], roleNameList: ['用户'] },
          { id: '3', username: '张三', status: 0, roleCodes: 'USER', roleNames: '用户', roleCodeList: ['USER'], roleNameList: ['用户'] },
          { id: '4', username: '李四', status: 0, roleCodes: 'USER', roleNames: '用户', roleCodeList: ['USER'], roleNameList: ['用户'] },
        ],
      },
    });
  },

  'POST /api/system/user/create': (req, res) => {
    res.json({
      code: BusinessCode.SUCCESS,
      msg: 'success',
    });
  },

  'POST /api/system/user/enable/:id': (req, res) => {
    res.json({
      code: BusinessCode.SUCCESS,
      msg: 'success',
    });
  },

  'POST /api/system/user/disable/:id': (req, res) => {
    res.json({
      code: BusinessCode.SUCCESS,
      msg: 'success',
    });
  },

  'POST /api/system/user/resetPassword': (req, res) => {
    res.json({
      code: BusinessCode.SUCCESS,
      msg: 'success',
    });
  },

  'POST /api/system/user/assignRoles': (req, res) => {
    res.json({
      code: BusinessCode.SUCCESS,
      msg: 'success',
    });
  },
};

export default mockDelay(proxy);
