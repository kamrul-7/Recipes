import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUserEmail, setLoginUserEmail] = useState('');

  const onFinish = async (values) => {
    try {
      const result = await signIn(values.email, values.password);
      const user = result.user;
      toast.success('User Login Successful');
      console.log(user);
      setLoginUserEmail(values.email);

      // Retrieve last location from local storage
      const lastLocation = localStorage.getItem('lastLocation');

      // Navigate to the last location or the home page if it's the first login
      navigate(lastLocation || '/');
    } catch (error) {
      console.error(error.message);
      setLoginError(error.message);
    }
  };

  return (
    <div>
      <div className='mb-20 h-20 bg-black'></div>
      <div style={{ marginLeft:'25%',marginBottom:'20px' }}>
        <h3>Login</h3>
      </div>
      <div style={{ width:'60%'}}>
        <Form
          name="normal_login bg"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
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
         
           
          <Form.Item className='text-white'>
            <Button type="primary" danger htmlType="submit" className="login-form-button mr-8">
            Log in
            </Button> 
           OR
            <a href="/register" className='text-blue-600 ml-8'> register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
