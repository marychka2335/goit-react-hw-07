import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.contacts;

export const getFilterValue = state => state.filter;

export const getFilteredContacts = createSelector(
  [getContacts, getFilterValue],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  }
);

// export const getFilteredContacts = state => {
//   const contacts = getContacts(state);
//   const filter = getFilterValue(state);

//   if (contacts && filter) {
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase().trim())
//     );
//   }
//   return contacts;
// };
