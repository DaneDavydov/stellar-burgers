import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutThunk } from '../../services/slices/user-slice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutThunk()).then(() => <Navigate to={'/login'} />);
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
