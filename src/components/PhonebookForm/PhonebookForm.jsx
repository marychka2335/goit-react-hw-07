import { useState } from 'react';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import css from './PhonebookForm.module.css';
import { nanoid } from 'nanoid';
import { addContact } from './../../redux/slices/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from './../../redux/selectors';

export function PhonebookForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();
    if (contacts.some(item => item.name.toLowerCase() === name.toLowerCase())) {
      iziToast.warning({
        title: 'Caution',
        message: `${name} is already in contacts`,
        timeout: 5000,
        position: 'topLeft',
      });
      return;
    }
    dispatch(addContact({ id: nanoid(6), name, number }));
    setName('');
    setNumber('');
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  return (
    <form className={css.formContact} onSubmit={handleSubmit}>
      <label className={css.labelContact}>Name </label>
      <input
        onChange={handleChange}
        className={css.inputContact}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+(([' \-][a-zA-Zа-яА-ЯіІїЇєЄґҐ ])?[a-zA-Zа-яА-ЯіІїЇєЄґҐ]*)*$"
        required
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        placeholder="Type contact name..."
      />
      <label className={css.labelContact}>Phone </label>
      <input
        className={css.inputContact}
        onChange={handleChange}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        required
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        placeholder="Type contact phone..."
      />
      <button className={css.button}>Add contact</button>
    </form>
  );
}
