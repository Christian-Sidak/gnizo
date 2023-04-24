import {Container, Row, Col, Spinner} from 'react-bootstrap'


export default function CenteredSpinner() {
    return (
        <Container className="padded">
        <Row className='spacer'/>
        <Row>
        <Col>
        <Spinner variant="gnizo"/>
        </Col>
        </Row>
        </Container>
    );
}