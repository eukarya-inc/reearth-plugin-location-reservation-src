import Icon from "@web/components/atoms/Icon";
import { type Area } from "@web/components/sidebar/hooks";
import { styled } from "@web/theme";
import { postMsg } from "@web/utils/common";
import { Slider, Button } from "antd";
import { useCallback } from "react";

import Card from "../../atoms/Card";

type Props = {
  areaList: Area[];
  updateArea: (id: string, radius: number) => void;
  removeArea: (id: string, layerId: string) => void;
};

const PanelOne: React.FC<Props> = ({ areaList, updateArea, removeArea }) => {
  const startAddingArea = useCallback(() => {
    postMsg("setAddingArea", true);
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
            <AreaHeader>
              <AreaTitle>Area {index + 1}</AreaTitle>
              <AreaDelete onClick={() => removeArea(area.id, area.layerId)}>
                <Icon icon="trash" />
              </AreaDelete>
            </AreaHeader>
            <AreaSettings>
              <AreaSettingsTitle>半径</AreaSettingsTitle>
              <AreaSettingsTool>
                <Slider
                  min={1}
                  max={100}
                  defaultValue={50}
                  onAfterChange={(value) => {
                    updateArea(area.id, value);
                  }}
                />
              </AreaSettingsTool>
            </AreaSettings>
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

const AreaHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  border-bottom: 1px solid #e0e0e0;
  color: rgba(0, 0, 0, 0.85);
`;

const AreaTitle = styled.div``;

const AreaDelete = styled.a`
  display: block;
`;

const AreaSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 10px;
`;

const AreaSettingsTitle = styled.div``;

const AreaSettingsTool = styled.div`
  flex: auto;
`;

export default PanelOne;
