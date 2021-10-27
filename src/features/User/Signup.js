/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Loader from 'react-loader-spinner';
import { signupUser, userSelector, clearState } from './UserSlice';
import style from '../../assets/Signup.module.css';

const Signup = () => {
  const dispatch = useDispatch();
  // errors is a special variable that used by react-hook-form
  // eslint-disable-next-line no-unused-vars
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    isFetching, isSuccess, isError, errorMessage,
  } = useSelector(
    userSelector,
  );
  const onSubmit = (data) => {
    if (newPassword === confirmPassword) {
      dispatch(signupUser(data));
    } else {
      toast.error('Password and confirmation do not match');
    }
  };

  useEffect(() => () => {
    dispatch(clearState());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push('/');
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [dispatch, isSuccess, isError, errorMessage, history]);

  return (
    <>
      <Toaster />
      {isFetching ? (
        <div className="spinner">
          <Loader type="TailSpin" color="#42b5e8" height={100} width={100} />
        </div>
      ) : (
        <div className={style.signup}>
          <h1 className={style.helloText}>Dietify</h1>
          <div>
            <h2>
              Sign Up to your account
            </h2>
          </div>
          <div>
            <div className={style.formContainer}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
                className={style.signupForm}
              >
                <input type="text" placeholder="Name" {...register('name', { required: true })} />
                <input type="email" placeholder="Email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                <input type="password" value={newPassword} placeholder="Password" {...register('password', { required: true, min: 6 })} onChange={(event) => (setNewPassword(event.target.value))} />
                <input type="password" value={confirmPassword} placeholder="Password Confirmation" {...register('passwordConfirmation', { required: true, min: 6 })} onChange={(event) => setConfirmPassword(event.target.value)} />

                <input type="submit" value="Sign Up" className={style.signupButton} />

              </form>
              <div>
                <div>
                  <div>
                    <span>
                      If you already has an account, You can
                      {' '}
                      <Link to="login">log in</Link>
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

export default Signup;
