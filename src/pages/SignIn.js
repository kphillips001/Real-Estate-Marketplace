import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [fromData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = fromData;

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

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <main>
          <form>
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
            <div className='signInBar'>
              <p className='signInText'>Sign In</p>
              <button className='signInButton'>
                <ArrowRightIcon fill='#ffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          <Link to='/sign-up' className='registerLink'>
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  );
}
export default SignIn;
