
import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import SyriacWord from './SyriacWord';
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
import { getText } from '../functions/apiManager';
import CenteredSpinner from './widgets/CenteredSpinner';
const constants = require('../common/constants.json');


function makeLine(line) {
    let words = line.split(' ');
    return(
        <Row className='syriac-word-in-line'>
            <p>
            {words.map(word => {
                if (constants.punctuation.includes(word)) {
                    return <nobr>{word}</nobr>;
                } else {
                    return (<nobr>&nbsp;<SyriacWord word={word}/></nobr>);
                }
            })}
            </p>
        </Row>
    );
}

export default function TextReader() {
    const { file } = useParams();
    const safeFile = file ? file : '1.json';
    let totalPages = 0;
    const [page, setPage] = useState(0)
    const [text, setText] = useState()

    useEffect(() => {
        async function loadText() {
            const text = await getText(safeFile);
            setText(text);
        }
        if (!text) {
            loadText();
        }
    }, [text, safeFile]);

    function nextPage() {
        setPage(Math.min(totalPages - 1, page + 1));
    }

    function previousPage() {
        setPage(Math.max(0, page - 1));
    }

    if (text) {
        totalPages = Math.ceil(text.lines.length / 10.0);
        return(
            <>
            <Container className="text-container">
            {text.lines.slice(page * 10, Math.min(totalPages * 10, (page * 10) + 10)).map(line => makeLine(line))}
            
            </Container>
            <div>
            <Row className="fixed-bottom reader-footer">
            <Col md='auto' className="author"><div className='nav-link'>{text.author}</div></Col>
            <Col><ArrowLeft onClick={() => previousPage()}/></Col>
            <Col><div className='nav-link'>Page {page + 1} of {totalPages}</div></Col>
            <Col><ArrowRight onClick={() => nextPage()}/></Col>
            <Col md='auto'><div className='nav-link'>{text.title}</div></Col>
            </Row>
            </div>
            </>
        );
    } else {
        return(<CenteredSpinner/>);
    }
}
