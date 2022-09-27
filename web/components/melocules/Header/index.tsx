import { styled } from "@web/theme";

// import Icon from "../../atoms/Icon";
import logo from "../../atoms/Icon/Icons/Logo.png";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <img src={logo} alt="Logo" width={23} height={32} />
      <span style={{ padding: "0 5px" }}>毛呂山町都市公園利用申請</span>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  flex: 0 0 auto;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00bebe;
  font-size: large;
  padding-top: 12px;
`;

export default Header;
