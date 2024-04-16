import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getCategories = async () => {
  return await instance.get("public/category");
};

// getProducts
export const getProducts = async (page) => {
  return await instance.get("public/product?page=" + page);
};
