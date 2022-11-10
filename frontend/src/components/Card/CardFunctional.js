import React, { useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import {CardComponent, CardNumber, CardExpiry, CardCVV} from "@chargebee/chargebee-js-react-wrapper";

import { cardOptions } from './constants';
import './card.css'

const createPaymentIntent = async (payload) => {
  const data = await axios.post('http://localhost:5000/api/payment', payload)
  return data;
}

export const Card = ({currentPlan, customerId}) =>  {
  const cardRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { style, classes, locale, placeholder } = cardOptions;

  // useLayoutEffect(() => {
  //   window.Chargebee.init({
  //     site: "attempt2-test",
  //     publishableKey: 'test_elw4E6LtRxtnO4fBeEwLi1DrOOIcnkMv'
  //   })
  // }, [])

  const handleSubmit = async (e) => {
    if(e) e.preventDefault();
    setLoading(true);
      
    try {
      const intent = await createPaymentIntent({amount: currentPlan.price});
      
      if(intent.data) {
        const authorizedPaymentIntent = await cardRef.current.authorizeWith3ds(intent.data);
        axios.post('http://localhost:5000/api/subscriptions', {
          id: customerId,
          plan_id: currentPlan.item_price_id,
          payment_intent: {id: authorizedPaymentIntent.id}
        });
      }
    } catch (error) {
        setError(error.message);
    } finally {
      setLoading(false);
      }
  }

    return (
      <div className="ex1 container">
        <div className="ex1-wrap">
          <div className="ex1-fieldset">
          <CardComponent ref={cardRef} className="fieldset field"
            styles={style} 
            classes={classes} 
            locale={locale}
            placeholder={placeholder}
          >
            <div className="ex1-field">
              <CardNumber className="ex1-input" placeholder={"4111 1111 1111 1111"}/>
              <label className="ex1-label">Card Number</label><i className="ex1-bar"></i>
            </div>

            <div className="ex1-fields">
              <div className="ex1-field">
                <CardExpiry className="ex1-input" />
                <label className="ex1-label">Expiry</label><i className="ex1-bar"></i>
              </div>

              <div className="ex1-field">
                <CardCVV className="ex1-input" />
                <label className="ex1-label">CVC</label><i className="ex1-bar"></i>
              </div>
            </div>
          </CardComponent>
        </div>
        <button type="submit" className={ loading ? "submit ex1-button" : "ex1-button"} onClick={handleSubmit}>Pay</button>
        {error && <div className="error" role="alert">{error}</div>}
      </div>
      </div>
    );
}
