import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// reset.css는 index에 import 하는 것이 좋음
import "./assets/reset.css";
// router 생성 후 import하여 지정 -> RouterProvider 속성으로 넣기
import router from "./router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
