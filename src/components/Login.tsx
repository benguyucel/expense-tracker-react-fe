 import { Form, Input, Button, Checkbox,Result } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppState } from '../store';
import { login } from '../store/actions/userActions';
import { LoginForm, UserState } from '../types/user';
import showError from '../utilities/ShowError';
import showSuccess from '../utilities/showSuccess';


 function Login() {
     const location =  useLocation();
     const newUser= location.state;
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const {data,loading,error} = useSelector((state:AppState)=>state.user)
     const onFinish = async (values: LoginForm) => {
        dispatch(login(values))
      };
    
      useEffect(() => {
              error && showError(error)
      }, [error])
      useEffect(()=>{
        data.username && showSuccess("You have successfuly logged in!")
      },[data.username])
      useEffect(()=>{
       const token = localStorage.getItem("token")
       if (token) {
          navigate("/")
       }
      },[data])
    return (
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
          <h2>Login Form</h2>
         {newUser && (
            <Result
                status="success"
                title="You Successfully Register"
                subTitle="Now you can login."
                />
         )}
                
        
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
}

export default Login




