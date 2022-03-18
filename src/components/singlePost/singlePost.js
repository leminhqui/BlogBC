
import "./singlePost.css"
import avatar from "../../img/avatar.png"
import banner from "../../img/banner.png"
import React, { Component } from 'react'

//Declare IPFS
const ipfsClient = require('ipfs-http-client');
const projectId = '25PRDWBAiCozM5VfZt9eWr46gAp';
const projectSecret = '0b99885bbc5a21e2132e805b10db169c';
const ipfs = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
   
});



class singlePost extends Component {
   render(){ 
      return (
         
      <div className="singlePost">
        <div className="singlePostWrapper">
            <div className="singlePostImgContain"> 
               <img className="singlePostImg" src={banner}/>
            </div>
           <h1 className="singlePostTitle">Travel Trip</h1>
           <div className="singlePostAccountContain">
               <div className="singlePostAccountContainLeft">
                  <div className ="accountImgContain"><img className ="accountImg" src={avatar}/></div>
                  <div className ="accountAddress"><b>0x00000000000</b></div>
               </div>
               <div className="singlePostAccountContainRight">
                  <div className="tipCount">TIPS: 10 ETH</div>
                  <button className="tipAction">TIP 0.1 ETH</button>
               </div>
           </div>
           <div className="singlePostContent">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
           </div>
        </div>
      </div>
    )}
 
}
export default singlePost;