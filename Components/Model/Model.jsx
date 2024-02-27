import React, {useState, useContext} from "react";
import Style from "./Model.module.css"; //INTERNAL IMPORT
import Image from "next/image";
import {images} from "../../assets";
import { Loader } from "../../Components/index";
import { ChatAppContext } from "../../Context/ChatAppContext";

const Model = ({openBox, title, address, head , info , smallinfo, image, functionName,}) => {
  const [name, setName] = useState("");
  const [AccountAddress, setAccountAddress] = useState("");
  const {loading} = useContext(ChatAppContext);
  return (<div className={Style.Model}>
    <div className={Style.Model_box}>
      <div className={Style.Model_box_left}>
        <Image src = {image} alt="buddy" width={700} height={700}/>
      </div>
      <div className={Style.Model_box_right}>
        <h1>{title} <span>{head}</span></h1>
        <p>{info}</p>
        <small>{smallinfo}</small>
        {loading == true ? (<Loader/>) : (<div className={Style.Model_box_right_name}>
          <div className={Style.Model_box_right_name_info}>
            <Image src = {images.username} alt="user" width={30} height={30}/>
            <input type = 'text' placeholder="your name" onChange={(e)=> setName(e.target.value)}/>
          </div>
          <div className={Style.Model_box_right_name_info}>
            <Image src = {images.account} alt="user" width={30} height={30}/>
            <input type = 'text' placeholder={address || "Enter address.."} onChange={(e)=> setAccountAddress(e.target.value)}/>
          </div>
          <div className={Style.Model_box_right_name_btn}>
            <button onClick={()=> functionName({name,AccountAddress})}>
              {""}
              <Image src={images.send} alt="send" width={30} height={30}/>
              {""}
              Submit
            </button>
            <button onClick={()=> openBox(false)}>
              {""}
              <Image src={images.close} alt="close" width={30} height={30}/>
              {""}
              Cancel
            </button>
          </div>
        </div>)
        }
        
      </div>
    </div>
  </div>);
};

export default Model;
