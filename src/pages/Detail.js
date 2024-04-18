import { oneProduct } from "../api/product";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import {
  addReview,
  getReview,
  deleteReview,
  updateReview,
} from "../api/review";

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
      width: 100%;
    }
  }

  .review-contents {
    margin-top: 30px;
    .review-content {
      margin-top: 15px;
      img {
        width: 200px;
      }
      .btn-container {
        display: flex;
        justify-content: flex-end;
        button {
          margin-left: 5px;
        }
      }
    }
  }
`;

const Detail = () => {
  const { code } = useParams();
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]); // map쓸 때 초기값"", {}안됨
  const [reviews, setReviews] = useState([]);
  const [edit, setEdit] = useState(null); // 조건 걸어야 해서 null로 초기값

  const reviewAPI = async () => {
    const response = await getReview(code);
    setReviews(response.data);
  };

  const info = useSelector((state) => {
    return state.user;
  });

  const productAPI = async () => {
    const response = await oneProduct(code);
    setProduct(response.data);
  };

  useEffect(() => {
    productAPI();
    reviewAPI();
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  const reviewSubmit = async () => {
    // 이건 form 태그를 사용하지 않고 보낼 때!
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("prodCode", code);
    formData.append("reviTitle", title);
    formData.append("reviDesc", desc);
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    // formData.append("files");
    await addReview(formData);
    // 작성 후 바로 새로고침 시 기존 적은게 남아 있어서 초기화하기
    setImages([]);
    // 얘는 문제 있음! css로 스타일링 하시면 사실 문제가 있는게 아니고 비어지기 때문에! 이건 브라우저 보안상 문제 때문
    setTitle("");
    setDesc("");
    // 작성 후 바로 새로고침 기능
    reviewAPI();
  };

  const imageChange = (e) => {
    const files = Array.from(e.target.files); // List 형식의 파일을 array로 담기
    setImages(files);
  };

  // useEffect(() => {
  //   console.log(images);
  // }, [images]);

  const reviewsDelete = async (no) => {
    await deleteReview(no);
    // setReviews(reviews.filter((review) => review.reviCode !== no));
    reviewAPI();
  };

  const onUpdate = async (review) => {
    setEdit(review);
  };

  const deleteImage = (code) => {
    setEdit((prev) => {
      const images = prev.images.filter((image) => image.reviImgCode !== code);
      return { ...prev, images: images };
    });
  };

  const cancel = () => {
    setEdit(null);
  };

  const reviewUpdate = async () => {
    // FormData 방식으로 전달!
    // append로 필요한 값들 추가해야 하는 것!
    //updateReview로 formData값 전달!
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("reviCode", edit.reviCode);
    formData.append("reviTitle", edit.reviTitle);
    formData.append("reviDesc", edit.reviDesc);
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    formData.append("prodCode", code);
    edit.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image.reviUrl);
    });
    // formData.append("files");
    await updateReview(formData);
    // images 비울 것! edit 비울 것!
    // review 다시 호출!
    setImages([]);
    setEdit(null);
    // 작성 후 바로 새로고침 기능
    reviewAPI();
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
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          onChange={imageChange}
        />
        {/* 이미지만 허용 */}
        <Form.Control
          type="text"
          placeholder="제목 작성"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control
          as="textarea"
          placeholder="글 작성"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button variant="dark" onClick={reviewSubmit}>
          리뷰 작성
        </Button>
      </div>
      <div className="review-contents">
        {reviews.map((review) => (
          <div key={review.reviCode} className="review-content">
            {/* edit의 revi코드와 review의 revi코드가 일치할 때 수정 */}
            {edit?.reviCode === review.reviCode ? (
              <>
                {edit.images.map((image) => (
                  <img
                    key={image.reviImgCode}
                    src={image.reviUrl.replace("D:", "http://localhost:8081")}
                    onClick={() => deleteImage(image.reviImgCode)}
                  />
                ))}
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={imageChange}
                />
                <Form.Control
                  type="text"
                  value={edit.reviTitle}
                  onChange={(e) =>
                    setEdit((prev) => ({ ...prev, reviTitle: e.target.value }))
                  }
                />
                <Form.Control
                  as="textarea"
                  value={edit.reviDesc}
                  onChange={(e) =>
                    setEdit((prev) => ({ ...prev, reviDesc: e.target.value }))
                  }
                />
                <div className="btn-container">
                  <Button variant="warning" onClick={reviewUpdate}>
                    완료
                  </Button>
                  <Button variant="danger" onClick={cancel}>
                    취소
                  </Button>
                </div>
              </>
            ) : (
              <>
                {review.images?.map((image) => (
                  <img
                    key={image.reviImgCode}
                    src={image.reviUrl.replace("D:", "http://localhost:8081")}
                  />
                ))}
                <h4>{review.reviTitle}</h4>
                <p>{review.reviDesc}</p>
                <div className="btn-container">
                  {/* <Button variant="warning">수정</Button> */}
                  <Button variant="warning" onClick={() => onUpdate(review)}>
                    수정
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => reviewsDelete(review.reviCode)}
                  >
                    삭제
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Div>
  );
};
export default Detail;
