import { page, create, enable, disable, resetPassword, assignRoles} from '@/services/systemUser';

export default {
    namespace: 'systemUser',

    state: {
        pageData: {
            list: [],
            pagination: {}
        }
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

        *create({ payload, callback }, { call, put }) {
            const response = yield call(create, payload);
            if (!response) {
                return;
            }

            callback&&callback();
        },

        *enable({ payload, successCallback, failCallback }, { call, put }) {
            const response = yield call(enable, payload);
            if (!response) {
                failCallback&&failCallback();
                return;
            }

            successCallback&&successCallback();
        },

        *disable({ payload, successCallback, failCallback }, { call, put }) {
            const response = yield call(disable, payload);
            if (!response) {
                failCallback&&failCallback();
                return;
            }

            successCallback&&successCallback();
        },

        *resetPassword({ payload, callback }, { call, put }) {
            const response = yield call(resetPassword, payload);
            if (!response) {
                return;
            }

            callback&&callback();
        },

        *assignRoles({ payload, callback }, { call, put }) {
            const response = yield call(assignRoles, payload);
            if (!response) {
                return;
            }

            callback&&callback();
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
    }
}