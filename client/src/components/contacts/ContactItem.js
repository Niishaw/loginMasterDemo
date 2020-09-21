import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { id, name, lastName, IDNumber, gender, email, phone, type } = contact;
  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  //Body for Contact Item
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name + ' ' + lastName}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'personal' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {gender && (
          <li>
            <i
              className={'fas ' + (gender === 'Male' ? 'fa-mars' : 'fa-venus')}
            ></i>{' '}
            {gender}
          </li>
        )}
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
        {IDNumber && (
          <li>
            <i className='fas fa-id-card'></i> {IDNumber}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
