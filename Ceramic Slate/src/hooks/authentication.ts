import { useWeb3React } from "@web3-react/core";

import ceramicService from "@/services/ceramic";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

export function useAuthConnect() {
  const addCeramicInstance = useStore((state) => state.addCeramicInstance);

  const [isActivating, setIsActivating] = useState(false);
  const { hooks } = useWeb3React();
  const { auth } = ceramicService();

  const { usePriorityProvider, usePriorityConnector } = hooks;

  const connector = usePriorityConnector();
  const provider = usePriorityProvider();

  async function connect() {
    try {
      setIsActivating(true);
      await connector.activate();
      const ceramic = await auth(provider!);
      addCeramicInstance(ceramic!);
      setIsActivating(false);
    } catch (e) {
      setIsActivating(false);
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }

  return {
    isActivating,
    connect,
  };
}

export const useAuthDisconnect = () => {
  const { connector } = useWeb3React();

  if (connector?.deactivate) {
    void connector.deactivate();
  } else {
    void connector.resetState();
  }
};

export const useEagerlyConnect = () => {
  const { connector } = useWeb3React();
  useEffect(() => {
    void connector.connectEagerly?.()!.catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  // eagerly connect for ceramic!
};
