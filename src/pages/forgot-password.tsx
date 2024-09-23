import { Helmet } from 'react-helmet-async';
import { CONFIG } from '../config-global';
import { ForgotPasswordView } from '../sections/auth';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Forgot Password- ${CONFIG.appName}`}</title>
      </Helmet>
      <ForgotPasswordView />
    </>
  );
}
