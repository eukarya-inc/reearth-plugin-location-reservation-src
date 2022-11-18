import Card from "../../atoms/Card";

const PanelTwo: React.FC = () => {
  return (
    <Card padding="0" flex="auto">
      <iframe
        src="https://8336c20d.form.kintoneapp.com/public/000870d4bdd6bda9886dedc59e1f12e66cf2bc66d46309766eb6f97dfd211dd3?iframe=true"
        frameBorder="0"
        style={{ position: "absolute", height: "calc(100%/0.8)", width: "calc(100%/0.8)", transform: "scale(0.8)", transformOrigin: "0 0" }}
      ></iframe>
    </Card>
  );
};

export default PanelTwo;
