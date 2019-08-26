import {
  stateOfPage,
  effectsOfPage,
  reducersOfPage,
  stateOfList,
  effectsOfList,
  reducersOfList,
  effectsWithCallback,
} from '@/utils/ModelTemplate';
import { page, assignMenus, create, update, del, list } from '@/services/systemRole';
import { roleMenus } from '@/services/systemMenu';

export default {
  namespace: 'systemRole',

  state: {
    ...stateOfPage(),

    ...stateOfList('roleList'),

    ...stateOfList('roleMenus'),
  },

  effects: {
    ...effectsOfPage(page),

    ...effectsOfList(list, 'list', 'saveRoleList'),

    ...effectsOfList(roleMenus, 'roleMenus', 'saveRoleMenus'),

    ...effectsWithCallback(assignMenus, 'assignMenus'),

    ...effectsWithCallback(create, 'create'),

    ...effectsWithCallback(update, 'update'),

    ...effectsWithCallback(del, 'del'),
  },

  reducers: {
    ...reducersOfPage(),

    ...reducersOfList('saveRoleList', 'roleList'),

    ...reducersOfList('saveRoleMenus', 'roleMenus'),
  },
};
