import { useEagerlyConnect } from "@/hooks/authentication";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

export default function Initializer({
  children,
}: {
  children: React.ReactNode;
}) {
  // attempt to connect eagerly on mount
  useEagerlyConnect();

  return <>{children}</>;
}
