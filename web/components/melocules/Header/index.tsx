import { styled } from "@web/theme";

import Icon from "../../atoms/Icon";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Icon icon="logo" size={24} />
      <span style={{ padding: "0 5px" }}>Project Name</span>
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
