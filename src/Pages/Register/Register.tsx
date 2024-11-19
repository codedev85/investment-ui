import React ,{SyntheticEvent, useState , useContext} from 'react'
import './Register.css';
import { Link ,useNavigate } from 'react-router-dom';
import { MessageContext } from '../../components/shared/MessageContext';
import apiClient from '../../apiClient';

export default function Register() {

   const [name , setName] = useState('')
   const [email , setEmail] = useState('')
   const [phoneNumber , setPhoneNumber] = useState('')
   const [password , setPassword] = useState('')
   const navigate = useNavigate(); 

   const messageContext = useContext(MessageContext);

   if (!messageContext) {
     throw new Error('MyComponent must be used within a MessageProvider');
   }
 
   const { displayError, displaySuccess } = messageContext;


   const submit = async (e : SyntheticEvent) => {
      
            e.preventDefault()
       
            try {
             
              const response = await apiClient.post('/register',{
                     first_name: name,
                     password,
                     email,
                     phone_number: phoneNumber,
                   });

              const content = response.data;

               if (content.status === 'true') {
                 displaySuccess(content.message);
                 navigate('/activate/account')
               } else {
                 displayError(content.message);
               }
           
             } catch (error) {
               displayError('An error occurred while processing your request. Please try again later.');
               console.error('Error:', error);
             }

            

           
         
   }

  return (
    <div>
    <div className="container">
       <div className="login_box">
         <div className="input">
            <h3>Register Here</h3>
         </div>
          <form onSubmit={submit}>
               <div className="input">
                  <label>Fullname</label>
                  <input type='text' 
                           className='input-form'
                           placeholder='FullName'
                           onChange={e => setName(e.target.value)}
                           />
               </div>
               <div className="input">
                  <label>Email</label>
                  <input type='email' 
                           className='input-form'
                           placeholder='email'
                           onChange={e => setEmail(e.target.value)}
                           />
               </div>
               <div className="input">
                  <label>Password</label>
                  <input type='password' 
                           className='input-form'
                           placeholder='Enter password'
                           onChange={e => setPassword(e.target.value)}
                           />
               </div>
               <div className="input">
                  <label>Phone Number</label>
                  <input type='text' 
                           className='input-form'
                           placeholder='Phone Number'
                           onChange={e => setPhoneNumber(e.target.value)}
                           />
               </div>
               <div className="input">
                  <button>Register</button>
               </div>
            </form>
          
           <div className="input">
             <p>Already have an account ? <Link to='/'>Login</Link></p>
           </div>
       </div>
    </div>
 </div>
  )
}
