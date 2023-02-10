import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BookForm from './BookForm'
import AuthorForm from './AuthorForm.js'

const Forms = () => {
  return (
    <Row>
      <Col xs={6}>
        <BookForm />
      </Col>
      <Col xs={6}>
        <AuthorForm />
      </Col>
    </Row>
  )
}

export default Forms