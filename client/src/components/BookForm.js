import { useQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { addSingleBook } from '../graphql-client/mutations';
import { getAuthors, getBooks } from '../graphql-client/queries';

const BookForm = () => {

  const { loading, error, data } = useQuery(getAuthors);
  const [addBook, dataMutation] = useMutation(addSingleBook);

  const [newBook, setNewBook] = useState({
    name: '',
    genre: '',
    authorId: ''
  });

  const { name, genre, authorId } = newBook;

  const onInputChange = event => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault();
    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooks }]
    });
    setNewBook({ name: '', genre: '', authorId: '' })
    console.log(dataMutation);
  }

  return (
    <Form onSubmit={onSubmit} >
      <Form.Group>
        <Form.Control type='text' placeholder='Book name' onChange={onInputChange} name='name' value={name} />
      </Form.Group>
      <Form.Group>
        <Form.Control type='text' placeholder='Book genre' onChange={onInputChange} name='genre' value={genre} />
      </Form.Group>
      <Form.Group>
        {loading ? <p>Loading authors...</p> : (
          <Form.Select name='authorId' value={authorId} onChange={onInputChange} required>
            <option value={''} disabled>Select author</option>
            {data.authors.map(author =>
              <option key={author.id} value={author.id}>{author.name}</option>
            )}
          </Form.Select>
        )}
      </Form.Group>
      <Button className='float-right' variant='info' type='submit'>
        Add book
      </Button>
    </Form>
  )
}

export default BookForm