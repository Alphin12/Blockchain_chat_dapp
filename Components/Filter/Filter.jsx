import React,{useState,useContext} from "react";
import Image from "next/image";
import Style from "./Filter.module.css";
import { images } from "@/assets";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Model } from "../index";
import { ST } from "next/dist/shared/lib/utils";

const Filter = () => {
  const {account,addFriends} = useContext(ChatAppContext);
  const [addFriend, setAddFriend] = useState(false);
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20}/>
            <input type="text" placeholder="search.." />
          </div>
        </div>
          <div className={Style.Filter_box_right}>
            <button>
              <Image src={images.clear} alt="clear" width={20} height={20}/>
              CLEAR CHAT
            </button>
            <button onClick={()=> setAddFriend(true)}>
              <Image src={images.user} alt="clear" width={20} height={20}/>
              ADD FRIEND
            </button>
          </div>
      </div>
      {/* Model Component */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model openBox={setAddFriend}
          title="Welkom to"
          head="Chat pal"
          info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, repudiandae facilis inventore ex eligendi odit quis. 
          Vitae voluptatibus ea maxime assumenda ipsam, voluptatum mollitia et laudantium cum, at molestiae aspernatur."
          smallinfo="Kindly select your Friend's name & Address"
          image={images.hero}
          functionName={setAddFriend}/>
        </div>
      )}
    </div>
  );
};

export default Filter;
