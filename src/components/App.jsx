import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Div, Heading } from './App.styled';

import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (e, name, number) => {
    e.preventDefault();

    const isExist = contacts
      .map(({ name }) => name.toLowerCase())
      .includes(name.toLowerCase());

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { id: `${nanoid()}`, name: `${name}`, number: `${number}` },
    ]);
  };

  const handleChange = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    if (filter === '') {
      return contacts;
    }
    const filtered = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered;
  };

  const handleClick = e => {
    const updatedContacts = contacts.filter(({ id }) => id !== e.target.id);
    setContacts([...updatedContacts]);
  };

  return (
    <Div>
      <Heading>Phonebook</Heading>
      <ContactForm onSubmit={handleSubmit} />

      <Heading>Contacts</Heading>
      <Filter onChange={handleChange} filterValue={filter} />
      <ContactList items={filterContacts()} onClick={handleClick} />
    </Div>
  );
};
