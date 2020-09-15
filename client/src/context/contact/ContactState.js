import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  SET_ALERT,
  FILTER_CONTACTS,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill',
        lastName: 'Jackson',
        IDNumber: '1234567890000',
        email: 'jillj@123mail.com',
        gender: 'Female',
        phone: '111-111-1111',
        type: 'private',
      },
      {
        id: 2,
        name: 'Zach',
        lastName: 'Niishaw',
        IDNumber: '1234567890000',
        email: 'zach@123mail.com',
        gender: 'Male',
        phone: '222-222-2222',
        type: 'private',
      },
      {
        id: 3,
        name: 'James',
        lastName: 'Blond',
        IDNumber: '1234567890000',
        email: '007@123mail.com',
        gender: 'Male',
        phone: '333-333-3333',
        type: 'personal',
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
