import React, { useEffect, useState ,useContext} from 'react';
import './InvestmentPlan.css';
import { useParams } from 'react-router-dom';
import { MessageContext } from '../../components/shared/MessageContext';

interface SubscriptionDetails {
  subscription_date?: string;
  amount_invested?: number;
  status?: string;
  date_of_returns?: string ;
}

interface InvestmentPlan {
  id?: number;
  name?: string;
  description?: string;
  min_investment_amount?: number;
  max_investment_amount?: number;
  duration_in_months?: number;
  return_rate?: number;
  subscription_details?: SubscriptionDetails;
 

}

const InvestmentPlan: React.FC = () => {

  const [investment, setInvestment] = useState<InvestmentPlan>({});
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
    // Get access to message context
    const messageContext = useContext(MessageContext);

    // Ensure messageContext is available
    if (!messageContext) {
      throw new Error('Login must be used within a MessageProvider');
    }
  
    const { displayError, displaySuccess } = messageContext;

    const formatDate = (dateString: string | undefined): string => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }).format(date);
    };
    

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/investment/plans/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) {
          displayError('Failed to fetch investment plan');
          throw new Error();
        }

        const content: InvestmentPlan = await response.json();
        setInvestment(content);
        
      } catch (error) {
         displayError('Failed to fetch investment plan'+error);
        console.error('Error fetching investment plan:', error);
      }
    })();
  }, [id]);

  const handleSubscribe = async () => {
    if (!amount) {
      setError('Please enter an amount.');
      return;
    }

    if (amount < (investment.min_investment_amount || 0) || amount > (investment.max_investment_amount || 0)) {
      setError(
        `Amount must be between ${investment.min_investment_amount} and ${investment.max_investment_amount}.`
      );
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/investment/plans/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          investment_plan: investment.id,
          amount_invested: amount,
        }),
      });

      if (!response.ok) {
      //   throw new Error('Failed to subscribe to investment plan');
        displayError('Failed to subscribe to investment plan');
      }

      const result = await response.json();
      console.log('Subscription successful:', result);
      setShowModal(false);
      setError(null);

      setTimeout(() => {
         window.location.reload();
       }, 3000);
     

      displaySuccess(result.message);
    
    } catch (error) {
      displayError('Error subscribing to plan');
      console.error('Error subscribing to plan:', error);
      setError('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="investment_box">
          <div className="title">
            <h1>Investment Plan</h1>
          </div>
          <div className="investment_content">
            <h3>Title: {investment.name || 'N/A'}</h3>
            <h3>Description: {investment.description || 'N/A'}</h3>
            <h3>Min (Amount): {investment.min_investment_amount || 'N/A'}</h3>
            <h3>Max (Amount): {investment.max_investment_amount || 'N/A'}</h3>
            <h3>Duration (Months): {investment.duration_in_months || 'N/A'}</h3>
            <h3>Rate (%): {investment.return_rate || 'N/A'}</h3>
            {investment.subscription_details?.subscription_date ? (
              <div className="subscription">
                <h3>Subscription Details:</h3>
               
                <p>Amount Invested: {investment.subscription_details?.amount_invested || 'N/A'}</p>
                  <p> Returns On Investment :{investment.subscription_details?.amount_invested
            ? (investment.return_rate || 0) / 100 * investment.subscription_details.amount_invested
            : 'N/A'}</p>
               <p>Subscription Date: {formatDate(investment.subscription_details.subscription_date)|| 'N/A'}</p>
               <p>Date of Returns: {formatDate(investment.subscription_details.date_of_returns) || 'N/A'}</p>
                <p>Status: {investment.subscription_details?.status || 'N/A'}</p>
              </div>
            ) : (
              <div className="no_subscription">
                <p>You are not subscribed to this plan.</p>
                <button onClick={() => setShowModal(true)}>Subscribe</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal_content">
            <h2>Subscribe to {investment.name}</h2>
            <p>
              Please enter an amount between{' '}
              {investment.min_investment_amount} and {investment.max_investment_amount}.
            </p>
            <input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
            {error && <p className="error">{error}</p>}
            <div className="modal_actions">
              <button onClick={handleSubscribe}>Confirm</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlan;

