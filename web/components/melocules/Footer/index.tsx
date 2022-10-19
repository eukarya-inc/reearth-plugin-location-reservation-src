import Icon from "@web/components/atoms/Icon";
import { styled } from "@web/theme";
import { Button } from "antd";

type Props = {
  handleDownloadClick: () => void;
};

const Footer: React.FC<Props> = ({ handleDownloadClick }) => {
  return (
    <>
      <StyledFooter>
        <Button
          onClick={handleDownloadClick}
          type="default"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Icon icon="map" size={16} />
          <span>Download Map</span>
        </Button>
      </StyledFooter>
    </>
  );
};

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex: 0 0 auto;
  height: 46px;
  padding: 0px 16px;
`;

export default Footer;
