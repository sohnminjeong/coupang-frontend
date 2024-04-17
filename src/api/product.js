import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/public/",
});

export const getCategories = async () => {
  return await instance.get("category");
};

// getProducts
export const getProducts = async (page) => {
  return await instance.get("product?page=" + page);
};

// oneProduct
export const oneProduct = async (code) => {
  return await instance.get("product/" + code);
};
