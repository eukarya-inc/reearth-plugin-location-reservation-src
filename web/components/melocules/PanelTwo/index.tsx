import Card from "../../atoms/Card";

const PanelTwo: React.FC = () => {
  return (
    <Card padding="0" flex="auto">
      <iframe
        src="https://reearth.io"
        frameBorder="0"
        style={{ position: "absolute", height: "100%", width: "100%" }}
      ></iframe>
    </Card>
  );
};

export default PanelTwo;
