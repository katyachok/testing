import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Button} from '../Button/Button'

function Plans({handlePlan}) {
  const [plans, setPlans] = useState(null);

  useEffect(() => {
    const fetch = async () => {
    const promise1 = axios.get('http://localhost:5000/api/items')
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
      
    const promise2 = axios.get('http://localhost:5000/api/items/prices')
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    Promise.all([promise1, promise2]).then(([items, itemsPrices]) => {
      const newRes = Object.values(items).map(item => {
        const joinedItem = itemsPrices.find(priceItem => priceItem.item_id === item.id)
        return joinedItem ? {...item, item_price_id: joinedItem.id, price: joinedItem.price} : item;
        });

      setPlans(newRes)
    });
    }
    fetch()
  }, [])

  return (
    <div>
        <h3>Choose a plan</h3>
        <StyledContainer>
          {plans?.map(({id, name, description, item_price_id, price}) => (
            <StyledButton onClick={() => handlePlan({item_price_id, price})} key={id}>{name}
              <SubText>{description}</SubText>
            </StyledButton>
          ))}
        </StyledContainer>
    </div>
  );
}

export default Plans;

const StyledContainer = styled('div')({
  display: 'flex',
  gap: '24px',
  justifyContent: 'center',
})

const StyledButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '364px',
  height: '100px',
  background: '#3A3A3A',
  boxShadow: '0px 15px 30px rgba(118, 118, 118, 0.07)',
  borderRadius: '4px',
  fontFamily: 'Manrope',
  fontWeight: '600',
  fontSize: '32px',
  lineHeight: '44px',
  color: '#FFFFFF',
  flexDirection: 'column',
  '&:hover': {
    background: '#1A1A1A !important',
    border: '1px solid #1A1A1A'
  }
});

const SubText = styled('span')({
fontWeight: 500,
fontSize: '14px',
lineHeight: '20px',
letterSpacing: '0.2px',
color: '#F9F9F9',
})
