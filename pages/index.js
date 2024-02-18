import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT

import { ChatAppContext } from "@/Context/ChatAppContext";
import { Filter,Friend } from "@/Components";

const ChatApp = () => {
  const {} = useContext(ChatAppContext);
  return <div>
    <Filter/>
    <Friend/>
  </div>;
};

export default ChatApp;
