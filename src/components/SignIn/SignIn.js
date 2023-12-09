import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, Form, Input, Button } from 'antd';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';

import realWorldApiService from '../../utils/realWorldApiSevice';
import './SignIn.css';

function SignIn() {
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
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string(),
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
    const response = await apiService.signIn(JSON.stringify({ user: { email: data.email, password: data.password } }));
    const responseData = await response.json();
    if (!response.ok) {
      setErrorMessage('Error number is ' + response.status);
      if (responseData.errors) {
        const errors = responseData.errors;
        console.log(errors);
        if (errors['email or password']) {
          setError('email', { type: 'server', message: errors['email or password'] });
          setError('password', { type: 'server', message: errors['email or password'] });
        }
      }
      return;
    } else {
      setErrorMessage(null);
      localStorage.setItem('user', JSON.stringify(responseData));
      setSuccessMessage('Sign In was successfull you will be redirected after 2 seconds');
      reset();
    }
  };

  return (
    <div className="sign-up-form">
      <Card className="sign-in-form--width">
        <h2 className="sign-up-form__header">Sign In</h2>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
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
          <Form.Item>
            <Button className="sign-up-form__submitBtn" type="primary" htmlType="submit" disabled={isSubmitting}>
              Login
            </Button>
          </Form.Item>
          {errorMessage ? <p className="form-error-message form-message--align-center">{errorMessage}</p> : null}
          {successMessage ? <p className="form-success-message form-message--align-center">{successMessage}</p> : null}
        </Form>
        <p className="link-to-sign-in">
          Already have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </Card>
    </div>
  );
}
export default SignIn;
