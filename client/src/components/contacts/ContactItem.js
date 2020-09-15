import React from 'react';

const ContactItem = ({ contact }) => {
  const { id, name, lastName, IDNumber, gender, email, phone, type } = contact;
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name + ' ' + lastName}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'private' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
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
        <button className='btn btn-dark btn-sm'>Edit</button>
        <button className='btn btn-danger btn-sm'>Delete</button>
      </p>
    </div>
  );
};

export default ContactItem;
