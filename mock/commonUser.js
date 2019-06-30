import { BusinessCode } from '@/utils/constants';
import { mockDelay } from '@/utils/utils';

const proxy = {
  'GET /api/common/user/details': (req, res) => {
    res.json({
      code: BusinessCode.SUCCESS,
      msg: 'success',
      data: {
        userId: '1',
        username: 'admin',
      },
    });
  },

  'POST /api/common/user/updatePassword': (req, res) => {
    res.json({
      code: BusinessCode.SUCCESS,
      msg: 'success',
    });
  },
};

export default mockDelay(proxy);
