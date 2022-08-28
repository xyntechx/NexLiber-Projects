/**
 * Goal: Introduce new users to important libraries, used to interact with the blockchain
 */

const { ethers } = require("ethers");
const { isAddress } = require("@ethersproject/address");
const { formatEther } = require("@ethersproject/units");
const prompt = require("prompt-sync")({ sigint: true });

const provider = ethers.getDefaultProvider();
let requestedAddress;

// get balance of native token (i.e. ethers on ethereum blockchain)
async function getBalance() {
  // 1. Get user's input
  while (true) {
    requestedAddress = prompt(
      "What address' balance would you like to retrieve?: "
    );

    if (isAddress(requestedAddress)) {
      console.log("retrieving balance...");
      break;
    } else {
      console.log(
        "Invalid address! Make sure to include the '0x' at the start..."
      );
    }
  }

  const balance = await provider.getBalance(requestedAddress);

  // parse the hexstring, log the balance
  const parsedBalance = formatEther(balance);
  console.log(
    `The address ${requestedAddress} has a balance of ${parsedBalance} ether.`
  );
}

// get balance of erc-20 tokens: https://ethereum.org/en/developers/docs/standards/tokens/erc-20/
async function getTokenBalance() {
  // 1. Create an abstraction of the smart contract:
  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  // this specifies the functions retrieved from the contract
  const daiAbi = ["function balanceOf(address) view returns (uint256)"];
  const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

  // 2. Get user input:
  while (true) {
    requestedAddress = prompt(
      "What address' balance would you like to retrieve?: "
    );

    if (isAddress(requestedAddress)) {
      console.log("retrieving balance...");
      break;
    } else {
      console.log(
        "Invalid address! Make sure to include the '0x' at the start..."
      );
    }
  }
  const balance = await daiContract.balanceOf(requestedAddress);

  /*
  note: BigNumber has the following interface, where _hex stores the 
  current balance as a hexstring ("0x...").

  interface BigNumber {
    readonly _hex: string;
    readonly _isBigNumber: boolean;
  }
  */

  // as values are only stored as integers, the unparsed balance is actually
  // raised to 10^18 of the true value (for dai), providing 18 artifical decimal places
  const parsedBalance = parseInt(balance._hex, 16) / 10 ** 18;

  console.log(
    `The address ${requestedAddress} has a balance of ${parsedBalance} DAI.`
  );
}
