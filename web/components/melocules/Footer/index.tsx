import { styled } from "@web/theme";

const Footer: React.FC = () => {
  return <StyledFooter>Footer</StyledFooter>;
};

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  height: 46px;
  /* border-top: 1px solid #cfcfcf; */
`;

export default Footer;
