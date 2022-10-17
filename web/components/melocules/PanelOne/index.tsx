import Icon from "@web/components/atoms/Icon";
import type { Area, Model } from "@web/components/sidebar/hooks";
import { styled } from "@web/theme";
import { postMsg } from "@web/utils/common";
import { Slider, Button } from "antd";
import { useCallback } from "react";

import Card from "../../atoms/Card";

type Props = {
  areaList: Area[];
  modelList: Model[];
  updateArea: (id: string, radius: number) => void;
  removeArea: (id: string, layerId: string) => void;
  removeModel: (id: string, layerId: string) => void;
};

const PanelOne: React.FC<Props> = ({
  areaList,
  modelList,
  updateArea,
  removeArea,
  removeModel,
}) => {
  const startAddingArea = useCallback(() => {
    postMsg("setAddingArea", true);
  }, []);

  const startAddingModel = useCallback(() => {
    postMsg("setAddingModel", true);
  }, []);

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
          <span>Add Model</span>
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
  gap: 10px;
`;

const CardSettingsTitle = styled.div``;

const CardSettingsTool = styled.div`
  flex: auto;
`;

export default PanelOne;
