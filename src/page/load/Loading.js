import "./loading.css"
import React,{Component} from 'react'

class Loading extends Component{
    render(){
        return (
            <>
            <div className="loader">
            <div className="outer"></div>
            <div className="middle"></div>
            <div className="inner"></div>
            </div>
            </>
          )
    }
 
}

export default Loading