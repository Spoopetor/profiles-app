import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';
import { Card } from 'react-bootstrap';

export default function App() {
  const [people, setPeople] = useState(profiles);
  const [newName, setNewName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")

  const addLike = (id) => {
    setPeople(ps => ps.map(p => p.id===id? { ...p, likes: p.likes+1 } : p));
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed){
      setAlertMessage("Name Cannot Be Empty!")
      setShowAlert(true);
      return;
    }
    
    if(people.some(p => p.name.toLowerCase() === trimmed.toLowerCase())){
      setAlertMessage("Name Already Exists!")
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    
    let newId = Math.max(...people.map(p => parseInt(p.id))) + 1;

    let newProfile = {
      id: newId,
      name: trimmed,
      likes: 0,
    }

    setPeople(people => [...people, newProfile]);
    setNewName('');

  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>
      <Row xs={1} md={2} lg={3}>
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard 
              name={p.name} 
              likes={p.likes} 
              id={p.id} 
              likeHandler={addLike}
            />
          </Col>
        ))}
      </Row>
      <Card className="p-3">
        <Card.Title>Add New Profile</Card.Title>
        <>{showAlert ? (<Alert
        variant='danger'
        onClose={() => setShowAlert(false)}
        dismissible
        >
          <Alert.Heading>{alertMessage}</Alert.Heading>

        </Alert>):<></>}
        </>
        
        
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
          type="text"
          placeholder='Enter Name'
          value={newName}
          onChange={handleNameChange}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Add Profile
        </Button>
      </Form>
      </Card>
    </Container>
  );
}