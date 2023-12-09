/* eslint-disable quotes */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Card, Form, Input, Button } from 'antd';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import realWorldApiService from '../../utils/realWorldApiSevice';
import './Profile.css';

function Profile() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [successMessage]);
  const signUpSchema = z.object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(20, { message: "Username can't be longer than 20 characters" }),
    email: z.string().email(),
    bio: z.string().max(40, { message: "Password can't be longer than 40 characters" }),
    image: z.string(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({ resolver: zodResolver(signUpSchema) });
  const onSubmit = async (data) => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    let apiService = new realWorldApiService();
    const response = await apiService.editProfile(
      JSON.stringify({ user: { username: data.username, email: data.email, bio: data.bio, image: data.image } }),
      user.user.token
    );
    const responseData = await response.json();
    if (!response.ok) {
      setErrorMessage('Error number is ' + response.status);
      if (responseData.errors) {
        const errors = responseData.errors;
        if (errors.username) {
          setError('username', { type: 'server', message: errors.username });
        } else if (errors.email) {
          setError('email', { type: 'server', message: errors.email });
        } else if (errors.bio) {
          setError('bio', { type: 'server', message: errors.bio });
        } else if (errors.image) {
          setError('image', { type: 'server', message: errors.image });
        }
      }
      return;
    } else {
      setErrorMessage(null);
      localStorage.setItem('user', JSON.stringify(responseData));
      setSuccessMessage('Profile was successfully edited you will be redirected after 2 seconds');
      reset();
    }
  };
  return (
    <div className="sign-up-form">
      <Card className="sign-in-form--width">
        <h2 className="sign-up-form__header">Edit Profile</h2>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Form.Item label="Username">
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Username" />}
            />
            {errors.username && <p className="form-error-message">{errors.username.message}</p>}
          </Form.Item>
          <Form.Item label="Email">
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Email" />}
            />
            {errors.email && <p className="form-error-message">{errors.email.message}</p>}
          </Form.Item>
          <Form.Item label="Bio">
            <Controller name="bio" control={control} render={({ field }) => <Input {...field} placeholder="Bio" />} />
            {errors.bio && <p className="form-error-message">{errors.bio.message}</p>}
          </Form.Item>
          <Form.Item label="Image">
            <Controller
              name="image"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Image" />}
            />
            {errors.image && <p className="form-error-message">{errors.image.message}</p>}
          </Form.Item>
          <Form.Item>
            <Button className="sign-up-form__submitBtn" type="primary" htmlType="submit" disabled={isSubmitting}>
              Save
            </Button>
          </Form.Item>
          {errorMessage ? <p className="form-error-message form-message--align-center">{errorMessage}</p> : null}
          {successMessage ? <p className="form-success-message form-message--align-center">{successMessage}</p> : null}
        </Form>
      </Card>
    </div>
  );
}
export default Profile;
