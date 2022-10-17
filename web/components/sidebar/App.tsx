/// <reference types="vite-plugin-svgr/client" />

import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { ConfigProvider, Button, Tabs } from "antd";

import Tab from "../atoms/Tab";
import Content from "../melocules/Content";
import Footer from "../melocules/Footer";
import Header from "../melocules/Header";
import PanelOne from "../melocules/PanelOne";
import PanelTwo from "../melocules/PanelTwo";
import SidebarPanel from "../melocules/SidebarPanel";

import useHooks from "./hooks";

import "./global.css";

ConfigProvider.config({
  theme: {
    primaryColor: "#00BEBE",
  },
});

const App = () => {
  const {
    isSidebarShown,
    hideSidebar,
    showSidebar,
    areaList,
    updateArea,
    removeArea,
  } = useHooks();

  const items = [
    {
      label: <Tab icon="pencil" text="描画ツール" />,
      key: "item-1",
      children: (
        <PanelOne
          areaList={areaList}
          updateArea={updateArea}
          removeArea={removeArea}
        />
      ),
    },
    {
      label: <Tab icon="send" text="申し込みフォーム" />,
      key: "item-2",
      children: <PanelTwo />,
    },
  ];

  return (
    <ConfigProvider>
      <Button
        type="default"
        icon={<MenuOutlined />}
        size={"large"}
        onClick={showSidebar}
        style={{ position: "absolute", border: "none" }}
      />
      <SidebarPanel visible={isSidebarShown}>
        <Button
          type="primary"
          icon={<CloseOutlined />}
          size={"middle"}
          onClick={hideSidebar}
          style={{ position: "absolute", right: "0", borderRadius: "0" }}
        />
        <Header />
        <Content>
          <Tabs centered items={items} />
        </Content>
        <Footer />
      </SidebarPanel>
    </ConfigProvider>
  );
};

export default App;
