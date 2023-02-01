import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { getResolver } from "@ceramicnetwork/3id-did-resolver";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { Web3Provider } from "@ethersproject/providers";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import { ModelData } from "@glazed/types";
import { DID } from "dids";

export default function ceramic() {
  async function auth(provider: Web3Provider) {
    try {
      const account = await provider.listAccounts();
      const ethereum = provider.provider;
      const authProvider = new EthereumAuthProvider(ethereum, account[0]);

      const threeID = new ThreeIdConnect();
      await threeID.connect(authProvider);

      const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com"); // FIXME: add url from .env

      const did = new DID({
        provider: threeID.getDidProvider(),
        resolver: {
          ...getResolver(ceramic),
        },
      });
      await did.authenticate();

      ceramic.did = did;

      return ceramic;
    } catch (e) {
      alert("Something went wrong please connect again");
      console.log(e);
    }
  }

  function store(ceramic: CeramicClient, aliases: ModelData<string>) {
    const model = new DataModel({ ceramic, aliases });
    return new DIDDataStore({ ceramic, model });
  }

  async function deterministic({
    controller,
    family,
  }: {
    controller: string;
    family: string;
  }) {
    const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com");

    const doc = await TileDocument.deterministic(ceramic as any, {
      // Did of the tile controller.
      controllers: [controller],

      // Deployed model aliases definition.
      family,
    });

    const data: any = doc.content;
    return data;
  }

  return {
    auth,
    store,
    deterministic,
  };
}
