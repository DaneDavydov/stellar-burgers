import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { useLocation, Navigate } from 'react-router-dom';
import React from 'react';
import {
  isAuthenticatedSelector,
  isAuthCheckedSelector
} from '../../services/slices/user-slice';

type TProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: TProtectedRouteProps) => {
  const user = useSelector(isAuthenticatedSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate to={from} />;
  }
  return children;
};
