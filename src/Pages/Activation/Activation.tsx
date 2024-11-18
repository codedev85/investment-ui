import React , {useState ,SyntheticEvent ,useContext}from 'react'
import apiClient from '../../apiClient';
import { MessageContext } from '../../components/shared/MessageContext';
import { useNavigate } from 'react-router-dom';

export default function Activation() {

   const [code, setCode] = useState<string>('');
   const navigate = useNavigate();

   const messageContext = useContext(MessageContext);

   // Ensure messageContext is available
   if (!messageContext) {
     throw new Error('Login must be used within a MessageProvider');
   }
 
   const { displayError, displaySuccess } = messageContext;

   const submit = async (e: SyntheticEvent) => {

      e.preventDefault();
      
      try {
        
         const response = await apiClient.post('/activate/code',{code});

         const content = response.data;
      
         if(content.status !== 'true'){

            displayError(content.error);

         }else{

            displaySuccess(content.message);

            navigate('/');
         }

       

      } catch (error) {
       
        displayError('Issue occured while trying to validate your account');
       
      }
    };
  return (
   <div className="container">
   <div className="login_box">
     <div className="input">
       <h3>Account Validation</h3>
     </div>
     <form onSubmit={submit}>
       <div className="input">
         <label>Enter Your 6-digits Code</label>
         <input
           type="text"
           className="input-form"
           placeholder="Enter Your 6-digits Code"
           onChange={(e) => setCode(e.target.value)}
           value={code}
         />
       </div>
      
       <div className="input">
         <button type="submit">Validate Code</button>
       </div>
     </form>
   </div>
 </div>
  )
}
