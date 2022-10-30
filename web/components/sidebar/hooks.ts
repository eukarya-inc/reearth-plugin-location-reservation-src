import type { actHandles } from "@web/types";
import { postMsg } from "@web/utils/common";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";

export type Area = {
  id: string;
  layerId: string;
  radius: number;
};

export type Model = {
  id: string;
  layerId: string;
};

export type Label = {
  id: string;
  layerId: string;
};


export default () => {
  const [isSidebarShown, setSidebarShown] = useState(true);

  const [areaList, setAreaList] = useState<Area[]>([]);

  const addArea = useCallback((area: Area) => {
    setAreaList((list) => [...list, area]);
  }, []);

  const updateArea = useCallback((id: string, radius: number) => {
    postMsg("updateArea", { id, radius });
  }, []);

  const removeArea = useCallback((id: string, layerId: string) => {
    setAreaList((list) => list.filter((a) => a.id !== id));
    postMsg("removeArea", layerId);
  }, []);

  const [modelList, setModelList] = useState<Model[]>([]);

  const addModel = useCallback((model: Model) => {
    setModelList((list) => [...list, model]);
  }, []);

  const removeModel = useCallback((id: string, layerId: string) => {
    setModelList((list) => list.filter((a) => a.id !== id));
    postMsg("removeModel", layerId);
  }, []);


  const [labelList, setLabelList] = useState<Label[]>([]);


  const addLabel = useCallback((label: Label) => {
    setLabelList((list) => [...list, label]);
  }, []);

  const updateLabel = useCallback((id: string, labeling: string) => {
    postMsg("updateLabel", { id, labeling });
  }, []);

  const removeLabel = useCallback((id: string, layerId: string) => {
    setLabelList((list) => list.filter((a) => a.id !== id));
    postMsg("removeLabel", layerId);
  }, []);

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

  const actHandles: actHandles = useMemo(() => {
    return {
      addArea,
      addModel,
      addLabel,
      getCaptureScreen,
    };
  }, [addArea, addModel, addLabel, getCaptureScreen]);

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

  const handleDownloadClick = useCallback(() => {
    if (!isRequestingMap.current) {
      postMsg("download");
      isRequestingMap.current = true;
    }
  }, []);

  return {
    isSidebarShown,
    hideSidebar,
    showSidebar,
    areaList,
    updateArea,
    removeArea,
    modelList,
    removeModel,
    labelList,
    updateLabel,
    removeLabel,
    handleDownloadClick,
  };
};
