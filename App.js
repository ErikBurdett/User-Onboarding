import React, { useState, useEffect } from 'react'
import User from './User'
import Form from './Form'

import axios from 'axios'
import formSchema from './formSchema'
import * as yup from 'yup'

const initialFormValues = {
 
  name: '',
  email: '',
  password: '',
  
  Agree: false,
  Disagree: false,
  
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  Agree: false,
  Disagree:false,
  Skip: false,
 
}
const initialUsers = []
const initialDisabled = true


export default function App() {
  
  const [users, setUsers] = useState(initialUsers)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean
 
  const postNewUser = newUser => {
    /
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users])
      })
      .catch(err => {
        console.log(err);
      })
      setFormValues(initialFormValues)
  }

 
  const inputChange = (name, value) => {
    
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
     
      TermsOfService: ['Agree', 'Disagree','Skip'].filter(term => formValues[term])
    }
    
    postNewUser(newUser)
  }

  //side effects
  
  useEffect(() => {
   
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>User-onboard App</h1></header>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}