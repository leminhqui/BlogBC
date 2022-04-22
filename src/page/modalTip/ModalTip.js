import React, { Component } from "react";
import './modaltip.css'
import Web3 from 'web3'
import { toast } from 'react-toastify'
import Loading from "../load/Loading";


class ModalTip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tipInput: ''
    }
  }
  tipPost(id) {
    if (this.state.tipInput <= 0 || this.state.tipInput == null || this.state.tipInput == '') {
      toast.error("Please enter another value !!")
    } else {
      let tipAmount = window.web3.utils.toWei(this.state.tipInput, 'Ether')
      this.props.tipPost(id, tipAmount)
    }
  }
  render() {
    return (
      <>
        {this.props.isOpenModalTip
          ? this.props.loading
            ? <Loading />
            :
            <div className="modalTipContain ">
              <div className="modalContainer">
                <h1 className="modalTitle">How much would you like to tip?</h1>
                <input
                  onChange={event => this.setState({ tipInput: event.target.value })}
                  id="modalTip" type="number" placeholder="0.01 ETH" className="tipInput"
                  autoFocus={true} required />
                <div className="modalButtonContain">
                  <button className="tipSend"
                    onClick={(event) => {
                      this.tipPost(this.props.id)
                    }}

                  >OK</button>
                  <button className="tipCancel" onClick={() => { this.props.handleCloseModalTip() }}>Cancel</button>
                </div>
              </div>
            </div>
          : <></>
        }

      </>
    )
  }
}
export default ModalTip
