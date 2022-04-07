import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // destructure from the form data
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    // want to update the form data state
    // pass in event parameter
    // call setFormData and want to get previous state (pass in arrow function that takes in prevState)
    // Will spread across what the previous state is
    // want to set email to what is being typed in (e.target.value)
    // To make either password or email, we can just that id
    // which is [e.target.id], will give us either email or password
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // don't want to change the formdata state
      // create an object and spread across the formdata (copying)
      const formDataCopy = { ...formData };
      // Don't want password to get submitted to db,
      // so take form data copy, so can delete password from the object
      // so doesn't get put into database
      delete formDataCopy.password;
      // add timestamp
      formDataCopy.timestamp = serverTimestamp();
      // updates the database, and adds user to user collection
      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      // redirect
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong with registration');
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Let's Get You Registered!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              className='nameInput'
              placeholder='Name'
              id='name'
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              className='emailInput'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />
            <div className='passwordInputDiv'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password
            </Link>
            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#ffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}
export default SignUp;
