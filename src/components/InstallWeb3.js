import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './installweb3.css'


class InstallWeb3 extends Component {

    installMetamask(){
        window.location.assign("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn");
    }
    installCoin98Wallet(){
        window.location.assign("https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg");
    }

    render() {
        return (
            <div className='installWeb3'>
                <div className='installWeb3Container'>
                     <h2 id="headerTitle">Hãy cài trình duyệt Web3</h2>
                     <div className='buttonContainer'>
                        <button id="button" 
                            onClick={this.installMetamask}
                        >Cài đặt MetaMask</button>
                        {/* <div className='or'>Or</div>
                        <button id="button1"
                        onClick={this.installCoin98Wallet}
                        >Cài đặt Coin98 Wallet</button> */}
                        </div>
                </div>
            </div>
        )
    }
}
export default InstallWeb3;