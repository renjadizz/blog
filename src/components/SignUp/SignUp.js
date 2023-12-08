/* eslint-disable quotes */
import { useForm, Controller } from 'react-hook-form';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
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
      agree: z.boolean(),
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
  } = useForm({ resolver: zodResolver(signUpSchema) });
  const onSubmit = () => {
    console.log('qwe');
    reset();
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
        </Form>
        <p className="link-to-sign-in">
          Already have an account? <Link to="/sign-in">Sign in.</Link>
        </p>
      </Card>
    </div>
  );
}
export default SignUp;
