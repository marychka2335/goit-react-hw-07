import css from './ContactsList.module.css';
import { deleteContact } from './../../redux/slices/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredContacts } from './../../redux/selectors';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function ContactsList() {
  const filteredContacts = useSelector(getFilteredContacts);
  const dispatch = useDispatch();

  return (
    <>
      <ul className={css.contacts}>
        {filteredContacts.map(contact => {
          // contactItem.split(/\s+/).map(word[0].toUpperCase() + word.substring(1).join(' '));
          return (
            <li className={css.contactItem} key={contact.id}>
              <div>
                <span className={css.contactName}>{contact.name}:</span>
                <span className={css.contactNumber}>{contact.number}</span>
              </div>

              <button
                className={css.buttonDelete}
                onClick={contactId => {
                  Confirm.show(
                    'Delete contact',
                    'Are you sure you want to delete this contact?',
                    'Yes',
                    'No',
                    () => {
                      dispatch(deleteContact(contactId));
                      Notify.failure(`Contact deleted`);
                    },
                    () => {
                      return;
                    },
                    {
                      titleColor: '#4f46e5',
                      okButtonBackground: '#4f46e5',
                    }
                  );
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <p className={css.totalContacts} key={ContactsList.length}>
        Total contacts {filteredContacts.length}
      </p>
    </>
  );
}
