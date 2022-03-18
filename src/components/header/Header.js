import "./header.css"
import React from 'react'

import banner from "../../img/banner.png"

export default function Header() {
    return (
            <div className="header">
                <div className="headerTitle">
                    <span className ="headerTitleSm">Share & Earn</span>
                    <span className ="headerTitleLg">BLOCKCHAIN BLOG</span>
                </div>
                <img className="headerImg" src={banner}/>
               
            </div>
       

    )
}