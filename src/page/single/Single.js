import SinglePost from "../../components/singlePost/singlePost"
import "./single.css"
import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import Identicon from 'identicon.js';
import Web3 from 'web3'
import axios from 'axios'
import ModalTip from "../modalTip/ModalTip";
import Loading from '../load/Loading'
import { NavLink } from 'react-router-dom';

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
const owner = contractBN.methods.owner().call()


const provider = new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/d77c48ee4efc48b4b93469a2366bfd52')
const web3_infura = new Web3(provider)
const contractIFR = new web3_infura.eth.Contract(abi, addressSM)

const idp = ''



class Single extends Component {

	constructor(props) {
		super(props)
		this.state = {
			owner: Promise.resolve(owner)
				.then(result => { this.setState({ owner: result }) }),
			id: '',
			isOpenModalTip: false,
			isLoading: false

		}
		this.handleCloseModalTip = this.handleCloseModalTip.bind(this)
		this.tipPoste = this.tipPoste.bind(this)
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

	tipPoste(id, tipAmount) {
		contractBN.methods.tipPost(id).send({ from: this.props.account, value: tipAmount }).on('transactionHash', (hash) => {
			alert("Tiền tip của bạn đã được gửi đi")
			this.handleCloseModalTip()
		})
	}

	deletePost(id) {
		let text = "Are you sure to delete post!";
		if (window.confirm(text) == true) {
			this.setState({ isLoading: true })

			contractBN.methods.deletePost(id).send({ from: this.props.account }).on('transactionHash', (hash) => {
				try {
					contractIFR.events.PostDelete({filter:{}, fromBlock:'latest'}, function(error,data){
						if(error){console.log(error)}
						else{
						  alert("Bài viết của bạn đã được xóa \n Bấm HOME để trở về trang chủ !")
						}})
				}
				catch (error) {
					if (error == 4001) {
						this.setState({ isLoading: false })
					}
				}
			})

		}
	}

	render() {
		const idp = this.props.match.params.id
		return (
			<>
				{this.state.isLoading
					? <Loading />
					: <>
						<ModalTip
							id={this.state.id}
							isOpenModalTip={this.state.isOpenModalTip}
							handleCloseModalTip={this.handleCloseModalTip}
							tipPoste={this.tipPoste}
						/>
						<div className="single">
							{this.props.posts.filter(posts => posts.id == idp).map(posts => (
								<div className="singlePostWrapper">
									<div className="singlePostImgContain">
										<img className="singlePostImg" src={`https://ipfs.infura.io/ipfs/${posts.hash}`} />
									</div>
									<h1 className="singlePostTitle">{posts.title}</h1>
									<div className="singlePostAccountContain">
										<div className="singlePostAccountContainLeft">
											<div className="accountImgContain"><img className="accountImg" src={`data:image/png;base64,${new Identicon(posts.author, 35).toString()}`} /></div>
											<div className="accountAddress"><b>{posts.author}</b></div>
										</div>
										<div className="singlePostAccountContainCenter">
											{this.props.account == posts.author
												?	<NavLink className="link " to={`/update/${posts.id}`}>
														<i class="fa-solid fa-pen-to-square"></i>
													</NavLink>
											: <></>
											}
											{this.props.account == posts.author || this.props.account == this.state.owner
												? <NavLink className="link" to="#"><i onClick={() => { this.deletePost(posts.id) }} class="fa-solid fa-trash-can"></i></NavLink>
												: <></>
											}

										</div>

										<div className="singlePostAccountContainRight">
											<div className="tipCount">TIPS:  {(posts.tipAmount) / fromWei}  ETH</div>
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
									<div className="singlePostContent">{posts.content}</div>
								</div>
							))}
						</div>
					</>
				}

			</>
		)
	}
}
export default withRouter(Single) 