import "./loading.css"
import React,{Component} from 'react'
import { toast } from "react-toastify";
import {withRouter} from 'react-router'

class Loading extends Component{


    checkPathName(){
        let pathname = window.location.pathname.slice(1)
        if(this.props.authen===false)
        {
            switch(pathname) {
            case "profile":
            case "write":
            case "mypost":
                toast.warn("Please go to login")
                // setTimeout(()=>{this.props.history.push("/login")},3000)
              break;
           
            default:
             break;
          }
        }
        
    }

    componentDidMount(){
        this.checkPathName()
    }
    componentWillUnmount(){
        clearTimeout(this.checkPathName)
    }
    render(){
        return (
            <>
            
            <div className="loader lr">
            <div className="outer"></div>
            <div className="middle"></div>
            <div className="inner"></div>
            </div>
            </>
          )
    }
 
}

export default withRouter(Loading)
