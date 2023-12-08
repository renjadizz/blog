import { useForm, Controller } from 'react-hook-form';
import { Card, Form, Input, Button } from 'antd';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string(),
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
        </Form>
        <p className="link-to-sign-in">
          Already have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </Card>
    </div>
  );
}
export default SignIn;
