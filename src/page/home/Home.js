import Header from '../../components/header/Header'
import Identicon from 'identicon.js';
import "./home.css"
import React,{Component} from 'react'
import { NavLink } from 'react-router-dom';
import ModalTip from '../modalTip/ModalTip';
import Web3 from 'web3'

const fromWei = 1000000000000000000
// tạo abi , addressSM
const abi =[
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
const contractBN = new web3.eth.Contract(abi,addressSM)
class Home extends Component {
  constructor(props){
    super(props)
    this.state= {
      account: this.props.account,
      id:'',
      isOpenModalTip: false,
      
    }
    this.handleCloseModalTip= this.handleCloseModalTip.bind(this)
    this.tipPoste= this.tipPoste.bind(this)
  }
  handleOpenModalTip=(_id)=>{
    this.setState({id:_id})
    this.setState({
      isOpenModalTip:true
    })
    
  }
  handleCloseModalTip(){
    this.setState({
      isOpenModalTip:false
    })
  }

  tipPoste(id, tipAmount){
    contractBN.methods.tipPost(id).send({from: this.state.account, value: tipAmount}).on('transactionHash',(hash)=>{
          alert("Tiền tip của bạn đã được gửi đi")
          this.handleCloseModalTip()
    })
   }

  render(){
    return (
      <>
      <ModalTip 
        id={this.state.id}
        isOpenModalTip={this.state.isOpenModalTip}
        handleCloseModalTip={this.handleCloseModalTip}
        tipPoste={this.tipPoste}
      />
      <Header />
      <div id='home' className="home">
        
        <div className="filter">
                    <button onClick={()=>{this.props.tiph()}} className="tiph">TIPS từ cao đến thấp</button>
                    <button onClick={()=>{this.props.tipl()}} className="tipl">TIPS từ thấp đến cao</button>
                    <button onClick={()=>{this.props.loadPost()}} className="pnew">Bài viết gần đây</button>
        </div>
         {this.props.posts.filter(post => post.id != 0).map((post)=>{
           return(
            <div  className="post" key={post.id}>
              <NavLink className="link" to={`/single/${post.id}`}>
                <div className="accountContain">
                  <div className ="accountImgContain"><img className ="accountImg" src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}/></div>
                  <div className ="accountAddress">{post.author}</div>
               </div>
                <img className="postImg" src ={`https://ipfs.infura.io/ipfs/${post.hash}`}/>
                <div className="postInfo">
                    <div className="postTitle">{post.title}</div>
                    <div className="postContent">{post.content}</div>
                </div>
              </NavLink>
              <div className ="tipContain">
                  <div className="tipCount">TIPS: {(post.tipAmount)/fromWei} ETH</div>
                  {this.props.account
                    ?<button onClick={(event)=>{
                        this.handleOpenModalTip(post.id)
                    }} 
                      name={post.id}
                      className="tipAction">TIP</button>
                    :<button onClick={()=>{this.props.checkwriteAccount()}}
                    className="tipAction">TIP</button>
                  }
              </div>
          </div>
           )
         })}
      </div>
      </>
   )}
}
export default Home;
