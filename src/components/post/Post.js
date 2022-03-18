import "./post.css"
import avatar from "../../img/avatar.png"
import banner from "../../img/banner.png"
import React from 'react'




export default function Post() {
  return (
    <div className="post">
         <div className="accountContain">
             <div className ="accountImgContain"><img className ="accountImg" src={avatar}/></div>
             <div className ="accountAddress">0x00000000000</div>
         </div>
         <img className="postImg" src ={banner}/>
         <div className="postInfo">
             <div className="postTitle">Travel Trip</div>
             <div className="postContent">A spoken or written representation or account of a person, object, or event.A spoken or written representation or account of a person, object, or event.A spoken or written representation or account of a person, object, or event.A spoken or written representation or account of a person, object, or event.</div>
         </div>
         <div className ="tipContain">
             <div className="tipCount">TIPS: 10 ETH</div>
             <button className="tipAction">TIP 0.1 ETH</button>
         </div>
    </div>
  )
}
