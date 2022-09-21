import type { actHandles } from "@web/types";
import { postMsg } from "@web/utils/common";
import { useState, useEffect, useMemo, useCallback } from "react";

export type Area = {
  id: string;
  layerId: string;
  radius: number;
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

  const actHandles: actHandles = useMemo(() => {
    return {
      addArea: addArea,
    };
  }, [addArea]);

  useEffect(() => {
    (globalThis as any).addEventListener("message", (msg: any) => {
      if (msg.source !== (globalThis as any).parent || !msg.data.act) return;
      actHandles[msg.data.act as keyof actHandles]?.(msg.data.payload);
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

  return {
    isSidebarShown,
    hideSidebar,
    showSidebar,
    areaList,
    updateArea,
    removeArea,
  };
};
