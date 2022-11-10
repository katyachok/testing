import React, { Component } from 'react';
import axios from 'axios';
import {CardComponent, CardNumber, CardExpiry, CardCVV} from "@chargebee/chargebee-js-react-wrapper";

import { cardOptions } from './constants';
import './card.css'

const createPaymentIntent = async (payload) => {
  const data = await axios.post('http://localhost:5000/api/payment', payload)
  return data;
}

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.cardRef = React.createRef();

    this.chargebeeInstance = window.Chargebee.init({
        site: "attempt2-test",
        publishableKey: 'test_elw4E6LtRxtnO4fBeEwLi1DrOOIcnkMv'
        // publishableKey: process.env.CHARGEBEE_API_KEY
    })

    this.state = {
      error: "",
      loading: false,
    }
  }

  onSubmit = async (e) => {
    if(e) e.preventDefault();
    this.setState({loading: true});
      
    try {
      const intent = await createPaymentIntent({amount: this.props.currentPlan.price});
      
      if(intent.data) {
        const authorizedPaymentIntent = await this.cardRef.current.authorizeWith3ds(intent.data);
        axios.post('http://localhost:5000/api/subscriptions', {
          id: this.props.customerId,
          plan_id: this.props.currentPlan.item_price_id,
          payment_intent: {id: authorizedPaymentIntent.id}
        });
      }
    } catch (error) {
        this.setState({error: error.message});
    } finally {
        this.setState({loading: false});
    }
}

render() {
    const { style, classes, locale, placeholder } = cardOptions;
    return (
      <div className="ex1 container">
        <div className="ex1-wrap">
          <div className="ex1-fieldset">
          <CardComponent ref={this.cardRef} className="fieldset field"
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
        <button type="submit" className={ this.state.loading ? "submit ex1-button" : "ex1-button"} onClick={this.onSubmit}>Pay</button>
        {this.state.error && <div className="error" role="alert">{this.state.error}</div>}
      </div>
      </div>
    );
  }
}
