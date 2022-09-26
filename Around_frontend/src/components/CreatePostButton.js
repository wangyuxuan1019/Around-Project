import React, {Component} from 'react';
import { Button, message, Modal } from 'antd';

import PostForm from './PostForm';
import axios from 'axios';
import { BASE_URL, TOKEN_KEY } from "../constants";

// reference -> get virtual element in react
// define: react.createRef() in constructor ||
//         () => {} in tag
// read: myRef.current


// refer to https://ant.design/components/modal/
class CreatePostButton extends Component {
    state = {
        visible: false,
        confirmLoading: false
    };
    
    showModal = () => {
        this.setState({visible: true});
    };
    
    handleOk = () => {
        this.setState({visible: false, confirmLoading: true});
        console.log(this.form);
        // get form data from PostForm
        this.form.validateFields()
                 .then( values => { 
                    console.log('values -> ', values)
                    // step1: creat post file obj
                    // step2: send file obj to the server
                    // step3: analyze the response fromt he server
                    //   case1: successful
                    //   case2: failure
                    const { description, uploadPost } = values;
                    const { originFileObj, type } = uploadPost[0];
                    const postType = type.match(/^(image|video)/g)[0];
                    if (postType) {
                        let formData = new FormData();
                        // refer to https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
                        formData.append("message", description);
                        formData.append("media_file", originFileObj);
                        console.log('formData -> ', formData.get("message"))
                        const opt = {
                            method: "POST",
                            url: `${BASE_URL}/upload`,
                            headers: {Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`},
                            data: formData
                        };

                        axios(opt)
                           .then((res) => {
                            // reset form fields
                            // inform users
                            // refresh post list section

                             if (res.status === 200) {
                                message.success("The image/video is uploaded!");
                                this.form.resetFields();
                                this.handleCancel();
                                this.props.onShowPost(postType);
                                this.setState({ confirmLoading: false });
                             }
                           })
                           .catch((err) => {
                                console.log("Upload image/video failed: ", err.message);
                                message.error("Failed to upload image/video!");
                                this.setState({ confirmLoading: false });
                           });
                    }
                 })
                 .catch( err => {
                    console.log('err ->', err)
                    this.form.resetFields();
                    this.handleCancel();
                    message.error("Failed to upload image/video!");
                    this.setState({ confirmLoading: false });
                 })
    };
    
    handleCancel = () => {
        this.setState({visible: false});
    };

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary"                         
                        onClick={this.showModal}>
                    Creat New Post
                </Button>
                <Modal title="Creat New Post" 
                       okText="create"
                       visible={visible} 
                       onOk={this.handleOk} 
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}>
                    <PostForm ref={ postFormInstance => {
                        console.log("post instance -> ", postFormInstance)
                        this.form = postFormInstance;
                    }}/>
                </Modal>
            </div>
        );
    }
}

export default CreatePostButton;