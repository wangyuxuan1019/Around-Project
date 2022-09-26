import React from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message} from 'antd';
import axios from "axios";
import { Link } from "react-router-dom";

import { BASE_URL } from "../constants";

// reference from https://ant.design/components/form/ Login Form
// reference from https://github.com/axios/axios
function Login(props) {

    const { handleLoggedIn } = props;

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // step1: get values of username, password
        // Step2: send login request to the server
        // Step3: get the response from the server
        //      case1: login sucessfully
        //                  -> inform Main -> App
        //      case2: login failed
        //                  -> inform users
        // check重名用ajax, fetch是browser自带API
        const {username, password} = values;
        const opt ={
            method: "POST",
            url: `${BASE_URL}/signin`,
            data: {
                username: username,
                password: password
            },
            headers: {"Content-Type": "application/json"}
        }

        axios(opt)
            .then( response => {
                console.log(response);
                if (response.status === 200) {
                    const { data } = response;
                    // inform app component
                    // reference from https://ant.design/components/message/
                    handleLoggedIn(data);
                    message.success("Login successd!")
                }
            })
            .catch(err => {
                console.log("login failed: ", err.message);
                message.error("Login failed!");
            })
 
    };

 return (
    <Form
        name="normal_login"
        className="login-form"
        
        onFinish={onFinish}
        >
        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your Username!',
            },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
            ]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            />
        </Form.Item>
        
        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button> 
            Or <Link to = "/register">register now!</Link>
        </Form.Item>
    </Form>
  );
}

export default Login;