import "./write.css"
import React,{ Component, useState  }  from 'react'




class Write extends Component {



render(){
        return (
        <div className="write">
            <form  className="writeForm"
                onSubmit={(event)=>{
                    event.preventDefault()
                    const title= this.postTitle.value;
                    const content = this.postContent.value;
                    this.props.createPost(title, content);
                }}>
                <div className="writeImgContain">
                <img className="writeImg" src={this.props.showImg} />
                </div>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-image"></i>
                    </label>
                    <input type="file" id="fileInput" name="image-upload" accept="image/*" style={{display:"none"}}  onChange={this.props.imageHandler} />
                    <input
                        id="postTitle" type="text" placeholder="Title your story" className="writeInput" 
                        ref={(input) => {this.postTitle=input}}
                        autoFocus={true} required/>
                </div>
                <div className="writeFormGroup">
                    <textarea
                        id="postContent" type="text" placeholder="Tell your story..." className="writeInput writeText" 
                        ref={(textarea)=> {this.postContent=textarea}}
                        required></textarea>
                </div>
                <button type="submit" className="writeSubmit">Share</button>
            </form>
        </div>
    )
}
}
export default Write;