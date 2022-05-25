import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

/** 비동기 처리 함수 구현 */
// payload는 이 함수를 호출할 때 전달되는 파라미터
// const 'action함수명' // createAsyncThunk('함수별칭', ... )
export const petApiList = createAsyncThunk("petApi/list", async (payload, {rejectWithValue}) => {
    let result = null;

    try {
        // get('URL)
        result = await axios.get('http://www.pettravel.kr/api/listPart.do?', {
            params: {
                // 분야 코드
                partCode : payload.partCode ? payload.partCode : 'PC02',
                // 페이지 번호
                page: payload.page ? payload.page : 1,
                // 페이지당 결과 수(1~50)
                pageBlock: payload.pageBlock ? payload.pageBlock : 10,
            }
        })
    } catch (e) {
        // 에러 발생시 `rejectWithValue()` 함수에 에러 데이터를 전달하면 extraReducers의 rejected 함수가 호출된다.
        result = rejectWithValue(e.response);
    }

    return result;
});

/** Slice 정의(Action함수 + Reducers의 개념) */
const PetApiSlice = createSlice({
    // name: 상태값 별칭
    name: 'pet',
    initialState: {
        resultList: null,         // Ajax 처리를 통해 수신된 데이터
        totalCount: null,
        loading: false,     // 로딩 여부
        error: null,        // 에러 정보
    },
    // 내부 action 및 동기 action
    reducers: {},
    // 외부 action 및 비동기 action(Ajax용)
    extraReducers: {
        [petApiList.pending]: (state, {payload}) => {
            return { ...state, loading: true };
        },
        [petApiList.fulfilled]: (state, {payload}) => {
            return {
                resultList: payload?.data[0].resultList,
                totalCount: payload?.data[0].totalCount,
                loading: false,
                error: null,
            }
        },
        [petApiList.rejected]: (state, {payload}) => {
            return {
                resultList: payload?.data,
                loading: false,
                error: {
                    code: payload?.status ? payload.status : 500,
                    message: payload?.statusText ? payload.statusText : 'Server Error',
                }
            }
        }
    }
});

// 리듀서 객체 내보내기
export default PetApiSlice.reducer;