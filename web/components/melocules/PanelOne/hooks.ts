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
  // areas
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

  const startAddingArea = useCallback(() => {
    postMsg("setAddingArea", true);
  }, []);

  // models
  const [modelList, setModelList] = useState<Model[]>([]);
  const [modelURL] = useState<string>(
    (window as any).pluginInitProperties?.modelURL ?? ""
  );

  const addModel = useCallback((model: Model) => {
    setModelList((list) => [...list, model]);
  }, []);

  const removeModel = useCallback((id: string, layerId: string) => {
    setModelList((list) => list.filter((a) => a.id !== id));
    postMsg("removeModel", layerId);
  }, []);

  const startAddingModel = useCallback(() => {
    postMsg("setAddingModel", true);
  }, []);

  // labels
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

  const startAddingLabel = useCallback(() => {
    postMsg("setAddingLabel", true);
  }, []);

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
  };
};
