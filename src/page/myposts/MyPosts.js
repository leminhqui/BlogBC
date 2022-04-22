import React, { Component } from 'react'
import avatar from "../../img/avatar.png"
import banner from "../../img/banner.png"
import { NavLink } from 'react-router-dom';
import Identicon from 'identicon.js';
import "./myposts.css"
import ModalTip from '../modalTip/ModalTip';
import Web3 from 'web3'
import Loading from '../load/Loading';
import { toast } from 'react-toastify';


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

class MyPosts extends Component {

	constructor(props) {
		super(props)
		this.state = {
			account: this.props.account,
			id: '',
			isOpenModalTip: false,
			myPost: '',
			accountaddress: []
		}
		this.handleCloseModalTip = this.handleCloseModalTip.bind(this)
		this.tipPost = this.tipPost.bind(this)
		this.loadInfo = this.loadInfo.bind(this)
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
		this.setState({accountaddress: this.state.accountaddress.filter((item)=> item.author === this.props.account)})
		console.log(">>>>from mypost", this.state.accountaddress)

	}
	async componentDidMount() {
		await this.loadInfo()

	}


	render() {
		return (
			<>
				<ModalTip
					id={this.state.id}
					isOpenModalTip={this.state.isOpenModalTip}
					handleCloseModalTip={this.handleCloseModalTip}
					tipPost={this.tipPost}
					loading={this.props.loading}
				/>
				<div className='MyPosts'>
					<div className="filter-mypost">
						<button onClick={() => { this.props.tiph() }} className="tiph">TIPS từ cao đến thấp</button>
						<button onClick={() => { this.props.tipl() }} className="tipl">TIPS từ thấp đến cao</button>
						<button onClick={() => { this.props.loadPost() }} className="tipl">Bài viết gần đây</button>
					</div>
					<div className='myposts-container'>
					{this.props.posts.filter(posts => posts.author == this.props.account) != []
						? this.props.posts.filter(posts => posts.author == this.props.account).map(posts => (

							<div className="post" key={posts.id}>
								<NavLink className="link" to={`/single/${posts.id}`}>
									{this.state.accountaddress.map(info =>
										<>
												<div className="accountContain">
													<div className="accountImgContain">
														<img className="accountImg"
															src={`https://ipfs.infura.io/ipfs/${info.hash}`} />
													</div>
													<div className="accountAddress home">{info.name}</div>
												</div>
										</>
									)}
									<img className="postImg" src={`https://ipfs.infura.io/ipfs/${posts.hash}`} />
									<div className="postInfo">
										<div className="postTitle">{posts.title}</div>
										<div className="postContent">{posts.content}</div>
									</div>
								</NavLink>
								<div className="tipContain">
									<div className="tipCount">TIPS: {(posts.tipAmount) / fromWei} ETH</div>
									{this.props.account
										? <button onClick={(event) => {
											this.handleOpenModalTip(posts.id)
										}}
											name={posts.id}
											className="tipAction">TIP</button>
										: <button onClick={() => { this.props.checkwriteAccount() }}
											className="tipAction">TIP</button>
									}
								</div>
							</div>
						))
						:
						<>
							<h1>Không có gì ở đây</h1>

						</>

					}
				</div>
				</div>
			</>
		)
	}

}
export default MyPosts;
