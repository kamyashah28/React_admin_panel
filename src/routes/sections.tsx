import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { varAlpha } from '../theme/styles';
import { AuthLayout } from '../layouts/auth';
import { DashboardLayout } from '../layouts/dashboard';
import { PrivateRoute } from './components/privateRoute';
import ProjectForm from '../sections/project/form/project-form';
import EstimateForm from '../sections/estimates/form/estimate-form';
import ProjectsPage from '../pages/projects';
import EstimatesPage from '../pages/estimates';
import HomePage from '../pages/home'

const SignInPage = lazy(() => import('../pages/sign-in'));
const SignUpPage = lazy(() => import('../pages/sign-up'));
const ForgotPasswordPage = lazy(() => import('../pages/forgot-password'));
const Page404 = lazy(() => import('../pages/page-not-found'));

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme: { vars: { palette: { text: { primaryChannel: string } } } }) =>
          varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'projects', element: <ProjectsPage /> },
        { path: 'project-form', element: <ProjectForm />},
        { path: 'project-form/:id', element: <ProjectForm />},
        { path: 'estimations', element: <EstimatesPage /> },
        { path: 'estimation-form', element: <EstimateForm />},
        { path: 'estimation-form/:id', element: <EstimateForm />},
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <AuthLayout>
          <SignUpPage />
        </AuthLayout>
      ),
    },
    {
      path: 'forgot-password',
      element: (
        <AuthLayout>
          <ForgotPasswordPage />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/sign-in" replace />,
    },
  ]);
}
