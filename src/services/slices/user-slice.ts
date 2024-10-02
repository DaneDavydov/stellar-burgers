import {
  TLoginData,
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';

export interface IUserState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: TUser | null | undefined;
  isLoading: boolean;
  error: string | null | undefined;
}

export const userInitialState: IUserState = {
  isAuthenticated: false,
  isAuthChecked: false,
  user: null,
  isLoading: false,
  error: null
};

export const getUserThunk = createAsyncThunk('user/getUser', getUserApi);
export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    if (!response.success) throw new Error('Login failed');
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);

export const logoutThunk = createAsyncThunk('user/logout', logoutApi);

export const checkAuthThunk = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      await dispatch(getUserThunk());
    }
    dispatch(checkIsAuth());
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    checkIsAuth: (state) => {
      state.isAuthChecked = true;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    userSelector: (state) => state.user,
    selectUserIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(registerUserThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUserThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(updateUserThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const userReducer = userSlice.reducer;
export const { checkIsAuth, clearError } = userSlice.actions;
export const {
  isAuthCheckedSelector,
  isAuthenticatedSelector,
  userSelector,
  selectUserIsLoading,
  selectError
} = userSlice.selectors;
