import "./footer.css"
import React from 'react'


export default function Footer() {
  return (
    <div className="footer">
        <div className="footerHeadContain">
            <div className="footerHeadContent">
                <h6 className="headSub">About</h6>
                <p class="footerHeadContentDes">
                    {/* BlockchainBlog.com  */}
                    <i> BLOCKCHAIN-BLOG is a graduate product of K43 software engineering 2017-2022. </i> 
                        Users can share images and get tips from other users.
                </p>
            </div>
            <div className="footerHeadContent categories">
                <h6 className="headSub">Categories</h6>
                <ul className="footer-links">
                    <li><a href="https://nodejs.org/en/about/">Nodejs</a></li>
                    <li><a href="https://reactjs.org/docs/getting-started.html">ReactJS</a></li>
                    <li><a href="https://docs.metamask.io/guide/getting-started.html#basic-considerations">Web3js</a></li>
                  
                </ul>
            </div>
        </div>
       <div className ="footerSubContain">
            <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by 
                <a href="#"> LÊ MINH QUÍ - B1704765</a>.
            </p>
       </div>
        
    </div>
  )
}
