import { configureStore } from "@reduxjs/toolkit"; // tollkit 사용
import user from "./user";

const store = configureStore({
  reducer: { user: user.reducer },
});

export default store;
