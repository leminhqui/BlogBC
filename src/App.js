import TopBar from "../src/components/topbar/TopBar";
import Footer from "./components/footer/Footer";
import Home from "./page/home/Home";
import Single from "./page/single/Single";
import Write from "./page/write/Write";
import Post from "./components/post/Post"
import Update from "./page/update/Update";
import React, { Component, useState } from 'react';
import Web3 from 'web3'
import Web3Modal, { themesList } from 'web3modal'
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
import InstallWeb3 from "./components/InstallWeb3/InstallWeb3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/login/Login";
import Profile from './components/profile/Profile.js'
import Register from "./components/Register/Register";
import ProfileUser from './components/profile/ProfileUser'

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
			},
			{
				"name": "createtime",
				"type": "uint256"
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "account",
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
				"name": "name",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "author",
				"type": "address"
			},
			{
				"name": "createtime",
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
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			}
		],
		"name": "updateAccount",
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
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			}
		],
		"name": "createAccount",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"constant": true,
		"inputs": [],
		"name": "accountCount",
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
			},
			{
				"indexed": false,
				"name": "createtime",
				"type": "uint256"
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
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "email",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "createtime",
				"type": "uint256"
			}
		],
		"name": "AccountCreated",
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
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "email",
				"type": "string"
			}
		],
		"name": "AccountUpdated",
		"type": "event"
	}
];
const addressSM = '0x0c6075F6238af396C5E92aA40b0a25c62D4f2404';
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
		toast.info("Có bài viết mới hãy bấm HOME để cập nhật")
	}
})




let hashAvatar = "QmRyHdUSSXFK7Z2mApxpC5dEouB4czhSfHX8cT8m8z7RzH"
let idn = web3.eth.net.getId()

class App extends Component {


	constructor(props) {
		super(props)
		this.state = {
			accountaddress: '',
			account: '',
			authen: false,
			blogNetwork: null,
			postCount: 0,
			posts: [],
			loading: false,
			networkData:
				Promise.resolve(idn).then(result => { this.setState({ networkData: result }) }),
			showImg: 'https://www.viet247.net/images/noimage_food_viet247.jpg',
			buffer: null,
			avatar: `https://ipfs.infura.io/ipfs/${hashAvatar}`,
			hash: null,
			owner: null,
			web3: true,
			reg: false,
			openRegister: false,
			openModalRegister: false,
			contractBN: contractBN,
			authsuccess: []
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
		this.checkWeb3 = this.checkWeb3.bind(this)
		this.setLoading = this.setLoading.bind(this)
		this.auth = this.auth.bind(this)
		this.resetModalRegiter = this.resetModalRegiter.bind(this)
		this.avatarHandler = this.avatarHandler.bind(this)
		this.createAccount = this.createAccount.bind(this)
		this.setAccountAddress=this.setAccountAddress.bind(this)
		this.newPost=this.newPost.bind(this)
	}
	// connectMetaMask
	async checkWeb3() {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			// await window.ethereum.enable()
			this.loadPost()
		}
		else {
			this.setState({ web3: false })
			toast.error("Không phát hiện trình duyệt web3 hoặc bạn đang sử dụng trình duyệt ẩn danh")
		}
	}

	async connectMetaMask() {
		this.setState({ accountAddress: [] })
		try {
			if (this.state.networkData !== 4) {
				toast.warn("Please change network to Rinkby")

			}
			else {
				try {
					this.setState({ accountAddress: [] })
					this.setState({ loading: true })
					if (window.web3) {
						window.web3 = new Web3(window.web3.currentProvider)
						await window.ethereum.enable()
					}

					//load data
					const accounts = await web3.eth.getAccounts()
					this.setState({ account: accounts[0] })
					this.setState({ accountAddress: [] })
					await this.auth()

				}
				catch (err) {
					switch (err.code) {
						case 4001:
							this.setState({ loading: false })
							toast.error("User reject connect !")
							break;
						case -32002:
							this.setState({ loading: false })
							toast.error("Please unlock MetaMask !")
							break;
						case -32603:
							this.setState({ loading: false })
							toast.error("Failed to fetch!")
							break;
					}
				}
			}
		}
		catch (e) {

		}
	};
	setAccountAddress(){
		if(this.state.accountaddress !==[]){
			this.setState({accountaddress:[]})
		}
	}
	async auth() {
		this.setState({accountaddress:[]})
		// getAccount
		const accountCount = await contractBN.methods.accountCount().call()
		for (var i = 1; i <= accountCount; i++) {
			let account = await contractBN.methods.account(i).call()
			this.setState({ accountaddress: [...this.state.accountaddress, account] })
		}
		let accountAddress = this.state.accountaddress
		if (accountAddress === '') {
			//   window.location.assign("http://localhost:3000/register")
			this.setState({ loading: false })
			this.setState({ reg: true })
		}
		else {
			let checkAuth = accountAddress.filter(address => address.author === this.state.account)
			if (checkAuth.length === 0) {
				this.setState({ loading: false })
				this.setState({ reg: true })
			}
			else {
				this.setState({ authen: true })
				this.setState({ loading: false })
				this.setState({ reg: false })
			}
		}
	}
	async changeAccount() {
		this.setState({ loading: true })
		const accounts = window.web3.eth.getAccounts()
		this.setState({ account: accounts[0],
			loading: false })
		// this.setState({ loading: false })

	}
	async logOut() {
		// window.location.reload();
		this.setState({
			authen:false,
			account:[]
		})
		
	}
	async checkAccount() {
		if (window.web3) {
			window.ethereum.on('accountsChanged', () => {
				
				if(this.state.account !==''){
					this.changeAccount().then(()=>{window.location.reload()})
				}
				
			});
			window.ethereum.on('chainChanged', () => {
				this.checkNetwork()
				this.setState({
					 accountaddress: [],
					authen: false })
				// this.setState({ authen: false })
			});
		}
		else {
		}

	}
	async checkNetwork() {
		// const web3 = window.web3
		const netID = await web3.eth.net.getId()
		this.setState({ networkData: netID })
		if (this.state.networkData === 4) {
			const postCount = await contractBN.methods.postCount().call()
			for (var i = 1; i <= postCount; i++) {
				const post = await contractBN.methods.posts(i).call()
				this.setState({ posts: [...this.state.posts, post] })

			}
			this.setState({
				posts: this.state.posts.sort((a, b) => b.createtime - a.createtime)
			})
		}
		else {
			toast.warn("Blockchain Blog không được xây dựng trên mạng này ! \n Hãy kết nối với mạng Rinkeby")
			const postCount = await contractBN.methods.postCount().call()
			for (var i = 1; i <= postCount; i++) {
				const post = await contractBN.methods.posts(i).call()
				this.setState({ posts: [...this.state.posts, post] })

			}
			this.setState({
				posts: this.state.posts.sort((a, b) => b.createtime - a.createtime)
			})
		}
		// else {
		// 	const netID = await web3.eth.net.getId()
		// 	// const netData = BlogNetwork.networks[netID]
		// 	this.setState({ networkData: netID })
		// 	console.log(">>>>>>>>>>>>>>id",web3.eth.net.getId())
		// 	if (netID) {
		// 		const postCount = await contractBN.methods.postCount().call()
		// 		for (var i = 1; i <= postCount; i++) {
		// 			const post = await contractBN.methods.posts(i).call()
		// 			this.setState({ posts: [...this.state.posts, post] })

		// 		}
		// 		this.setState({
		// 			posts: this.state.posts.sort((a, b) => b.createtime - a.createtime)
		// 		})

		// 	}
		// 	else {
		// 		const postCount = await contractBN.methods.postCount().call()
		// 		for (var i = 1; i <= postCount; i++) {
		// 			const post = await contractBN.methods.posts(i).call()
		// 			this.setState({ posts: [...this.state.posts, post] })

		// 		}
		// 		this.setState({
		// 			posts: this.state.posts.sort((a, b) => b.createtime - a.createtime)
		// 		})
		// 		toast.warn("Blockchain Blog không được xây dựng trên mạng này ! \n Hãy kết nối với mạng Rinkeby")
		// 	}
		// }
	}

	async loadPost() {
		this.setState({ 
			loading: false,
			posts: [],
			// accountaddress: []
		 })
		// this.setState({ posts: [] })
		// this.setState({ authsuccess: [] })
		if (window.ethereum) {
			const postCount = await contractBN.methods.postCount().call()
			if (this.state.account === '') {
				for (var i = 1; i <= postCount; i++) {
					const post = await contractBN.methods.posts(i).call()
					this.setState({ posts: [...this.state.posts, post] })

				}
				// this.setState({
				// 	posts: this.state.posts.sort((a, b) => b.createtime - a.createtime)
				// })
			}
			else {
				for (var i = 1; i <= postCount; i++) {
					const post = await contractBN.methods.posts(i).call()
					this.setState({ posts: [...this.state.posts, post] })
				}
				// this.setState({
				// 	posts: this.state.posts.sort((a, b) => b.createtime - a.createtime)
				// })
			}
		}
		else { console.log("thì thôi") }
		this.setState({
					posts: this.state.posts.sort((a, b) => b.createtime - a.createtime)
				})
	}
	async newPost(){
		this.setState({
			posts: this.state.posts.sort((a, b) => b.createtime - a.createtime)
		})
		console.log(this.state.posts)
	}
	async tiph() {
		this.setState({
					posts: this.state.posts.sort((a, b) => b.tipAmount - a.tipAmount)
				})
	}
	async tipl() {
		this.setState({
			posts: this.state.posts.sort((a, b) => a.tipAmount - b.tipAmount)
		})
	}
	async write() {
		this.setState({ loading: true })
		if (this.state.networkData) {
			this.setState({ loading: false })
		}
		else {
			toast.warn("Blockchain Blog không được xây dựng trên mạng này ! \n Hãy kết nối với mạng Rinkeby")
			console.log(this.state.networkData)
			this.setState({ loading: false })

		}
	}
	async checkwriteAccount() {
		// this.setState({ loading: true })
		if (!this.state.account && this.state.authen === false) {
			toast.warn("Hãy đăng nhập để sử dụng chức năng này !!!")
			this.setState({ loading: false })
		}
		else {
			// this.setState({ loading: false })
			if (this.state.account && this.state.authen === false) {
				toast.warn("Hãy đăng nhập để sử dụng chức năng này !!!")
			}

		}
	}
	async componentWillUnmount() {

		clearTimeout()
	}
	async componentDidMount() {
		await this.checkAccount()
		await this.checkNetwork()
		await this.loadPost()
		await this.checkWeb3()
		this.setState({ accountAddress: [] , posts:[]})
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


	avatarHandler = (e) => {
		e.preventDefault()
		const reader = new FileReader();
		reader.readAsArrayBuffer(e.target.files[0])
		if (e.target.files && e.target.files.length > 0) {
			this.setState({ avatar: (URL.createObjectURL(e.target.files[0])) })
			console.log(this.state.avatar)
		}
		reader.onload = () => {
			if (reader.readyState === 2) {
				this.setState({ buffer: Buffer(reader.result) })
				console.log(this.state.buffer)
			}
			// if(this.state.buffer !==null){
			// 	ipfs.add(this.state.buffer).then((result, error) => {
			// 		console.log('Ipfs result', result)
			// 	})
			// }
		}

	}

	createAccount(name, email) {
		if (this.state.buffer === null) {
			try {
				this.setState({ loading: true })
				contractBN.methods.createAccount(hashAvatar, name, email).send({ from: this.state.account }).on('transactionHash', (hash) => {
					toast.info("Your register in processing...")
					this.setState({ buffer: null })
				}).catch((e) => {
					if (e.code === 4001) {
						toast.warn("User reject ")
						this.setState({ loading: false })
					}
				})
			}
			catch {
			}
		}
		else {
			ipfs.add(this.state.buffer).then((result, error) => {
				if (error) {
					return (result)
				}
				this.setState({ loading: true })
				contractBN.methods.createAccount(result.path, name, email).send({ from: this.state.account }).on('transactionHash', (hash) => {
					toast.info("Your register in processing...")
					this.setState({ avatar: `https://ipfs.infura.io/ipfs/${hashAvatar}` })
					this.setState({ loading: false })
					this.setState({ buffer: null })
				}).catch((e) => {
					if (e.code === 4001) {
						toast.warn("User reject...")
						this.setState({ loading: false })
					}
				})
			})
		}

	}
	// upload img to ipfs
	createPost(title, content) {
		let done = false
		ipfs.add(this.state.buffer).then((result, error) => {
			console.log('Ipfs result', result)
			if (error) {
				console.error(error)
				return
			}
			this.setState({ loading: true })
			// contractBN.methods.createPost(result.path, title, content).send({ from: this.state.account }).on('transactionHash', (hash) => {

			// 	toast.info("Bài viết của bạn đang trong quá trình xử lý")
			// 	// this.state.history.push("/")
			// 	this.setState({ loading: false })
			// 	this.setState({ showImg: "https://www.viet247.net/images/noimage_food_viet247.jpg" })
			// 	this.setState({ buffer: null })
			// })
			contractBN.methods.createPost(result.path, title, content).send({ from: this.state.account }).on('transactionHash', (hash) => {
				toast.info("Your post is being processed")
				contractIFR.events.PostCreated({ filter: {}, fromBlock: 'latest' },
					function () {
						done = true
					})
			})
				.then(() => {
					if (done === true) {
						this.loadPost()
						setTimeout(() => {
							toast.success("Your post has been published !")
							this.setState({ loading: false })
							this.setState({ showImg: "https://www.viet247.net/images/noimage_food_viet247.jpg" })
							this.setState({ buffer: null })
						}, 2000)

					}
				})
				.catch((error) => {
					if (error.code === 4001) {
						toast.warn("User reject")
						this.setState({ loading: false })
					}
				})
		})
	}
	tipPost(id, tipAmount) {
		let done = false
		try {
			contractBN.methods.tipPost(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
				contractIFR.events.PostTipped({ filter: {}, fromBlock: 'latest' },
					function () {
						done = true
					})
			})
				.then(() => {
					if (done === true) {
						this.loadPost()
						setTimeout(() => {
							toast.success("Your tip has been sent")
							this.setState({ loading: false })
						}, 1000)

					}
				})
				.catch((error) => {
					if (error.code === 4001) {
						toast.warn("User reject")
						this.setState({ loading: false })
					}
				})



		} catch (error) {

			this.setState({ loading: false })
		}

	}

	setLoading() {
		if (this.state.loading) {
			this.setState({ loading: false })
		}
		else {
			this.setState({ loading: true })
		}
	}
	updatePost(id, hash, title, content) {
		let done = false
		console.log("update")
		if (this.state.buffer == null) {
			this.setState({ loading: true })
			// contractBN.methods.updatePost(id, hash, title, content).send({ from: this.state.account }).on('transactionHash', (hash) => {
			// 	contractIFR.events.PostUpdated({ filter: {}, fromBlock: 'latest' }, function (error, data) {
			// 		if (error) { console.log(error) }
			// 		else {
			// 			toast.success("Bài viết của bạn đã được sửa !!!")
			// 		}
			// 	})
			// 	console.log("update không đổi hình")

			// })

			contractBN.methods.updatePost(id, hash, title, content).send({ from: this.state.account }).on('transactionHash', (hash) => {
				contractIFR.events.PostTipped({ filter: {}, fromBlock: 'latest' },
					function () {
						done = true
					})
			})
				.then(() => {
					if (done === true) {
						this.loadPost()
						setTimeout(() => {
							toast.success("Your post has been updated !")
							this.setState({ loading: false })
						}, 4000)

					}
				})
				.catch((error) => {
					if (error.code === 4001) {
						toast.warn("User reject")
						this.setState({ loading: false })
					}
				})

		}
		else {
			ipfs.add(this.state.buffer).then((result, error) => {
				console.log('Ipfs result', result)
				this.setState({ loading: true })
				// contractBN.methods.updatePost(id, result.path, title, content).send({ from: this.state.account }).on('transactionHash', (hash) => {
				// 	contractIFR.events.PostUpdated({ filter: {}, fromBlock: 'latest' }, function (error, data) {
				// 		if (error) { console.log(error) }
				// 		else {
				// 			toast.success("Bài viết của bạn đã được sửa !!!")
				// 		}
				// 	})
				// })
				// console.log("update  đổi hình")



				contractBN.methods.updatePost(id, hash, title, content).send({ from: this.state.account }).on('transactionHash', (hash) => {
					contractIFR.events.PostTipped({ filter: {}, fromBlock: 'latest' },
						function () {
							done = true
						})
				})
					.then(() => {
						if (done === true) {
							this.loadPost()
							setTimeout(() => {
								toast.success("Your post has been updated !")
								this.setState({ loading: false })
							}, 4000)
	
						}
					})
					.catch((error) => {
						if (error.code === 4001) {
							toast.warn("User reject")
							this.setState({ loading: false })
						}
					})
			})
		}
	}
	resetModalRegiter() {
		this.setState({ openModalRegister: true })
	}
	
	render() {

		return (
			<Router>
				<ScrollToTop smooth />
				<TopBar
				setAccountAddress={this.setAccountAddress}
					accountaddress={this.state.accountaddress}
					resetModalRegiter={this.resetModalRegiter}
					authen={this.state.authen}
					logOut={this.logOut}
					write={this.write}
					checkwriteAccount={this.checkwriteAccount}
					account={this.state.account}
					loadPost={this.loadPost}
				/>
				<ToastContainer autoClose={2000} />
				{this.state.web3
					? <>

						<Route path="/profile" exact>
							{this.state.authen
								? <Profile />
								: <Loading authen={this.state.authen} />
							}
						</Route>
						<Route path="/profile/:string" exact>
							<ProfileUser
							setLoading={this.setLoading}
							accountaddress={this.state.accountaddress}
							posts={this.state.posts}
							tipPost={this.tipPost}
							account={this.state.account}
							write={this.write}
							checkwriteAccount={this.checkwriteAccount}
							tiph={this.tiph}
							tipl={this.tipl}
							loadPost={this.loadPost}
							/>
						</Route>
						<Route path="/register">
							<Register
								loading={this.state.loading}
								createAccount={this.createAccount}
								avatar={this.state.avatar}
								avatarHandler={this.avatarHandler}
								authen={this.state.authen}
								account={this.state.account}
								reg={this.state.reg} />
						</Route>
						<Route path="/login">
							<Login
							setAccountAddress={this.setAccountAddress}
								authen={this.state.authen}
								loading={this.state.loading}
								openModalRegister={this.state.openModalRegister}
								reg={this.state.reg}
								auth={this.auth}
								account={this.state.account}
								connectMetaMask={this.connectMetaMask} />
						</Route>




						<Route path="/write">
							{this.state.loading
								? <Loading />
								: this.state.authen
									? <Write
										hash={this.state.hash}
										networkData={this.state.networkData}
										account={this.state.account}
										imageHandler={this.imageHandler}
										createPost={this.createPost}
										showImg={this.state.showImg}
									/>
									: <Loading authen={this.state.authen} />

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
							{this.state.authen
								?
								<Update
									setLoading={this.setLoading}

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

								: <Loading authen={this.state.authen} />
							}
						</Route>
						<Route path="/mypost" >
							{this.state.authen
								?this.state.loading
								? <Loading authen={this.state.authen} />
								:<MyPosts
									setLoading={this.setLoading}
									authen={this.state.authen}
									posts={this.state.posts}
									contractBN={this.state.contractBN}
									account={this.state.account}
									checkwriteAccount={this.checkwriteAccount}
									tiph={this.tiph}
									tipl={this.tipl}
									loadPost={this.loadPost}
									tipPost={this.tipPost}
									loading={this.state.loading}
								/>
								: <Loading authen={this.state.authen} />
							}
						</Route>
					</>
					: <InstallWeb3 />
				}
				<Route path="/" exact>
					{this.state.loading
						? <Loading authen={this.state.authen} />
						: <Home
						newPost={this.newPost}
							setLoading={this.setLoading}
							accountaddress={this.state.accountaddress}
							posts={this.state.posts}
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

				<Footer />
			</Router>
		);
	}

}

export default App;
