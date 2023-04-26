import {Container, Navbar, Nav} from 'react-bootstrap';
import FontSelector from './widgets/FontSelector';

export default function Header() {
    return(
        <Navbar expand="lg">
        <Container>
            <Navbar.Brand href="/">Gnizo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/toc">Read Ancient Texts</Nav.Link>
                <Nav.Link href="/lexeme">Parse Lexemes</Nav.Link>
                <Nav.Link href="/vocabulary">Review Vocabulary</Nav.Link>
                <Nav.Link href="/verbs">Conjugate Verbs</Nav.Link>
                <Nav.Link href="/about">About this Site</Nav.Link>
            </Nav>
            <FontSelector/>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}