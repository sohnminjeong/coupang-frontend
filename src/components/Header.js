import "../assets/style.css";
import {
  FaBars,
  FaMicrophone,
  FaMagnifyingGlass,
  FaUser,
  FaCartShopping,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6"; // 아이콘 관련 import
import CategoryItem from "./CategoryItem";
import { getCategories } from "../api/product";
// 카테고리를 반복문 돌려서 봐야하기 때문에 categoryItem.js가 아닌 header에서 관리
import { useEffect, useState } from "react";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(false);

  const categoriesAPI = async () => {
    const response = await getCategories();
    // console.log(response.data);
    setCategories(response.data);
  };

  useEffect(() => {
    categoriesAPI();
  }, []);
  return (
    <>
      <div className="tob-bar container">
        <div className="tob-bar-left">
          <a href="#">즐겨찾기</a>
          <a href="#">입점신청</a>
        </div>
        <div className="tob-bar-right">
          <a href="#">로그인</a>
          <a href="#">회원가입</a>
          <a href="#">고객센터</a>
        </div>
      </div>
      <header className="container">
        <div className="category-btn">
          {/* <i class="fa-solid fa-bars"></i> */}
          {/* 아이콘 검색시 : FaBars */}
          <FaBars />
          {/* 아이콘 관련 import */}
          <p>카테고리</p>
          <div className="category">
            <div className="category-list">
              {categories.map((category) => (
                <CategoryItem category={category} key={category.cateCode} />
              ))}
            </div>
          </div>
        </div>
        <div className="header-main">
          <div className="header-main-top">
            <a href="#" className="logo">
              <img
                src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png"
                alt=""
              />
            </a>
            <form action="">
              <select name="" id="">
                <option value="">전체</option>
                <option value="">여성패션</option>
                <option value="">남성패션</option>
                <option value="">남녀 공용 의류</option>
                <option value="">유아동패션</option>
                <option value="">뷰티</option>
              </select>
              <input type="text" />
              {/* <i className="fa-solid fa-microphone"></i> */}
              <FaMicrophone />
              <button type="submit">
                {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                <FaMagnifyingGlass />
              </button>
            </form>
            <a href="#" className="header-main-icon">
              {/* <i className="fa-regular fa-user"></i> */}
              <FaUser />
              <p>마이쿠팡</p>
            </a>
            <a href="#" className="header-main-icon">
              {/* <i className="fa-solid fa-cart-shopping"></i> */}
              <FaCartShopping />
              <p>장바구니</p>
            </a>
          </div>
          <nav className="header-main-bottom">
            {/* <i className="fa-solid fa-chevron-left"></i> */}
            <FaChevronLeft onClick={() => setActive(true)} />
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image6.coupangcdn.com/image/coupang/common/coupang_play_icon@3x.png"
                alt=""
              />
              <span>쿠팡플레이</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image10.coupangcdn.com/image/coupang/rds/logo/xxhdpi/logo_rocket_symbol_large.png"
                alt=""
              />
              <span>로켓배송</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image9.coupangcdn.com/image/coupang/common/pc_header_rocket_fresh_1x.png"
                alt=""
              />
              <span>로켓프레시</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image7.coupangcdn.com/image/coupang/home/icons/Christmas/Christmas_PC_2023.png"
                alt=""
              />
              <span>크리스마스</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image6.coupangcdn.com/image/coupang/common/logoBizonlyBrown.png"
                alt=""
              />
              <span>쿠팡비즈</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image6.coupangcdn.com/image/coupang/home/icons/Overseas.png"
                alt=""
              />
              <span>로켓직구</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <span>골드박스</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <span>와우회원할인</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <span>이벤트/쿠폰</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image10.coupangcdn.com/image/coupang/home/icons/RETURNED_MARKET_B@2x.png"
                alt=""
              />
              <span>반품마켓</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image9.coupangcdn.com/image/coupang/common/icon_government_promotion.png"
                alt=""
              />
              <span>착한상점</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <span>기획전</span>
            </a>
            <a href="#" className={active ? "header-main-bottom-right" : ""}>
              <img
                src="https://image9.coupangcdn.com/image/coupang/common/icon_travel.png"
                alt=""
              />
              <span>여행/티켓</span>
            </a>
            {/* <i className="fa-solid fa-chevron-right"></i> */}
            <FaChevronRight onClick={() => setActive(false)} />
          </nav>
        </div>
      </header>
    </>
  );
};
export default Header;
