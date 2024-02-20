import { ethers } from "ethers";
import web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from "../Context/constants";
import { sign } from "crypto";

export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamsk");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamsk");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    const web3modal = new web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const converTime = (time) => {
  const newTime = new Date(time.toNumber());
  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    "Date" +
    (newTime.getMonth() + 1);
  "/" + newTime.getFullYear();

  return realTime;
};
