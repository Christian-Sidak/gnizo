import { Card } from "react-bootstrap"


export default function NoWords() {
    return(
        <div className="text-article">
        <Card.Body>
        <Card.Title>No words left!</Card.Title>
        <Card.Text>You must add words to your study bank from the Reader section in order to drill/parse them.
        </Card.Text>
        </Card.Body>
        </div>
    );
}