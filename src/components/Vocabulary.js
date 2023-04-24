import { Container, Row, Col, Form, Card } from "react-bootstrap";
import { useState} from "react";
import NoWords from './widgets/NoWords'
import delay from "../functions/delay";

export default function Vocabulary() {

    let words = JSON.parse(localStorage.getItem("studyBank") ?? '[]');
    const [answer, setAnswer] = useState();
    const [word, setWord] = useState(words.length > 0 ? words[0]: null);
    const [result, setResult] = useState();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            document.getElementById("answer-form").value = "";
            validateResult();
        }
    }

    const validateResult = async () => {
        if (word.definition.includes(answer.toLowerCase())) {
            setResult({
                title: "Correct!",
                text: "Other Acceptable Answers: " + word.definition}
            );
            const studyBank = words.filter(w => w.word !== word.word);
            localStorage.setItem("studyBank", JSON.stringify(studyBank));
            await delay(5);
            setWord(studyBank.length > 0 ? studyBank[0]: null);
            setAnswer();
            setResult();
        } else{
            setResult({
                title:"Incorrect.",
                text: "Acceptable Answers: " + word.definition
            });
        }
    }

    if (words.length > 0) {
        return(
            <Container className="padded">
            <Row>
            <Col md="auto">
            <h3>{words.length} {words.length === 1 ? "word": "words"} left</h3>
            </Col>
            <Col className="syriac-heading">
            <h3>{words[0].word}</h3>
            </Col>
            </Row>

            <Row>
            <Col>
                <Form.Control
                id="answer-form"
                type="text" 
                onChange={(e) => setAnswer(e.target.value)} 
                onKeyDown={handleKeyDown} 
                placeholder="Type the answer in English."/>
            </Col>
            </Row>

            <Row>
            <Col>
            {result && <Card className="answer-card">
            <Card.Title>{result.title}</Card.Title>
            <Card.Body>{result.text}</Card.Body>
            </Card>}
            </Col>
            </Row>

            </Container>
        );
    } else {
        return(<NoWords/>);
    }
    
}