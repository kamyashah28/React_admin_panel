import { Helmet } from 'react-helmet-async';
import { CONFIG } from '../config-global';
import { EstimatesView } from '../sections/estimates/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Estimates - ${CONFIG.appName}`}</title>
      </Helmet>

      <EstimatesView />
    </>
  );
}
