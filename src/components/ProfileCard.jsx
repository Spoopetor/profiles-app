import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ProfileCard({ name, likes, id, likeHandler }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title className="h5 mb-1">{name}</Card.Title>
        <Card.Text className="mb-0">Likes: {likes}</Card.Text>
        <Button variant="primary" onClick={()=> likeHandler(id)}>
          Like
        </Button>
      </Card.Body>
    </Card>
  );
}