import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/user";

export const asyncLogin = createAsyncThunk("user/login", async (data) => {
  const response = await login(data);
  return response.data;
});

const user = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    userSave: (state, action) => {
      return action.payload;
    },
    userLogout: (state, action) => {
      return {};
    },
  },

  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      const result = action.payload;
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result)); // id, name값까지 담아쓰기
      //   console.log(action.payload);
      return result;
    });
  },
  // extraRecuders는 reducers보다 밑에 있어야 함
});

export default user;
export const { userSave, userLogout } = user.actions;
