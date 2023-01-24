"use client";

import GlobalStyles from "@/styles/globalStyle";
import { When } from "react-if";

import Auth from "@/components/Auth";
import Background from "@/components/Background";
import Initializer from "@/providers/initializer";
import Web3ReactProvider from "@/providers/web3React";
import { useStore } from "@/store/useStore";
import { usePathname } from "next/navigation";
import StyledComponentsRegistry from "./registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // useStore.setState({ showBg: true });

  const ceramic = useStore((state) => state.ceramic);
  const pathname = usePathname();

  const guard = {
    general: typeof ceramic !== "undefined",
    share:
      typeof ceramic === "undefined" && pathname!.split("/")[1] === "share",
    auth: typeof ceramic === "undefined" && pathname!.split("/")[1] !== "share",
  };

  const wrappedChildren = (
    <div style={{ position: "relative", zIndex: "1" }}>{children}</div>
  );

  return (
    <html data-color-mode="dark" lang="en">
      <head />
      <Web3ReactProvider>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <Initializer>
            <body>
              <When condition={guard.auth}>
                <Auth />
              </When>
              <When condition={guard.general}>{wrappedChildren}</When>
              <When condition={guard.share}>{wrappedChildren}</When>
              <Background />
            </body>
          </Initializer>
        </StyledComponentsRegistry>
      </Web3ReactProvider>
    </html>
  );
}
