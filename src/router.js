// 이동 경로 정리 파일
import { createBrowserRouter } from "react-router-dom"; // router 사용 시 필요
import Layout from "./components/Layout";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Login from "./pages/Login";

const router = createBrowserRouter([
  // 경로는 path, 컴포넌트는 element (연결 시 import 필요)
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> },
      { path: "/:code", element: <Detail /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  // children으로 지정한 것이 outlet에 들어감 -> 여러 개 올수 있어 대괄호[]
]);

export default router;
