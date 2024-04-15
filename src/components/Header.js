import "../assets/style.css";
import { FaBars } from "react-icons/fa6"; // 아이콘 관련 import

const Header = () => {
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
        </div>
      </header>
    </>
  );
};
export default Header;
