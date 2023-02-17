import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const SubmitHandler = event =>{
    event.preventDefault();
    const updatePassword = newPasswordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDIbTuKFiP0KlJ3U9fC_BAI6640qbdwa_g', {
      method:'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: updatePassword,
        returnSecureToken:false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      history.replace('/');
      console.log('successfully changed password!');
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;