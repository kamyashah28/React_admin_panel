import { Helmet } from 'react-helmet-async';
import { CONFIG } from '../config-global';
import { ProjectView } from '../sections/project/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Projects - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProjectView />
    </>
  );
}
