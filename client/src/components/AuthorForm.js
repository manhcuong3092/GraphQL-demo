import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { addSingleAuthor } from '../graphql-client/mutations';
import { getAuthors } from '../graphql-client/queries';

const AuthorForm = () => {

  const [addAuthor, dataMutation] = useMutation(addSingleAuthor);

  const [newAuthor, setNewAuthor] = useState({
    name: '',
    age: '',
  });

  const { name, age } = newAuthor;

  const onInputChange = event => {
    setNewAuthor({
      ...newAuthor,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault();
    addAuthor({
      variables: { name, age: parseInt(age) },
      refetchQueries: [{ query: getAuthors }]
    });
    setNewAuthor({ name: '', age: '' })
    console.log(dataMutation);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className='invisible'>
        <Form.Control />
      </Form.Group>
      <Form.Group>
        <Form.Control type='text' placeholder='Author name' onChange={onInputChange} name='name' value={name} />
      </Form.Group>
      <Form.Group>
        <Form.Control type='number' placeholder='Author age' onChange={onInputChange} name='age' value={age} />
      </Form.Group>
      <Button className='float-right' variant='info' type='submit'>
        Add Author
      </Button>
    </Form>
  )
}

export default AuthorForm