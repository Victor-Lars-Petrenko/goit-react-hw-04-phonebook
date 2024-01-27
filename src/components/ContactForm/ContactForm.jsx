import {
  Form,
  Label,
  FormInput,
  Button,
  InputWrap,
} from './ContactForm.styled';

import { useState } from 'react';
import { nanoid } from 'nanoid';

const formNameId = nanoid();
const fornNumberId = nanoid();

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('hhhh');
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form
      onSubmit={e => {
        onSubmit(e, name, number);
        reset();
      }}
    >
      <InputWrap>
        <Label htmlFor={formNameId}>Name</Label>
        <FormInput
          onChange={handleChange}
          id={formNameId}
          type="text"
          name="name"
          value={name}
          required
        />
      </InputWrap>
      <InputWrap>
        <Label htmlFor={fornNumberId}>Number</Label>
        <FormInput
          onChange={handleChange}
          id={fornNumberId}
          type="tel"
          name="number"
          value={number}
          required
        />
      </InputWrap>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};
