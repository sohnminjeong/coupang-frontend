import { oneProduct } from "../api/product";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addReview, getReview } from "../api/review";

const Div = styled.div`
  .product-info {
    display: flex;

    img {
      width: 50%;
      margin-right: 20px;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  .review-add {
    margin-top: 20px;

    input {
      margin-bottom: 10px;
    }
    textarea {
      resize: none;
      margin-bottom: 10px;
    }
    button {
      background-color: gray;
      border: 1px solid gray;
    }
  }
`;

const Detail = () => {
  const { code } = useParams();
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const info = useSelector((state) => {
    return state.user;
  });

  const productAPI = async () => {
    const response = await oneProduct(code);
    setProduct(response.data);
  };

  useEffect(() => {
    productAPI();
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
    // console.log(Object.keys(info).length);
    // console.log(user);
  }, []);

  // 확인용이였음
  //   useEffect(() => {
  //     console.log(user);
  //   }, [user]);

  const reviewSubmit = async () => {
    // 이건 form 태그를 사용하지 않고 보낼 때!
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("prodCode", code);
    formData.append("reviTitle");
    formData.append("reviDesc");
    formData.append("files");
    await addReview(formData);
  };

  return (
    <Div>
      <div className="product-info" key={product.prodCode}>
        <img src={product.prodPhoto?.replace("D:", "http://localhost:8081")} />
        <div>
          <h2>{product.prodName}</h2>
          <h2>{product.price}</h2>
        </div>
      </div>
      <div className="review-add">
        {/* 전부 부트 스트랩 */}
        <Form.Control type="file" multiple accept="image/*" />
        {/* 이미지만 허용 */}
        <Form.Control type="text" placeholder="제목 작성" />
        <Form.Control as="textarea" placeholder="글 작성" />
        <Button onClick={reviewSubmit}>리뷰 작성</Button>
      </div>
    </Div>
  );
};
export default Detail;
