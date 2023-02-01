import { hooks as metaMaskHooks, metaMask } from "@/connectors/metaMask";
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "@/connectors/walletConnect";
import { Web3ReactHooks, Web3ReactProvider as W3RP } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";

const connectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
];

export default function Web3ReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <W3RP connectors={connectors}>{children}</W3RP>;
}
