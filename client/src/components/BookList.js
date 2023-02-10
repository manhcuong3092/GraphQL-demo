import React, { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import BookDetails from './BookDetails'

import { useQuery } from '@apollo/client'
import { getBooks } from '../graphql-client/queries'

const BookList = () => {
  const [bookSelected, setBookSelected] = useState(null);
  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p>...Loading books...</p>
  if (error) return <p>Error loading books!</p>

  return (
    <Row>
      <Col xs={8}>
        <div className="card-columns">
          {
            data.books.map(book =>
              <Card
                key={book.id}
                border='info'
                text='info'
                className='text-center shadow'
                onClick={() => setBookSelected(book.id)}>
                <Card.Body>{book.name}</Card.Body>
              </Card>)
          }
        </div>
      </Col>
      <Col xs={4}>
        <BookDetails bookId={bookSelected} />
      </Col>
    </Row>
  )
}

export default BookList