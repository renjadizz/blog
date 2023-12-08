/* eslint-disable quotes */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import realWorldApiService from '../../utils/realWorldApiSevice';
import './SignUp.css';

function SignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate('/sign-in');
      }, 5000);
    }
  }, [successMessage]);
  const signUpSchema = z
    .object({
      username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(20, { message: "Username can't be longer than 20 characters" }),
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(40, { message: "Password can't be longer than 40 characters" }),
      confirmPassword: z.string(),
      agree: z.boolean({ required_error: 'Must be checked' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({ resolver: zodResolver(signUpSchema) });
  const onSubmit = async (data) => {
    let apiService = new realWorldApiService();
    const response = await apiService.signUp(
      JSON.stringify({ user: { username: data.username, email: data.email, password: data.password } })
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
        } else if (errors.password) {
          setError('password', { type: 'server', message: errors.password });
        }
      }
      return;
    } else {
      setErrorMessage(null);
      setSuccessMessage('Sign Up was successfull you will be redirected after 5 seconds');
      reset();
    }
  };
  return (
    <div className="sign-up-form">
      <Card>
        <h2 className="sign-up-form__header">Create new account</h2>
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
          <Form.Item label="Password">
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Password" />}
            />
            {errors.password && <p className="form-error-message">{errors.password.message}</p>}
          </Form.Item>
          <Form.Item label="Repeat password">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Password" />}
            />
            {errors.confirmPassword && <p className="form-error-message">{errors.confirmPassword.message}</p>}
          </Form.Item>
          <Controller
            name="agree"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox checked={value} onChange={onChange}>
                I agree to the processing of my personal information
              </Checkbox>
            )}
          />
          {errors.agree && <p className="form-error-message">{errors.agree.message}</p>}
          <Form.Item>
            <Button className="sign-up-form__submitBtn" type="primary" htmlType="submit" disabled={isSubmitting}>
              Create
            </Button>
          </Form.Item>
          {errorMessage ? <p className="form-error-message">{errorMessage}</p> : null}
          {successMessage ? <p className="form-success-message">{successMessage}</p> : null}
        </Form>
        <p className="link-to-sign-in">
          Already have an account? <Link to="/sign-in">Sign in.</Link>
        </p>
      </Card>
    </div>
  );
}
export default SignUp;
