import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import axios from 'axios'
import Web3 from 'web3'
import "./update.css"
import Loading from '../load/Loading'





class Update extends Component {

    constructor(props) {
        super(props)
        this.state = {
            img: 'https://ipfs.infura.io/ipfs/',
            title: '',
            hash: '',
            content: '',
            posts: []
        }
    }

    componentDidMount() {
        let idp = window.location.pathname.slice(8)
        this.props.posts.filter(post => post.id == idp).map(post => {
            this.setState({ title: post.title })
            this.setState({ content: post.content })
            this.setState({ hash: post.hash })
            this.setState({img: post.hash})
        })
        console.log(this.state.img)
    }
    handleImg() {
        this.setState({ hash: this.props.showImg })
    }


    render() {
        let idp = window.location.pathname.slice(8)

        return (
            <div className="update">
                {this.props.loading
                    ? <Loading />
                    :
                    this.props.posts.filter(post => post.id == idp).map(post => (
                        <form className="writeForm" key={post.id}
                            onSubmit={(event) => {
                                event.preventDefault()
                                const title = this.postTitle.value;
                                const content = this.postContent.value;
                                this.props.updatePost(idp, post.hash, title, content);
                            }}>

                            <div className="writeImgContain">
                                <img className="writeImg" src={`https://ipfs.infura.io/ipfs/${post.hash}`} />
                            </div>
                            <div className="writeFormGroup">
                                <label htmlFor="fileInput">
                                    <i onClick={() => this.handleImg()} className="writeIcon fa-solid fa-image" ></i>
                                </label>
                                <input type="file" id="fileInput" name="image-upload" accept="image/*" style={{ display: "none" }} onChange={this.props.imageHandler} />
                                <input

                                    value={this.state.title}
                                    onChange={(e) => { this.setState({ title: e.target.value }) }}
                                    id="postTitle" type="text" placeholder="Title your story" className="writeInput"
                                    ref={(input) => { this.postTitle = input }}
                                    autoFocus={true} required />
                            </div>
                            <div className="writeFormGroup">
                                <textarea
                                    value={this.state.content}
                                    onChange={(e) => { this.setState({ content: e.target.value }) }}
                                    id="postContent" type="text" placeholder="Tell your story..." className="writeInput writeText"
                                    ref={(textarea) => { this.postContent = textarea }}
                                    required></textarea>
                            </div>
                            <button type="submit" className="writeSubmit">Update</button>
                        </form>
                    ))}
            </div>
        )
    }

}
export default Update;