import { page, create, update, del as deletePerm, refresh } from '@/services/systemPermission';

export default {
    namespace: 'systemPermission',

    state: {
        pageData: {
            list: [],
            pagination: {}
        },
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

        *update({ payload, callback }, { call, put }) {
            const response = yield call(update, payload);
            if (!response) {
                return;
            }

            callback&&callback();
        },

        *del({ payload, successCallback, failCallback }, { call, put }) {
            const response = yield call(deletePerm, payload);
            if (!response) {
                failCallback&&failCallback();
                return;
            }
     
            successCallback&&successCallback();
        },

        *refresh({ payload, successCallback, failCallback }, { call, put }) {
            const response = yield call(refresh);
            if (!response) {
                failCallback&&failCallback();
                return;
            }

            successCallback&&successCallback();
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