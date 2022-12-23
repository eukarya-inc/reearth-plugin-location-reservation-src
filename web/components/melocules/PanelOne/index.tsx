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
    addAreaBtnStyle,
    modelList,
    modelURL,
    removeModel,
    startAddingModel,
    addModelBtnStyle,
    labelList,
    updateLabel,
    removeLabel,
    startAddingLabel,
    addLabelBtnStyle,
  } = useHooks();

  return (
    <>
      <Card>
        <Button
          type="primary"
          onClick={startAddingArea}
          style={addAreaBtnStyle}
        >
          {/* {addingStatus !== "area" && <Icon icon="circle" size={16} />}
          <span>
            {addingStatus === "area"
              ? "地図をクリックして場所を指定してください"
              : "エリアを追加する"}
          </span> */}
          <Icon icon="circle" size={16} />
          <span>エリアを追加する</span>
        </Button>

        {/* {addingStatus !== "area" && (
          <EmptyTip>ボタンをクリックすると描画を開始します</EmptyTip>
        )} */}

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
            style={addModelBtnStyle}
          >
            {/* {addingStatus !== "model" && <Icon icon="model" size={16} />}
            <span>
              {addingStatus === "model"
                ? "地図をクリックして場所を指定してください"
                : "3Dモデルを追加する"}
            </span> */}
            <Icon icon="model" size={16} />
            <span>3Dモデルを追加する</span>
          </Button>

          {/* {addingStatus !== "model" && (
            <EmptyTip>ボタンをクリックすると描画を開始します</EmptyTip>
          )} */}

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
          style={addLabelBtnStyle}
        >
          {/* {addingStatus !== "label" && <Icon icon="text" size={16} />}
          <span>
            {addingStatus === "label"
              ? "地図をクリックして場所を指定してください"
              : "テキストを追加する"}
          </span> */}
          <Icon icon="text" size={16} />
          <span>テキストを追加する</span>
        </Button>

        {/* {addingStatus !== "label" && (
          <EmptyTip>ボタンをクリックすると描画を開始します</EmptyTip>
        )} */}

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

// const EmptyTip = styled.div`
//   color: #8c8c8c;
//   text-align: center;
// `;

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
