import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    // set date to what comes back from firebase
    name: auth.currentUser.displayName,
    displayName: auth.currentUser.email,
  });

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className='profile'>
      <header className='prifleHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='logout' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>
    </div>
  );
}
export default Profile;
