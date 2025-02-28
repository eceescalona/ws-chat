import { PageLayout } from './page-layout';
import { LoginForm } from '../auth/login/login-form';

export const LoginPage = () => {
  return (
    <PageLayout heading="Login">
      <LoginForm />
    </PageLayout>
  );
};
