import { query as queryUsers, queryCurrent, queryPdf, queryPros, queryTra } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    pdf: {},
    pro: {}
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchPdf(_, { call, put }) {
      const response = yield call(queryPdf);
      yield put({
        type: 'savePdf',
        payload: response,
      });
    },
    *fetchPros(_, { call, put }) {
      const response = yield call(queryPros);
      yield put({
        type: 'savePros',
        payload: response,
      });
    },
    *travelPro({ payload }, { call, put }) {
      const response = yield call(queryTra, payload);
      yield put({
        type: 'saveTra',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    savePdf(state, action) {
      return {
        ...state,
        pdf: action.payload || {},
      };
    },
    savePros(state, action) {
      return {
        ...state,
        pro: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
