/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Loader from 'react-loader-spinner';
import { loginUser, userSelector, clearState } from './UserSlice';
import style from '../../assets/Login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // errors is a special variable that used by react-hook-form
  // eslint-disable-next-line no-unused-vars
  const { register, errors, handleSubmit } = useForm();
  const {
    isFetching, isSuccess, isError, errorMessage,
  } = useSelector(
    userSelector,
  );
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => () => {
    dispatch(clearState());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      history.push('/');
    }
  }, [isError, isSuccess]);

  return (
    <>
      <Toaster />
      {isFetching ? (
        <div className="spinner">
          <Loader type="TailSpin" color="#42b5e8" height={100} width={100} />
        </div>
      ) : (
        <div className={style.login}>
          <h1 className={style.helloText}>Dietify</h1>
          <div>
            <h2>
              Log in to your account
            </h2>
          </div>
          <div>
            <div className={style.formContainer}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
                className={style.loginForm}
              >
                <input type="email" placeholder="Email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                <input type="password" placeholder="Password" {...register('password', { required: true, min: 6 })} />
                <input type="submit" value="Log In" className={style.loginButton} />
              </form>
              <div>
                <div>
                  <div>
                    <span>
                      If you don&apos;t have an account, You can
                      {' '}
                      <Link to="signup"> sign up</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
