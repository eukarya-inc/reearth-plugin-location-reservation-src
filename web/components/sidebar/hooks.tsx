import type { actHandles } from "@web/types";
import { postMsg } from "@web/utils/common";
import { ConfigProvider } from "antd";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";

import Tab from "../atoms/Tab";
import PanelOne from "../melocules/PanelOne";
import PanelTwo from "../melocules/PanelTwo";

type widgetProperties = {
  title: string;
  iframeURL: string;
  themeColor: string;
  modelURL: string;
};

export default () => {
  // properties
  const [title, setTitle] = useState<string>(
    (window as any).pluginInitProperties?.title
      ? (window as any).pluginInitProperties?.title
      : "Location Reservation"
  );
  const [iframeURL, setIframeURL] = useState<string>(
    (window as any).pluginInitProperties?.iframeURL ?? ""
  );

  const updateTheme = useCallback((color?: string) => {
    const themeColor = color ? color : "#00BEBE";
    document.documentElement.style.setProperty("--theme-color", themeColor);
    ConfigProvider.config({
      theme: {
        primaryColor: themeColor,
      },
    });
  }, []);

  const updateProperties = useCallback(
    ({ title, iframeURL, themeColor }: widgetProperties) => {
      console.log("update", title, iframeURL, themeColor);
      setTitle(title);
      setIframeURL(iframeURL);
      updateTheme(themeColor);
    },
    [updateTheme]
  );

  // download map
  const isRequestingMap = useRef(false);

  const getCaptureScreen = useCallback((payload: string) => {
    isRequestingMap.current = false;
    const fileName = "capture.png";
    const link = document.createElement("a");
    link.download = fileName;
    link.href = payload;
    link.click();
    link.remove();
  }, []);

  const handleDownloadClick = useCallback(() => {
    if (!isRequestingMap.current) {
      postMsg("download");
      isRequestingMap.current = true;
    }
  }, []);

  // UI
  const [isSidebarShown, setSidebarShown] = useState(true);
  const hideSidebar = useCallback(() => {
    setSidebarShown(false);
    setTimeout(() => {
      postMsg("setSidebarShown", false);
    }, 250);
  }, []);

  const showSidebar = useCallback(() => {
    postMsg("setSidebarShown", true);
    setTimeout(() => {
      setSidebarShown(true);
    }, 100);
  }, []);

  // common
  const actHandles: actHandles = useMemo(() => {
    return {
      updateProperties,
      getCaptureScreen,
    };
  }, [updateProperties, getCaptureScreen]);

  useEffect(() => {
    (globalThis as any).addEventListener("message", (msg: any) => {
      if (msg.source !== (globalThis as any).parent) return;
      try {
        const data =
          typeof msg.data === "string" ? JSON.parse(msg.data) : msg.data;
        actHandles[data.act as keyof actHandles]?.(data.payload);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // items
  const items = useMemo(() => {
    const items = [
      {
        label: <Tab icon="pencil" text="描画ツール" />,
        key: "item-1",
        children: <PanelOne />,
      },
    ];

    if (iframeURL) {
      items.push({
        label: <Tab icon="send" text="申し込みフォーム" />,
        key: "item-2",
        children: <PanelTwo iframeURL={iframeURL} />,
      });
    }
    return items;
  }, [iframeURL]);

  useEffect(() => {
    updateTheme((window as any).pluginInitProperties?.themeColor);
  }, [updateTheme]);

  return {
    items,
    title,
    iframeURL,
    isSidebarShown,
    hideSidebar,
    showSidebar,
    handleDownloadClick,
    ConfigProvider,
  };
};
