import type { actHandles } from "@web/types";
import { postMsg } from "@web/utils/common";
import { useState, useEffect, useMemo, useCallback } from "react";

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
  // add status
  const [addingStatus, setAddingStatus] = useState<string>("none");
  // areas
  const [areaList, setAreaList] = useState<Area[]>([]);

  const addArea = useCallback((area: Area) => {
    setAreaList((list) => [...list, area]);
    setAddingStatus("none");
  }, []);

  const updateArea = useCallback((id: string, radius: number) => {
    postMsg("updateArea", { id, radius });
  }, []);

  const removeArea = useCallback((id: string, layerId: string) => {
    setAreaList((list) => list.filter((a) => a.id !== id));
    postMsg("removeArea", layerId);
  }, []);

  const startAddingArea = useCallback(() => {
    postMsg("setAddingArea", true);
    setAddingStatus("area");
  }, []);

  const addAreaBtnStyle = useMemo(() => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: 0,
      color: "#fff",
      background: addingStatus === "area" ? "#ADADAD" : "var(--theme-color)",
      borderColor: addingStatus === "area" ? "#ADADAD" : "var(--theme-color)",
    };
  }, [addingStatus]);

  // models
  const [modelList, setModelList] = useState<Model[]>([]);
  const [modelURL] = useState<string>(
    (window as any).pluginInitProperties?.modelURL ?? ""
  );

  const addModel = useCallback((model: Model) => {
    setModelList((list) => [...list, model]);
    setAddingStatus("none");
  }, []);

  const removeModel = useCallback((id: string, layerId: string) => {
    setModelList((list) => list.filter((a) => a.id !== id));
    postMsg("removeModel", layerId);
  }, []);

  const startAddingModel = useCallback(() => {
    postMsg("setAddingModel", true);
    setAddingStatus("model");
  }, []);

  const addModelBtnStyle = useMemo(() => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: 0,
      color: "#fff",
      background: addingStatus === "model" ? "#ADADAD" : "var(--theme-color)",
      borderColor: addingStatus === "model" ? "#ADADAD" : "var(--theme-color)",
    };
  }, [addingStatus]);

  // labels
  const [labelList, setLabelList] = useState<Label[]>([]);

  const addLabel = useCallback((label: Label) => {
    setLabelList((list) => [...list, label]);
    setAddingStatus("none");
  }, []);

  const updateLabel = useCallback((id: string, labeling: string) => {
    postMsg("updateLabel", { id, labeling });
  }, []);

  const removeLabel = useCallback((id: string, layerId: string) => {
    setLabelList((list) => list.filter((a) => a.id !== id));
    postMsg("removeLabel", layerId);
  }, []);

  const startAddingLabel = useCallback(() => {
    postMsg("setAddingLabel", true);
    setAddingStatus("label");
  }, []);

  const addLabelBtnStyle = useMemo(() => {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: 0,
      color: "#fff",
      background: addingStatus === "label" ? "#ADADAD" : "var(--theme-color)",
      borderColor: addingStatus === "label" ? "#ADADAD" : "var(--theme-color)",
    };
  }, [addingStatus]);

  // common
  const actHandles: actHandles = useMemo(() => {
    return {
      addArea,
      addModel,
      addLabel,
    };
  }, [addArea, addModel, addLabel]);

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

  return {
    addingStatus,
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
  };
};
