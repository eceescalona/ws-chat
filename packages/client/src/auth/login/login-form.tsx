import { SubmitHandler, useForm } from 'react-hook-form';
import { FormContainer } from '../form.styles';
import { useNavigate } from 'react-router-dom';
import { Token, UserDetails } from '@ws-chat/common/src/index';
import { useAuth } from '../use-auth.hook';

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await fetch(`http://localhost:4000/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
      const response = (await res.json()) as UserDetails & Token;
      auth.login(response);

      navigate('/lobby');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <FormContainer onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <label htmlFor="email">Email</label>
      <input {...register('email', { required: true })} />
      <label htmlFor="password">Password</label>
      <input {...register('password', { required: true })} type="password" />
      {errors.email && <span>[Email]: {errors.email.message}</span>}
      {errors.password && <span>[Password]: {errors.password.message}</span>}
      <input type="submit" />
    </FormContainer>
  );
};
