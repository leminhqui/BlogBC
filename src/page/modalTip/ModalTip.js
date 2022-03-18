import React ,{Component} from "react";
import './modaltip.css'
import Web3 from 'web3'
class  ModalTip extends Component{
  constructor(props){
    super(props)
    this.state= {
      tipInput:''
    }
  }
  

  render(){
    return (
      <>
      {this.props.isOpenModalTip
        ? <div className="modalTipContain ">
            <div className="modalContainer">
                <h1 className="modalTitle">How much would you like to tip?</h1>
                <input
                    onChange={event=> this.setState({tipInput: event.target.value})}
                    id="modalTip" type="text" placeholder="0.01 ETH" className="tipInput" 
                    autoFocus={true} required/>
                <div className="modalButtonContain"> 
                <button className="tipSend"
                  onClick={(event)=>{
                      let tipAmount = window.web3.utils.toWei(this.state.tipInput, 'Ether')
                      this.props.tipPoste(this.props.id, tipAmount)
                  }} 
                
                >OK</button>
                <button className="tipCancel" onClick={()=>{this.props.handleCloseModalTip()}}>Cancel</button>
                </div>
            </div>
          </div>
        :<></>
      }
      
      </>
    )
 }
}
export default ModalTip
