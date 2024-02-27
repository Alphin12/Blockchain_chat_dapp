import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT

import {
  CheckIfWalletConnected,
  connectWallet,
  connectingWithContract,
  converTime,
} from "@/Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  //USESTATE
  const [accounts, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  // CHAT USER DATA

  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");
  const router = useRouter();

  // FETCH DATA TIME OF PAGE LOAD

  const fetchData = async () => {
    try {
      //Get Contract
      const contract = await connectingWithContract();
      //GET ACCOUNT
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      //GET USER NAME
      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);
      //GET FRIEND LIST
      const friendList = await contract.getMyFriendList();
      setFriendList(friendList);
      //GET ALL APP USER
      const userList = await contract.getAllAppUser();
      setUserList(userList);
    } catch (error) {
     // setError("Please install and connect your wallet");
     console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //READ MESSSAGE

  const readMessage = async ({ friendAddress }) => {
    try {
      const contract = await connectingWithContract();
      const readMessage = await contract.readMessage(friendAddress);
      setFriendMsg(readMessage);
    } catch (error) {
      setError("Currently You have no message");
    }
  };

  //CREATE ACCOUNT

  const createAccount = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress)
      //   return setError("Name and AccountAddress , cannot be empty");

      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("error while creating account");
    }
  };

  //ADD YOUR FRIEND

  const addFriends = async ({ accountaddress, name }) => {
    try {
      // if (accountaddress || name)
      //   return setError("address and name can't be empty");

      const contract = await connectingWithContract();
      const addMyFriends = await contract.addFriend(accountaddress, name);
      setLoading(true);
      await addMyFriends.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("error while adding friends");
    }
  };

  //SEND MESSAGE TO YOUR FRIEND

  const sendMessage = async ({ accountAddress, msg }) => {
    try {
      // if (accountAddress || msg)
      //   return setError("address and name can't be empty");
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(accountAddress, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("error while sending message");
    }
  };

  //READ USER INFO

  const readUser = async (userAddres) => {
    try {
      const contract = await connectingWithContract();
      const userName = await contract.getUsername(userAddres);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddres);
    } catch (error) {
      setError("error while reading user");
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        CheckIfWalletConnected,
        accounts,
        userName,
        friendList,
        friendMsg,
        loading,
        userList,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
