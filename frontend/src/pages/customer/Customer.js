import {useEffect, useState} from 'react';
import axios from 'axios';

import Plans from '../../components/Plans/Plans';
import Card from '../../components/Card/Card';
// import {Card} from '../../components/Card/CardFunctional';
import {Input} from '../../components/Input/Input'
import {Button} from '../../components/Button/Button'
import { Select } from '../../components/Select/Select';

export const Customer = () => {
  const [showCard, setShowCard] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);


//   useLayoutEffect(() => {
//     window.Chargebee.init({
//       site: "testex-test",
//       publishableKey: "test_ozmCilUHUp5NTo0sfPtt7XtFzXbI8cu0o"
//     })
//   })

useEffect(() => {
  const fetch = async() => {
    try {
      const {data} = await axios.get('http://localhost:5000/api/customers');
      setCustomers(data);
    } catch(error) {
      console.log('error', error)
    }
  }
  fetch()
}, [])

  const handlePlan = (plan) => {
    setCurrentPlan(plan)
    setShowCard(true);
  }

  const handleName = (e) => {
    setFirstName(e.target.value)
  }

  const createCustomer = () => {
    axios.post('http://localhost:5000/api/customers', {
      first_name: firstName, last_name: lastName, email
    })
    .then(function (response) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setCustomerId(response.data.id)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const selectCustomer = (e) => {
    setSelectedCustomer(e.target.value)
  }

    return (
      <>
      <div className='grid'>
        <div>
          <h3>create customer</h3>
          <Input labelText='first name'
            value={firstName}
            onChange={handleName}
          />
          <Input labelText='last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input labelText='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={createCustomer}>create customer</Button>
        </div>
        <div>
          <h3>select customer</h3>
          <Select options={customers} value={selectedCustomer} onSelect={selectCustomer}/>
        </div>
    </div>
    {
      (selectedCustomer || customerId) &&
        <>
          <Plans handlePlan={handlePlan} />
            {
              showCard && <Card 
              currentPlan={currentPlan}
              customerId={selectedCustomer || customerId}
              />
            }
        </>
    }
  </>
  )
}
