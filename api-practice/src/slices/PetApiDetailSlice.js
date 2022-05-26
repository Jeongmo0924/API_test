import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/** 비동기 처리 함수 구현 */
// payload는 이 함수를 호출할 때 전달되는 파라미터
// const 'action함수명' // createAsyncThunk('함수별칭', ... )
export const petDetailList = createAsyncThunk(
  "petApi/detail",
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      // get('URL)
      result = await axios.get("http://www.pettravel.kr/api/detailSeqPart.do", {
        params: {
          partCode: payload.partCode ? payload.partCode : "PC02",
          contentNum: payload.contentNum ? payload.contentNum : 1,
        },
      });
    } catch (e) {
      // 에러 발생시 `rejectWithValue()` 함수에 에러 데이터를 전달하면 extraReducers의 rejected 함수가 호출된다.
      result = rejectWithValue(e.response);
    }

    return result;
  }
);

/** Slice 정의(Action함수 + Reducers의 개념) */
const PetApiDetailSlice = createSlice({
  // name: 상태값 별칭
  name: "petDetail",
  initialState: {
    resultList: null, // Ajax 처리를 통해 수신된 데이터
    loading: false, // 로딩 여부
    error: null, // 에러 정보
  },
  // 내부 action 및 동기 action
  reducers: {},
  // 외부 action 및 비동기 action(Ajax용)
  extraReducers: {
    [petDetailList.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [petDetailList.fulfilled]: (state, { payload }) => {
      return {
        resultList: payload?.data[0].resultList,
        loading: false,
        error: null,
      };
    },
    [petDetailList.rejected]: (state, { payload }) => {
      return {
        resultList: null,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "Server Error",
        },
      };
    },
  },
});

// 리듀서 객체 내보내기
export default PetApiDetailSlice.reducer;
