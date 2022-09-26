import React from "react";
import { Button, Checkbox, Form, Input, message} from 'antd';

import { BASE_URL } from "../constants";
import axios from "axios";

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
// reference from https://ant.design/components/form/ Registration
function Register(props) {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // step1: get values of username, password
        // step2: send register request to the server
        // step3: get the response from the server
        //   case1: register successfully
        //             -> redirect to /login
        //   case2: register failed
        //             -> inform users
        const { username, password } = values;
        const opt ={
            method: "POST",
            url: `${BASE_URL}/signup`,
            data: {
                username: username,
                password: password
            },
            headers: {"Content-Type": "application/json"}
        }

        axios(opt)
            .then( response => {
            if (response.status === 200) {
                message.success('Registration successfully');
                //refer to https://v5.reactrouter.com/web/api/history
                return props.history.push("/login");
            }
            })
            .catch( error => {
            console.log('register failed: ', error.message);
            message.error('Registration failed');
            })
    }     
      
      
    return (
        <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish} 
        className = "register"    
        >
        <Form.Item
            name="username"
            label="Username"
            rules={[
            {
                required: true,
                message: 'Please input your Username!',
            },          
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="password"
            label="Password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
            hasFeedback
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Please confirm your password!',
            },
            // reference from https://ant.design/components/form/ Registration
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
            }),
            ]}
        >
            <Input.Password />
        </Form.Item>
        
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="register-btn">
            Register
            </Button>
        </Form.Item>
        </Form>
    ); 
}

export default Register;