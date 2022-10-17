import Icon from "@web/components/atoms/Icon";
import { styled } from "@web/theme";
import { Button } from "antd";

const Footer: React.FC = () => {
  return (
    <>
      <StyledFooter>
        <Button
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

// const Footer: React.FC = () => {
//   return (
//     <StyledFooter>
//       <Button
//         type="text"
//         // onClick={startAddingArea}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "8px",
//         }}
//       >
//         <Icon icon="Map" size={16} />
//         <span>Download Map</span>
//       </Button>
//     </StyledFooter>
//   );
// };

// const StyledButton = styled.div`
//   outline: solid #c7c5c5;
//   padding: 4px 10px;
//   border-radius: 4px;
//   color: #4a4a4a;
// `;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  flex: 0 0 auto;
  height: 46px;
  padding: 0px 16px;
  /* border-top: 1px solid #cfcfcf; */
`;

export default Footer;
