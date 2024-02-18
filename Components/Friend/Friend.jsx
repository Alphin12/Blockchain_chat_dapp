import React,{useState,useContext} from "react";
import Image from "next/image";
import { images } from "@/assets";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";
import { ChatAppContext } from "@/Context/ChatAppContext";

import Style from "./Friend.module.css";

const Friend = () => {
  //const array = [1,2,3,4,5];
  const {sendMessage,account,friendList,readMessage,userName,friendMsg,loading,readUser, currentUserName, currentUserAddress} = useContext(ChatAppContext);

  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {friendList.map((el,i)=>(
            <Card key={i+1} el={el} i={i} readMessage={readMessage} readUser={readUser}/>
          ))}
        </div>
        <div className={Style.Friend_box_right}>
          <Chat functionName={sendMessage} readMessage={readMessage} friendMsg={friendMsg} account={account} userName={userName}
            loading={loading} currentUserName={currentUserName} currentUserAddress={currentUserAddress} readUser={readUser}/>
        </div>
      </div>
    </div>
  );
};

export default Friend;
