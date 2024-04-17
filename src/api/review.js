import axios from "axios";

// localStorage에 토큰 담기!
const token = localStorage.getItem("token");

// 인증이 필요없는 RESTful API 가져올 때 기본 루트
const instace = axios.create({
  baseURL: "http://localhost:8080/api/public/",
});

// 인증이 필요할 RESTful API 가져올 때 기본 루트
const authorize = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// [POST] http://localhost:8080/api/review
// 인증 필요, RequestBody 데이터 보내야 한느 상황
export const addReview = async (data) => {
  return await authorize.post("review", data);
};

// [GET] http://localhost:8080/api/public/product/4/review
// 인증 필요X, 경로에 상품 코드 보내야 되는 상황
export const getReview = async (code) => {
  return await instace.get("product/" + code + "/review");
};
