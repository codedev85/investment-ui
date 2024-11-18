// import React ,{SyntheticEvent, useState , useContext} from 'react'
// import './Login.css'
// import { Link , useNavigate} from 'react-router-dom';
// import { MessageContext } from '../../components/shared/MessageContext';
// import { useAuth } from '../../components/shared/AuthContext';

// export default function Login() {

//   const [email , setEmail] = useState('')
//   const [password , setPassword] = useState('')
//   const navigate = useNavigate(); 
//   const { login } = useAuth();

//   const messageContext = useContext(MessageContext);

//   if (!messageContext) {
//     throw new Error('MyComponent must be used within a MessageProvider');
//   }

//   const { displayError, displaySuccess } = messageContext;


//   const submit = async (e : SyntheticEvent) => {
      
//     e.preventDefault()
//     const response = await login(email, password);
//     console.log(response)
//     // try {
//     //    const response = await fetch('http://localhost:8000/api/login', {
//     //      method: 'POST',
//     //      headers: { 'Content-Type': 'application/json' },
//     //      credentials : 'include',
//     //      body: JSON.stringify({
//     //        password,
//     //        email,
//     //      }),
//     //    });
 
//     //    const content = await response.json();
 
//     //    if (response.ok) {
//     //      displaySuccess(content.message);
//     //      navigate('/dashboard')
//     //    } else {
//     //      displayError(content.message);
//     //    }
//     //  } catch (error) {
//     //    displayError('An error occurred while processing your request. Please try again later.');
//     //    console.error('Error:', error);
//     //  }

    

   
 
// }

//   return (
//     <div>
//        <div className="container">
//           <div className="login_box">
//             <div className="input">
//                <h3>Login To Investement Portal</h3>
//             </div>
//             <form onSubmit={submit}>
//                 <div className="input">
//                   <label>Email</label>
//                   <input type='email' 
//                           className='input-form'
//                           placeholder='Email'
//                           onChange={e => setEmail(e.target.value)}
                          
//                           />
//                 </div>
//                 <div className="input">
//                   <label>Password</label>
//                   <input type='password' 
//                           className='input-form'
//                           placeholder='Password'
//                           onChange={e => setPassword(e.target.value)}
//                           />
//                 </div>
//                 <div className="input">
//                   <button>Login</button>
//                 </div>
//               </form>
//               <div className="input">
//                 <p>You don't have an account ? <Link to='register'>Register Here</Link></p>
//               </div>
//           </div>
//        </div>
//     </div>
//   )
// }

import React, { SyntheticEvent, useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { MessageContext } from '../../components/shared/MessageContext';
import { useAuth } from '../../components/shared/AuthContext';

export default function Login() {
  // Define state variables for email and password
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  
  // Access the login function from AuthContext
  const { login } = useAuth();

  // Get access to message context
  const messageContext = useContext(MessageContext);

  // Ensure messageContext is available
  if (!messageContext) {
    throw new Error('Login must be used within a MessageProvider');
  }

  const { displayError, displaySuccess } = messageContext;

  // Handle form submission
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    try {
      // Call the login function from AuthContext
      await login(email, password);
      
      // On successful login, show success message and redirect to dashboard
      displaySuccess('Login successful');
      navigate('/dashboard');
    } catch (error) {
      // Handle error and display the error message
      displayError('Login failed. Please check your credentials.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="login_box">
          <div className="input">
            <h3>Login To Investment Portal</h3>
          </div>
          <form onSubmit={submit}>
            <div className="input">
              <label>Email</label>
              <input
                type="email"
                className="input-form"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="input">
              <label>Password</label>
              <input
                type="password"
                className="input-form"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="input">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="input">
            <p>
              You don't have an account? <Link to="register">Register Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
