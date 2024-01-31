import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Model, Error } from "../index";
import { images } from "../../assets";

const NavBar = () => {
  const menuItems = [
    {
      menu: "All User",
      link: "/",
    },
    {
      menu: "CHAT",
      link: "/",
    },
    {
      menu: "CONTACT",
      link: "/",
    },
    {
      menu: "SETTING",
      link: "/",
    },
    {
      menu: "FAQs",
      link: "/",
    },
    {
      menu: "Term Of Use",
      link: "/",
    },
  ];

  //USESTATE

  const [active, setActive] = useState(2);
  const [open, setopen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet } = useContext(ChatAppContext);

  return <div></div>;
};

export default NavBar;
