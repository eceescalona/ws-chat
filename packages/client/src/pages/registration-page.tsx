import { PageLayout } from './page-layout';
import { RegisterForm } from '../auth/register/register-form';

export const RegistrationPage = () => {
  return (
    <PageLayout heading="Register">
      <RegisterForm />
    </PageLayout>
  );
};
