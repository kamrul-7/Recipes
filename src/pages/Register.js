import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { LinkOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'react-hot-toast';

const SignIn = () => {
  const [error, setError] = useState('');
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const result = await createUser(values.email, values.password);
      const user = result.user;
      setError('');
      await handleUpdateUserProfile(values.name, values.photoURL);
      toast.success('Please verify your email address.');
      // Navigate to home page after successful registration
      navigate('/');
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  const handleUpdateUserProfile = async (name, photoURL) => {
    const profile = {
      displayName: name,
      photoURL: photoURL,
    };

    try {
      await updateUserProfile(profile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
     <div className='mb-20 h-20 bg-black'></div>
<div style={{ marginLeft:'25%',marginBottom:'20px' }}>
  <h3>Register</h3>
</div>

      <div style={{ width:'60%'}}>
        <Form
          name='name'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email address!',
              },
            ]}
          >
            <Input prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Email' />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Password' />
          </Form.Item>

          <Form.Item
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
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
            <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Confirm Password' />
          </Form.Item>

          <Form.Item
            name='photoURL'
            rules={[
              {
                required: true,
                message: 'Please input your Photo URL!',
              },
            ]}
          >
            <Input prefix={<LinkOutlined className='site-form-item-icon' />} placeholder='Please input your Photo URL!' />
          </Form.Item>

          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox className='text-white'>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item className='text-white'>
            <Button type='primary' danger htmlType='submit' className='login-form-button mr-8'>
              Register
            </Button>
            <span className='text-black'> Or </span>
            <Link to='/login' className='text-blue-600 ml-8 font-bold'>
              Login Now!
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
