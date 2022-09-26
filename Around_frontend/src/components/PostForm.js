import React, {forwardRef} from "react";
import { Form, Input, Upload } from 'antd';
import { InboxOutlined} from '@ant-design/icons'

// refer to https://ant.design/components/form/
// refer to https://ant.design/components/upload/
const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  
const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e?.fileList;
  };

export const PostForm = forwardRef ( (props, formRef) => {
    console.log('props -> ', props);
    console.log('ref -> ', formRef);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };

    return (       
       <Form
            ref={formRef}
            name="validate_other"
            {...formItemLayout}
            //onFinish={onFinish}      
        > 
            <Form.Item
                name="description"
                label="Message"
                //hasFeedback
                rules={[
                    {
                    required: true,
                    message: 'Please input your description!',
                    },
                ]}
            >
                <Input placeholder="please input your message"/>
            </Form.Item>
            <Form.Item label="Dragger">
                <Form.Item name="uploadPost" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" 
                                    beforeUpload={() => false}  
                                    >
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
       </Form>     
     
    );
} )
  

export default PostForm;