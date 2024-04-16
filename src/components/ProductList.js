// 무한 페이징

import { getProducts } from "../api/product";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // 페이지 관련
  const [loading, setLoading] = useState(false);

  const productsAPI = async () => {
    setLoading(true);
    const response = await getProducts(page);
    const newData = response.data;
    console.log("page:" + page);
    setProducts((prev) => [...prev, ...newData]); //...prev : 기존 정보 뜻함
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    // productsAPI();
    const scroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        !loading
      ) {
        productsAPI();
      }
    };

    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [page, loading]);

  return (
    <section className="category-best container">
      {products.map((product) => (
        <div key={product.prodCode}>
          <img
            src={product.prodPhoto?.replace("D:", "http://localhost:8081")}
          />
          {/* ? : null인 경우는 replace 처리 못하게 */}
          <h2>{product.prodName}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </section>
  );
};
export default ProductList;
