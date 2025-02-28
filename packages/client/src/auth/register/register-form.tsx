import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserDetails } from '@ws-chat/common/src/index';
import { FormContainer } from '../form.styles';

interface RegisterFormInputs {
  email: string;
  name: string;
  password: string;
}

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const res = await fetch(`http://localhost:4000/user/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
      const response = (await res.json()) as UserDetails;
      if (!response) throw new Error('User registration failed');
      navigate('/login');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <FormContainer onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <label htmlFor="email">Email</label>
      <input {...register('email', { required: true })} />
      <label htmlFor="name">Name</label>
      <input {...register('name', { required: true })} />
      <label htmlFor="password">Password</label>
      <input {...register('password', { required: true })} type="password" />
      {errors.email && <span>[Email]: {errors.email.message}</span>}
      {errors.password && <span>[Password]: {errors.password.message}</span>}
      <input type="submit" />
    </FormContainer>
  );
};
