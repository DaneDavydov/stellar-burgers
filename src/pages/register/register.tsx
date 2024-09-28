import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearError,
  loginUserThunk,
  registerUserThunk,
  selectError
} from '../../services/slices/user-slice';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  let errorText = useSelector(selectError) as string;

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(registerUserThunk({ email, password, name: userName })).then(
      () => {
        dispatch(loginUserThunk({ email, password }));

        return <Navigate to={'/profile'} />;
      }
    );
  };
  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
