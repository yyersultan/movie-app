import styles from './Login.module.css';
import { Form, Input, Button, Typography } from 'antd';
import {API_KEY3, instance as axios} from '../../api/api'
import { useState } from 'react';
import { Redirect } from 'react-router';

const {Text} = Typography
export const Login = ({updateUser,isLogged,updateSessionId}) => {
    const[state,setState] = useState({
        submitBtn : false,
        statusError : ''
    })
    
    const onFinish = async (values) => {
        try {
            setState({
                ...state, submitBtn : true
            })
            const response1 = await axios.get(`/authentication/token/new?api_key=${API_KEY3}`);
            const response2 = await 
            axios.post(`/authentication/token/validate_with_login?api_key=${API_KEY3}`,
                        {
                            username : values.username,
                            password : values.password,
                            request_token : response1.data.request_token
                        }
            )

            const response3 = await axios.post(`/authentication/session/new?api_key=${API_KEY3}`,
                                            {
                                                request_token : response2.data.request_token
            })
            updateSessionId(response3.data.session_id);     
            const response4 = await axios.get(`/account?api_key=${API_KEY3}&session_id=${response3.data.session_id}`);
            
            updateUser(response4.data);
              
            setState({
                ...state,
                submitBtn : false
            })
            // REDIRECT TO USER PAGE
            if(response4.statusText){
                <Redirect to = "/user" />
            }
        }catch (e){
            setState({
                ...state,submitBtn : false,
                statusError : 'username or password incorrect'
            })
        }
      };

     
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    if(isLogged){
        return <Redirect to = "/user"/>
    }

    return (
        <div className = {styles.login_form}>
            <div className = {styles.login_paper}>
                <Form
                    name = "login"
                    labelCol = {{span : 8}}
                    wrapperCol = {{span:16}}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item 
                        label = "Username"
                        name = "username"
                        rules = {[
                            {
                                required : true,
                                message : "Please input your name"
                            },
                            
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label = "Password"
                        name = "password"
                        rules = {[
                            {
                                required : true,
                                message : 'Please input password'
                            },
                            
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button loading ={state.submitBtn} type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                    <div
                    >
                        <Text  type = 'danger' >{state.statusError}</Text>
                    </div>

                </Form>
            </div>
        </div>
    )
}