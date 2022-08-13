import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { CardContext } from '../context/CardContext';
import { useForm } from '../hooks/useForm';

import iconComplete from '../assets/icon-complete.svg'

export const Form = () => {

  
  const [ values, handleInputChange, reset ] = useForm({
    number: '',
    name: '',
    month: '',
    year: '',
    cvc: '',
  });
  
  const { card, setCard } = useContext(CardContext);
  
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    //
    e.preventDefault();

    if ( // validate
      values.name.trim().length > 0 && values.name.trim().length < 21 &&
      (values.month.length === 1 || values.month.length === 2) &&
      values.year.length === 2 &&
      values.cvc.length === 3 &&
      /^\d+$/.test(values.number.trim().replace(/\s/g, '')) && 
      values.number.trim().replace(/\s/g, '').length === 16)
    {
      setShowError(false);
      setShowForm(false);
    }
    else {
      setShowError(true);
    }
  }

  const handleContinue = () => {
    setShowForm(true);
    reset();
  }

  useEffect(() => {
    //
    const { cvc, month, name, number, year } = values;

    if (Object.values(values).some(value => value !== '')){
      setCard({
        ...card, 
        name: name.trim().length < 21 ? name : name.substring(0,20), 
        month: month.length < 3 ? month : month.substring(0,2),
        year: year.length < 3 ? year : year.substring(0,2),
        cvc: cvc.length < 4 ? cvc : cvc.substring(0, 3),
        number: 
          /^\d+$/.test(number.trim().replace(/\s/g, '')) && number.trim().replace(/\s/g, '').length < 17
            ? number.trim().replace(/\s/g, '') // replace the spaces
            : number.trim().replace(/\D/g, '').substring(0, 16) // replace only characters that are not numbers
      });
    }

  }, [values]);

  const [showForm, setShowForm] = useState(true);

  return (
    <>
      <form className='form' onSubmit={ handleSubmit }>

        <div className={!showForm ? 'hidden' : ''}>

          <div className='field'>
            <label htmlFor="card-holder">CARDHOLDER NAME</label>
            <input
              type="text"
              placeholder='e.g. Jane Applassed'
              name='name'
              autoComplete='off'
              value={values.name}
              onChange={handleInputChange}
            />
            {
              (values.name.trim().length > 0 && values.name.trim().length > 20)
              && (
                <p className='error'>Wrong format, 21 letters only.</p>
              )
            }
            
          </div>

          <div className='field'>
            <label htmlFor="card-holder">CARD NUMBER</label>
            <input
              type="text"
              placeholder='e.g. 0000 0000 0000 0000'
              name='number'
              autoComplete='off'
              value={values.number}
              onChange={handleInputChange}
            />
            {
              (values.number.trim().length > 0 && values.number.trim().replace(/\s/g, '').length > 16)
              && (
                <p className='error'>Wrong format, 16 numbers only.</p>
              )
            }
            {
              (values.number.trim().length > 0 && values.number.trim().replace(/\s/g, '').match(/^[0-9]+$/) == null)
              && (
                <p className='error'>Wrong format, numbers only.</p>
              )
            }
            
          </div>

          <div className="field date-cvc">
            <div className="date">
              <label>EXP. DATE (MM/YY)</label>
              <div className="date-input">
                <input 
                  type="number" 
                  placeholder='MM'
                  name='month'
                  autoComplete='off'
                  value={values.month}
                  onChange={handleInputChange}
                />
                <input 
                  type="number" 
                  placeholder='YY'
                  name='year'
                  autoComplete='off'
                  value={values.year}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <span>CVC</span>
              <input 
                type="number" 
                placeholder='e.g. 123'
                name='cvc'
                autoComplete='off'
                value={values.cvc}
                onChange={handleInputChange}
              />
            </div>
            
          </div>

          {/* Month validation */}
          {
            (values.month.length > 0 && values.month.length > 2)
            && (
              <p className='error'>Wrong month format, 2 numbers only.</p>
            )
          }

          {
            (values.month.length > 0 && (Number(values.month) > 12 || Number(values.month) < 1))
            && (
              <p className='error'>Wrong month format, 12 mounths only exists.</p>
            )
          }

          {/* Year validation */}
          {
            (values.year.length > 0 && values.year.length > 2)
            && (
              <p className='error'>Wrong year format, 2 numbers only.</p>
            )
          }

          {/* CVC validation */}
          {
            (values.cvc.length > 0 && values.cvc.length > 3)
            && (
              <p className='error'>Wrong cvc format, 3 numbers only.</p>
            )
          }

          {
            showError
            && (<p className='error'>Wrong format, fill in the fields correctly.</p>)
          }

          <div className='btn-container'>
            <input className='btn' type="submit" value="Confirm" />
          </div>
        </div>

        <div className={showForm ? 'hidden' : 'complete'}>
          <img src={iconComplete} alt="icon complete" />
          <h2>Thank you!</h2>
          <span>We've added your card details</span>
          <input className='btn' type="button" value="Continue" onClick={handleContinue}/>
          </div>

      </form>

    </>
  )
}
