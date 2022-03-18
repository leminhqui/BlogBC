import "./topbar.css"
import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import Web3 from 'web3'
import Identicon from 'identicon.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
  



class TopBar extends Component{
 
 render(){
    return (
        <div className="top">
            <div className = "topLeft">
               <a href="#"><i className="topIcon fa-brands fa-facebook-square"></i></a>
               <a href="#"><i className="topIcon fa-brands fa-twitter-square"></i></a>
               <a href="#"><i className="topIcon fa-brands fa-instagram-square"></i></a>
            </div>
            <div className = "topCenter">
                <ul className="topList">
                    <li onClick={()=>{this.props.loadPost ()}} className="topListItem"><NavLink activeClassName="active" className="link" to="/" exact={true}>HOME</NavLink></li>
                    {this.props.account
                        ?<li className="topListItem"><NavLink activeClassName="active" className="link" to="/mypost">MY POST</NavLink></li>
                        : <div></div>
                        
                    }
                    {this.props.account
                        ?this.props.networkData
                            ?<div></div>
                            // ?<li className="topListItem"><NavLink activeClassName="active" className="link" to="/">WRITE</NavLink></li>
                            :<li onClick={()=>{this.props.write()}} className="topListItem"><NavLink activeClassName="active" className="link" to="/write">WRITE</NavLink></li>
                        
                        :<li onClick={()=>{this.props.checkwriteAccount ()}} className="topListItem"><NavLink activeClassName="active" className="link" to="/">WRITE</NavLink></li>
                        
                    }
                    {this.props.account
                        ? <li onClick={()=>{this.props.logOut()}} className="topListItem"><NavLink activeClassName="active" className="link" to="/">LOGOUT</NavLink></li>
                        : <div></div>
                    }
                    
                </ul>
            </div>
            <div className = "topRight">
                {this.props.account 
                        ?  <ul className="account">
                                <li className="accountItem">
                                    <small className="accountAddressContain">
                                        <small id="accountAddress" className="accountAddress">{this.props.account}</small>
                                    </small>
                                    {this.props.account
                                        ? 
                                        <img className="accountAvatar"
                                            src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                                        />
                                        : <span></span>
                                    }
                                </li>
                            </ul>
                        :<button onClick={() => { this.props.connectMetaMask()}} className="loginmetamask">LOGIN WITH METAMASK</button>

                    }
            </div>
        </div>
        
      )
 }

}

export default TopBar