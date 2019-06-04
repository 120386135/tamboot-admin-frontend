import { page, assignMenus, create as createRole, update as updateRole, del as deleteRole, list as listRoles } from '@/services/systemRole';
import { roleMenus } from '@/services/systemMenu';

export default {
    namespace: 'systemRole',

    state: {
        pageData: {
            list: [],
            pagination: {}
        },
        roleMenus: [],
        roleList: []
    },

    effects: {
        *fetchPage({ payload }, { call, put }) {
            yield put({
                type: 'setCurrentPageNum',
                payload: {
                    pageNum: payload.pageNum
                }
            })

            const response = yield call(page, payload);
            if (!response) {
                return;
            }

            yield put({
                type: 'refreshPage',
                payload: {
                    pageData: {
                        list: response.data.result,
                        pagination: {
                            current: response.data.pageNum,
                            total: response.data.total,
                            pageSize: response.data.pageSize
                        }
                    }
                }
            })
        },

        *fetchRoleMenus({ payload }, { call, put }) {
            const response = yield call(roleMenus, payload);
            yield put({
                type: 'setRoleMenus',
                payload: {
                    roleMenus: response?response.data:[]
                }
            })
        },

        *assignMenus({ payload, callback }, { call, put }) {
            const response = yield call(assignMenus, payload);
            if (!response) {
                return;
            }

            callback&&callback();
        },

        *create({ payload, callback }, { call, put }) {
            const response = yield call(createRole, payload);
            if (!response) {
                return;
            }

            callback&&callback();
        },

        *update({ payload, callback }, { call, put }) {
            const response = yield call(updateRole, payload);
            if (!response) {
                return;
            }
 
            callback&&callback();
        },

        *del({ payload, successCallback, failCallback }, { call, put }) {
            const response = yield call(deleteRole, payload);
            if (!response) {
                failCallback&&failCallback();
                return;
            }
    
            successCallback&&successCallback();
        },

        *list({ _ }, { call, put }) {
            const response = yield call(listRoles);
            yield put({
                type: 'setRoleList',
                payload: {
                    roleList: response&&response.data?response.data:[]
                }
            })
        }
    },

    reducers: {
        refreshPage(state, action) {
            return {
                ...state,
                pageData: action.payload.pageData
            }
        },

        setCurrentPageNum(state, action) {
            return {
                ...state,
                pageData: {
                    ...state.pageData,
                    pagination: {
                        ...state.pageData.pagination,
                        current: action.payload.pageNum
                    }
                }
            }
        },
        
        setRoleMenus(state, action) {
            return {
                ...state,
                roleMenus: action.payload.roleMenus
            }
        },

        setRoleList(state, action) {
            return {
                ...state,
                roleList: action.payload.roleList
            }
        }
    }
}