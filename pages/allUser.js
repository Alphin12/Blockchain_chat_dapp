import React, {useEffect, useState, useContext } from 'react'
//internal import
import { UserCard } from '@/Components';
import Style from "../styles/allUser.module.css";
import { ChatAppContext } from '@/Context/ChatAppContext';

const allUser = () => {
    const{userLists, addFriends} = useContext(ChatAppContext);
  return (
    <div>
        <div className={Style.alluser_info}>
            <h1>Find your Friends</h1>
        </div>
        <div className={Style.alluser}>
            {userLists.map((el,i)=>(
                <UserCard key={i+1} el={el} i={i} addFriends={addFriends}/>
            ))}
        </div>
    </div>
  )
}

export default allUser