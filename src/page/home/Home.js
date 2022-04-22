import Header from '../../components/header/Header'
import Identicon from 'identicon.js';
import "./home.css"
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import ModalTip from '../modalTip/ModalTip';
import Web3 from 'web3'

const fromWei = 1000000000000000000
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
class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			account: this.props.account,
			id: '',
			isOpenModalTip: false,
			accountaddress: [],
			loading:false

		}
		this.handleCloseModalTip = this.handleCloseModalTip.bind(this)
		this.tipPost = this.tipPost.bind(this)
		this.loadInfo = this.loadInfo.bind(this)
		this.check = this.check.bind(this)
	}
	check(){
		console.log(this.props.posts,"<<<<from home ")
	}

	handleOpenModalTip = (_id) => {
		this.setState({ id: _id })
		this.setState({
			isOpenModalTip: true
		})

	}
	handleCloseModalTip() {
		this.setState({
			isOpenModalTip: false
		})
	}

	tipPost(id, tipAmount) {
		this.props.setLoading()
		this.props.tipPost(id,tipAmount)
	}
	async loadInfo() {
		const accountCount = await contractBN.methods.accountCount().call()
		for (var i = 1; i <= accountCount; i++) {
			let account = await contractBN.methods.account(i).call()
			this.setState({ accountaddress: [...this.state.accountaddress, account] })
		}
	}
	async componentDidMount() {
		await this.loadInfo()

	}

	render() {
		return (
			<>
				<ModalTip
					loading={this.props.loading}
					id={this.state.id}
					isOpenModalTip={this.state.isOpenModalTip}
					handleCloseModalTip={this.handleCloseModalTip}
					tipPost={this.tipPost}
				/>
				<Header />
				<div id='home' className="home">

					<div className="filter-home">
						<button onClick={() => { this.props.tiph() }} className="tiph">TIPS từ cao đến thấp</button>
						<button onClick={() => { this.props.tipl() }} className="tipl">TIPS từ thấp đến cao</button>
						<button onClick={() => { this.props.newPost() }} className="pnew">Bài viết gần đây</button>
					</div>
					<div className='post-home-container'>
					{this.props.posts.filter(post => post.id != 0).map((post) => {
						return (
							<div className="post-home" key={post.id}>

								{this.state.accountaddress.filter(getInfo => getInfo.author === post.author).map(info =>

									<>
										<NavLink onClick={()=>this.check()} className="link" to={`/profile/${info.name}`}>
											<div className="accountContain">
												<div className="accountImgContain">
													<img className="accountImg"
														src={`https://ipfs.infura.io/ipfs/${info.hash}`} />
												</div>
												<div className="accountAddress home">{info.name}</div>
											</div>
										</NavLink>
									</>
								)}



								<NavLink className="link" to={`/single/${post.id}`}>
									<img className="postImg" src={`https://ipfs.infura.io/ipfs/${post.hash}`} />
									<div className="postInfo">
										<div className="postTitle">{post.title}</div>
										<div className="postContent">{post.content}</div>
									</div>
								</NavLink>
								<div className="tipContain">
									<div className="tipCount">TIPS: {(post.tipAmount) / fromWei} ETH</div>
									{this.props.account
										? <button onClick={(event) => {
											this.handleOpenModalTip(post.id)
										}}
											name={post.id}
											className="tipAction">TIP</button>
										: <button onClick={() => { this.props.checkwriteAccount() }}
											className="tipAction">TIP</button>
									}
								</div>
							</div>
						)
					})}
					</div>
				</div>
			</>
		)
	}
}
export default Home;
