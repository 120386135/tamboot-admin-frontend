import { tree, treeForRole, update, create, del } from '@/services/systemMenu';

export default {
    namespace: 'systemMenu',

    state: {
        menuTree: [],
        selectedMenu: {}
    },

    effects: {
        *fetchMenuTree({ _ }, { call, put }) {
            const response = yield call(tree);
            yield put({
                type: 'saveMenuTree',
                payload: { menuTree: response.data}
            });
        },

        *updateMenu({ payload, callback }, { call, put }) {
            const response = yield call(update, payload);
            yield put({
                type: 'saveSelectedMenu',
                payload: {selectedMenu: payload}
            });

            yield put({
                type: 'fetchMenuTree'
            })
            callback&&callback(response);
        },

        *selectMenu({ payload, callback }, { call, put }) {
            yield put({
                type: 'saveSelectedMenu',
                payload: {selectedMenu: payload}
            });

            callback&&callback();
        },

        *createMenu({ payload, callback }, { call, put }) {
            const response = yield call(create, payload);
            yield put({
                type: 'fetchMenuTree'
            })
            callback&&callback();
        },

        *deleteMenu({ payload, successCallback, failCallback }, { call, put }) {
            const response = yield call(del, payload);
            if (!response) {
                failCallback&&failCallback();
                return;
            }

            yield put({
                type: 'saveSelectedMenu',
                payload: {selectedMenu: {}}
            });
            yield put({
                type: 'fetchMenuTree'
            })
            successCallback&&successCallback(response);
        }
    },

    reducers: {
        saveMenuTree(state, action) {
            let selectedMenu = state.selectedMenu;
            if ((!selectedMenu || !selectedMenu.id) && (action.payload.menuTree&&action.payload.menuTree.length>0)) {
                selectedMenu = action.payload.menuTree[0];
            }

            return {
                ...state,
                selectedMenu,
                menuTree: action.payload.menuTree
            }
        },

        saveSelectedMenu(state, action) {
            return {
                ...state,
                selectedMenu: action.payload.selectedMenu
            }
        },

    }
}