import TopBar from "../src/components/topbar/TopBar";
import Footer from "./components/footer/Footer";
import Home from "./page/home/Home";
import Single from "./page/single/Single";
import Write from "./page/write/Write";
import Post from "./components/post/Post"
import Update from "./page/update/Update";
import React, { Component, useState } from 'react';
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import Identicon from 'identicon.js';
import Loading from "./page/load/Loading";
import BlogNetwork from './abis/BlogNetwork.json'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import "./App.css"
import ScrollToTop from 'react-scroll-to-top'
import { create } from "ipfs-http-client";
import MyPosts from "./page/myposts/MyPosts";
import ModalTip from "./page/modalTip/ModalTip";
import { render } from "react-dom";

//Declare IPFS
const ipfsClient = require('ipfs-http-client');
const projectId = '25PRDWBAiCozM5VfZt9eWr46gAp';
const projectSecret = '0b99885bbc5a21e2132e805b10db169c';
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',

});

// tạo abi , addressSM
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "deletePost",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "posts",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "hash",
        "type": "string"
      },
      {
        "name": "title",
        "type": "string"
      },
      {
        "name": "content",
        "type": "string"
      },
      {
        "name": "tipAmount",
        "type": "uint256"
      },
      {
        "name": "author",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "postCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "tipPost",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "uint256"
      },
      {
        "name": "_imgHash",
        "type": "string"
      },
      {
        "name": "_title",
        "type": "string"
      },
      {
        "name": "_content",
        "type": "string"
      }
    ],
    "name": "updatePost",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_imgHash",
        "type": "string"
      },
      {
        "name": "_title",
        "type": "string"
      },
      {
        "name": "_content",
        "type": "string"
      }
    ],
    "name": "createPost",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "hash",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "content",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "tipAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "author",
        "type": "address"
      }
    ],
    "name": "PostCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "hash",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "content",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "tipAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "author",
        "type": "address"
      }
    ],
    "name": "PostTipped",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "hash",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "content",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "tipAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "author",
        "type": "address"
      }
    ],
    "name": "PostUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "PostDelete",
    "type": "event"
  }
];
const addressSM = '0xaA5572b6250594398b8b1e61D35d2be4e2922A5c';
const web3 = new Web3(window.ethereum)
// tạo contractMM
const contractBN = new web3.eth.Contract(abi, addressSM)

// tạo contract cho infura
const provider = new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/d77c48ee4efc48b4b93469a2366bfd52')
const web3_infura = new Web3(provider)
const contractIFR = new web3_infura.eth.Contract(abi, addressSM)
const fromWei = 1000000000000000000

const idp = ''




contractIFR.events.PostCreated({ filter: {}, fromBlock: 'latest' }, function (error, data) {
  if (error) { console.log(error) }
  else {
    console.log(data)
    alert("Có bài viết mới hãy bấm HOME để cập nhật")
  }
})

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      blogNetwork: null,
      postCount: 0,
      posts: [],
      loading: false,
      networkData: null,
      showImg: 'https://www.viet247.net/images/noimage_food_viet247.jpg',
      buffer: null,
      hash: null,
      contractBN: contractBN
    }

    this.connectMetaMask = this.connectMetaMask.bind(this)
    this.logOut = this.logOut.bind(this)
    this.write = this.write.bind(this)
    this.checkwriteAccount = this.checkwriteAccount.bind(this)
    this.createPost = this.createPost.bind(this)
    this.tipPost = this.tipPost.bind(this)
    this.updatePost = this.updatePost.bind(this)
    this.loadPost = this.loadPost.bind(this)
    this.tiph = this.tiph.bind(this)
    this.tipl = this.tipl.bind(this)
  }
  // connectMetaMask
  async connectMetaMask() {
    try {
      // click button 
      this.setState({ loading: true })
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else
        if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          const a = window.confirm('Không tìm thấy trình duyệt Ethereum. Bạn có muốn cài đặt MetaMask!')
          if (a === true) {
            window.location.assign("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn");
          }
          else { this.setState({ loading: false }) }
        }
      // load data
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      this.setState({ loading: false })
      await this.checkNetwork()

    }
    catch (err) {
      if (err.code === 4001) {
        this.setState({ loading: false })
        alert("Người dùng đã từ chối kết nối !")

      } else if (err.code === -32002) {
        console.log('Please unlock MetaMask.')
      } else {
        console.error(err);
      }
    }
  };

  async changeAccount() {
    this.setState({ loading: true })
    const accounts = await window.web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ loading: false })

  }
  async logOut() {
    window.location.reload();
  }
  async checkAccount() {
    window.ethereum.on('accountsChanged', () => {
      this.changeAccount()

    });
    window.ethereum.on('chainChanged', () => {
      this.checkNetwork()

    });
  }
  async checkNetwork() {
    const web3 = window.web3
    if (this.state.account === '') {
    }
    else {
      const netID = await web3.eth.net.getId()
      const netData = BlogNetwork.networks[netID]
      this.setState({ networkData: netData })

      if (netData) {
      }
      else {
        alert("Blockchain Blog không được xây dựng trên mạng này ! \n Hãy kết nối với mạng Rinkeby")
      }
    }
  }

  async loadPost() {
    this.setState({ posts: [] })
    const postCount = await contractBN.methods.postCount().call()
    if (this.state.account === '') {
      for (var i = 1; i <= postCount; i++) {
        const post = await contractBN.methods.posts(i).call()
        this.setState({ posts: [...this.state.posts, post] })

      }
      this.setState({
        posts: this.state.posts.sort((a, b) => b.createtime - a.createtime)
      })
    }
    else {
      for (var i = 1; i <= postCount; i++) {
        const post = await contractBN.methods.posts(i).call()
        this.setState({ posts: [...this.state.posts, post] })
      }
      this.setState({
        posts: this.state.posts.sort((a, b) => b.createtime - a.createtime)
      })
    }
  }
  async tiph() {
    this.setState({ posts: [] })
    const postCount = await contractBN.methods.postCount().call()
    if (this.state.account === '') {
      for (var i = 1; i <= postCount; i++) {
        const post = await contractBN.methods.posts(i).call()
        this.setState({ posts: [...this.state.posts, post] })

      }
      this.setState({
        posts: this.state.posts.sort((a, b) => b.tipAmount - a.tipAmount)
      })
    }
    else {
      for (var i = 1; i <= postCount; i++) {
        const post = await contractBN.methods.posts(i).call()
        this.setState({ posts: [...this.state.posts, post] })
      }
      this.setState({
        posts: this.state.posts.sort((a, b) => b.tipAmount - a.tipAmount)
      })
    }
  }
  async tipl() {
    this.setState({ posts: [] })
    const postCount = await contractBN.methods.postCount().call()
    if (this.state.account === '') {
      for (var i = 1; i <= postCount; i++) {
        const post = await contractBN.methods.posts(i).call()
        this.setState({ posts: [...this.state.posts, post] })

      }
      this.setState({
        posts: this.state.posts.sort((a, b) => a.tipAmount - b.tipAmount)
      })
    }
    else {
      for (var i = 1; i <= postCount; i++) {
        const post = await contractBN.methods.posts(i).call()
        this.setState({ posts: [...this.state.posts, post] })
      }
      this.setState({
        posts: this.state.posts.sort((a, b) => a.tipAmount - b.tipAmount)
      })
    }
  }
  async write() {
    this.setState({ loading: true })
    if (this.state.networkData) {
      this.setState({ loading: false })

    }
    else {
      alert("Blockchain Blog không được xây dựng trên mạng này ! \n Hãy kết nối với mạng Rinkeby")
      console.log(this.state.networkData)
      this.setState({ loading: false })

    }
  }
  async checkwriteAccount() {
    this.setState({ loading: true })
    if (this.state.account) {
      this.setState({ loading: false })

    }
    else {
      this.setState({ loading: false })
      alert("Hãy đăng nhập để sử dụng chức năng này !")
    }
  }


  async componentWillMount() {
    await this.checkAccount()
    await this.checkNetwork()
    await this.loadPost()
  }

  imageHandler = (e) => {
    e.preventDefault()
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0])
    if (e.target.files && e.target.files.length > 0) {
      this.setState({ showImg: (URL.createObjectURL(e.target.files[0])) })
      console.log(this.state.showImg)
    }
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ buffer: Buffer(reader.result) })
        console.log(this.state.buffer)
      }
    }
  }

  // upload img to ipfs
  createPost(title, content) {

    ipfs.add(this.state.buffer).then((result, error) => {
      console.log('Ipfs result', result)
      if (error) {
        console.error(error)
        return
      }
      this.setState({ loading: true })
      contractBN.methods.createPost(result.path, title, content).send({ from: this.state.account }).on('transactionHash', (hash) => {
        // contractIFR.events.PostCreated({filter:{}, fromBlock:'latest'}, function(error,data){
        //   if(error){console.log(error)}
        //   else{
        //     alert("Bài viết của bạn đã được đăng !")


        //   }})
        alert("Bài viết đang trong quá trình sử lí !")

        this.setState({ loading: false })
        this.setState({ showImg: "https://www.viet247.net/images/noimage_food_viet247.jpg" })
      })

    })
  }
  tipPost(id, tipAmount) {

    try {
      this.setState({ loading: true })

      contractBN.methods.tipPost(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
        alert("Tiền tip của bạn đã được gửi đi")
        this.setState({ loading: false })
      })
    } catch (error) {
      if (error.code === 4001) { alert("bỏ") }
      this.setState({ loading: false })
    }

  }


  updatePost(id, hash, title, content) {
    console.log("update")
    if (this.state.buffer == null) {
      this.setState({ loading: true })
      contractBN.methods.updatePost(id, hash, title, content).send({ from: this.state.account }).on('transactionHash', (hash) => {
         contractIFR.events.PostUpdated({filter:{}, fromBlock:'latest'}, function(error,data){
          if(error){console.log(error)}
          else{
            alert("Bài viết của bạn đã được sửa !\nBấm MY POST để xem")
            window.history.back()
          }})
        console.log("update không đổi hình")
      })
    }
    else {
      ipfs.add(this.state.buffer).then((result, error) => {
        console.log('Ipfs result', result)
        if (error) {
          console.error(error)
          return
        }
        this.setState({ loading: true })
        contractBN.methods.updatePost(id, result.path, title, content).send({ from: this.state.account }).on('transactionHash', (hash) => {
          contractIFR.events.PostUpdated({filter:{}, fromBlock:'latest'}, function(error,data){
            if(error){console.log(error)}
            else{
              alert("Bài viết của bạn đã được sửa !\n Bấm MY POST để xem")
              window.history.back()
            }})
          })
        
        console.log("update  đổi hình")
      })
    }

  }
  render() {

    return (
      <Router>
        <ScrollToTop smooth />
        <TopBar
          connectMetaMask={this.connectMetaMask}
          logOut={this.logOut}
          write={this.write}
          checkwriteAccount={this.checkwriteAccount}
          account={this.state.account}
          loadPost={this.loadPost}
        />
        <Route path="/" exact>
          {this.state.loading
            ? <Loading />
            : <Home posts={this.state.posts}
              tipPost={this.tipPost}
              account={this.state.account}
              write={this.write}
              checkwriteAccount={this.checkwriteAccount}
              tiph={this.tiph}
              tipl={this.tipl}
              loadPost={this.loadPost}
            />
          }
        </Route>
        <Route path="/write">
          {this.state.networkData
            ? <Write
              hash={this.state.hash}
              networkData={this.state.networkData}
              account={this.state.account}
              imageHandler={this.imageHandler}
              createPost={this.createPost}
              showImg={this.state.showImg}
            />
            : <Loading />
          }
        </Route>
        <Route path="/single/:id" >
          <Single
            tipPost={this.tipPost}
            posts={this.state.posts}
            contractBN={this.state.contractBN}
            account={this.state.account}
            checkwriteAccount={this.checkwriteAccount}
          />
        </Route>
        <Route path="/update/:id" >
          {this.state.account
            ? 
            <Update
              showImg={this.state.showImg}
              loading={this.state.loading}
              imageHandler={this.imageHandler}
              updatePost={this.updatePost}
              tipPost={this.tipPost}
              posts={this.state.posts}
              contractBN={this.state.contractBN}
              account={this.state.account}
              checkwriteAccount={this.checkwriteAccount}
            />

            : <Loading />
          }
        </Route>
        <Route path="/mypost" >
          {this.state.account
            ? <MyPosts posts={this.state.posts}
              contractBN={this.state.contractBN}
              account={this.state.account}
              checkwriteAccount={this.checkwriteAccount}
              tiph={this.tiph}
              tipl={this.tipl}
              loadPost={this.loadPost}
            />
            : <Loading />
          }
        </Route>
        <Footer />
      </Router>
    );
  }

}

export default App;
