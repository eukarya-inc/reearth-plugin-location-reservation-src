import Icon from "@web/components/atoms/Icon";
import { styled } from "@web/theme";
import { Slider, Button } from "antd";

import Card from "../../atoms/Card";

import useHooks from "./hooks";

const PanelOne: React.FC = () => {
  const {
    areaList,
    updateArea,
    removeArea,
    startAddingArea,
    modelList,
    modelURL,
    removeModel,
    startAddingModel,
    labelList,
    updateLabel,
    removeLabel,
    startAddingLabel,
  } = useHooks();

  return (
    <>
      <Card>
        <Button
          type="primary"
          onClick={startAddingArea}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Icon icon="circle" size={16} />
          <span>Add area</span>
        </Button>

        {areaList.length === 0 && (
          <EmptyTip>Click the button and draw on the map please</EmptyTip>
        )}

        {areaList.map((area, index) => (
          <Card padding="0" gap="0" key={area.id}>
            <CardHeader>
              <CardTitle>Area {index + 1}</CardTitle>
              <DeleteButton onClick={() => removeArea(area.id, area.layerId)}>
                <Icon icon="trash" />
              </DeleteButton>
            </CardHeader>
            <CardSettings>
              <CardSettingsTitle>半径</CardSettingsTitle>
              <CardSettingsTool>
                <Slider
                  min={1}
                  max={100}
                  defaultValue={50}
                  onAfterChange={(value) => {
                    updateArea(area.id, value);
                  }}
                />
              </CardSettingsTool>
            </CardSettings>
          </Card>
        ))}
      </Card>

      {!!modelURL && (
        <Card>
          <Button
            type="primary"
            onClick={startAddingModel}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Icon icon="car" size={16} />
            <span>Add 3D Car</span>
          </Button>

          {modelList.length === 0 && (
            <EmptyTip>Click the button and draw on the map please</EmptyTip>
          )}

          {modelList.map((model, index) => (
            <Card padding="0" gap="0" key={model.id}>
              <CardSettings>
                <CardTitle>Model {index + 1}</CardTitle>
                <DeleteButton
                  onClick={() => removeModel(model.id, model.layerId)}
                >
                  <Icon icon="trash" />
                </DeleteButton>
              </CardSettings>
            </Card>
          ))}
        </Card>
      )}

      <Card>
        <Button
          type="primary"
          onClick={startAddingLabel}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Icon icon="text" size={16} />
          <span>Add Text</span>
        </Button>

        {labelList.length === 0 && (
          <EmptyTip>Click the button and draw on the map please</EmptyTip>
        )}

        {labelList.map((label) => (
          <Card padding="0" gap="0" key={label.id}>
            <CardSettings>
              <CardSettingsLabel
                type={"text"}
                defaultValue={"Label"}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  updateLabel(label.id, event.target.value);
                }}
              />
              <DeleteButton
                onClick={() => removeLabel(label.id, label.layerId)}
              >
                <Icon size={16} icon="trash" />
              </DeleteButton>
            </CardSettings>
          </Card>
        ))}
      </Card>
    </>
  );
};

const EmptyTip = styled.div`
  color: #8c8c8c;
  text-align: center;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  border-bottom: 1px solid #e0e0e0;
  color: rgba(0, 0, 0, 0.85);
`;

const CardTitle = styled.div``;

const DeleteButton = styled.a`
  display: flex;
  align-items: center;
`;

const CardSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 12px;
`;

const CardSettingsTitle = styled.div``;
const CardSettingsLabel = styled.input`
  width: 100%;
  border: 1px #d9d9d9 solid;
  border-radius: 2px;
  height: 32px;
  line-height: 32px;
  padding: 5px 12px;
  outline: none;
  font-size: 14px;
`;

const CardSettingsTool = styled.div`
  flex: auto;
`;

export default PanelOne;
