import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
