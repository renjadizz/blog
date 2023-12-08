/* eslint-disable quotes */
import { useForm, Controller } from 'react-hook-form';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './SignUp.css';
function SignUp() {
  const signUpSchema = z
    .object({
      username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(20, { message: "Username can't be longer than 20 characters" }),
      email: z.string(),
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
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Form.Item label="Username">
            <Controller name="username" control={control} render={({ field }) => <Input {...field} />} />
            {errors.username && <p>{errors.username.message}</p>}
          </Form.Item>
          <Form.Item label="Email">
            <Controller name="email" control={control} render={({ field }) => <Input {...field} />} />
            {errors.email && <p>{errors.email.message}</p>}
          </Form.Item>
          <Form.Item label="Password">
            <Controller name="password" control={control} render={({ field }) => <Input {...field} />} />
            {errors.password && <p>{errors.password.message}</p>}
          </Form.Item>
          <Form.Item label="Confirm password">
            <Controller name="confirmPassword" control={control} render={({ field }) => <Input {...field} />} />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
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
          {errors.agree && <p>{errors.agree.message}</p>}
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
export default SignUp;
