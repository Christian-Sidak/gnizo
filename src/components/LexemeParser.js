import React, {useEffect, useState} from 'react';
import { Test, QuestionGroup, Option } from 'react-multiple-choice';
import NoWords from './widgets/NoWords';
import CenteredSpinner from './widgets/CenteredSpinner';
import { getWord } from '../functions/apiManager';
import { Container, Row, Col } from 'react-bootstrap';
import GnizoButton from './widgets/GnizoButton';
import delay from '../functions/delay';
const constants = require('../common/constants.json')


const paradigm = require('../resources/paradigmOntology.json')

function addQuestion(questions, question, options, type) {
    questions.push({"question": question, "options": options, "type": type})
}

function makeQuestions(word){
    var questions = []
    if (word.gender) {addQuestion(questions, "Select subject gender", paradigm.gender, "gender")}
    if (word.kaylo) {addQuestion(questions, "Select the Kaylo", paradigm.kaylo, "kaylo")}
    if (word.number) {addQuestion(questions, "Select subject number", paradigm.number, "number")}
    if (word.person) {addQuestion(questions, "Select person", paradigm.person, "person")}
    if (word.suffixGender) {addQuestion(questions, "Select suffix gender", paradigm.gender, "suffixGender")}
    if (word.suffixNumber) {addQuestion(questions, "Select suffix number", paradigm.number, 'suffixNumber')}
    if (word.suffixType) {addQuestion(questions, "Select suffix type", paradigm.suffixType, "suffixType")}
    if (word.tense) {addQuestion(questions, "Select tense", paradigm.tense, "tense")}
    return questions
}

export default function LexemeParser() {

    const words = JSON.parse(localStorage.getItem("studyBank")  ?? '[]');
    const [word, setWord] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState({});
    const [options, setOptions] = useState();
    const [showAnswer, setShowAnswer] = useState(false);

    const loadWord = async() => {
        const words = JSON.parse(localStorage.getItem("studyBank") ?? '[]');
        const syriacString = words[0].word;
        const results = await getWord(syriacString);
        const word = results[0];
        const questions = makeQuestions(word);
        setQuestions(questions);
        setWord(word);
    }

    useEffect(() => {
        if (words.length > 0 && !word) {
            loadWord();
        }
    }, [word, words.length]);

    const gradeAnswer = (answer) => {
        const question = questions[questionIndex];
        if (word[question.type] === answer) {
            setScore(score + 1);
            setQuestionIndex(questionIndex + 1);
        } else {
            setScore(score - 1);
            setOptions({});
        }
    }

    //The RMC package requires inline styling unfortunately, See:
    //https://www.npmjs.com/package/react-multiple-choice/v/2.0.1
    const optionStyle ={
        icon: {
            color: "grey"
        },
        option: {
            backgroundColor:"aliceblue",
            boxShadow:"0px",
            borderRadius: "0.375rem"
        }
    }

    const testStyle = {
        width:"50%"
    }

    if (words.length === 0) {
        //Catch if there are no words in the study bank.
        return(<NoWords/>);
    } else if (!word) {
        return(<CenteredSpinner/>);
    } else if (questions.length > questionIndex && word) {
        const question = questions[questionIndex];
        return (
            <Container className="padded"> 

            <Row>
            <Col xs lg="2">
            <h3>Score {score}</h3>
            <br></br>
            <GnizoButton onClick={()=> setQuestionIndex(questionIndex + 1)}>
            Skip
            </GnizoButton>
            <br></br>
            <GnizoButton onClick={()=> setShowAnswer(true)}>
            Show Answer
            </GnizoButton>
            <br></br>
            <p>{words.length} words remaining.</p>
            <br></br>
            {showAnswer && <b>{word[questions[questionIndex].type]}</b>}
            </Col>

            <Col xs lg="7">
            <Test style={testStyle} onOptionSelect={options => {
                gradeAnswer(options[questionIndex]);
            }}>
            
            <h3>{question.question}</h3>
            <br></br>
            <QuestionGroup questionNumber={questionIndex}>
            {question.options.map(option =>
                <Option
                    key={option}
                    style={optionStyle} 
                    value={option}>
                        {option}
                </Option>)
            }
            </QuestionGroup>
            </Test>
            </Col>

            <Col xs lg="2">            
            <h3>{word.western}</h3>
            <br></br>
            <p>{words[0].definition}</p>
            </Col>

            </Row>
            </Container>
        );
    } else  {
        //If we have questions left, then update the study bank cache and reload.
        delay(3).then(() => {
            const regex = new RegExp(['[^', ...constants.syriacConsonants, ']'].join(''), 'g');
            let studyBank = words.filter(w => 
                w.word.replace(regex, '') !== word.western.replace(regex, '')
            );

            localStorage.setItem("studyBank", JSON.stringify(studyBank));

            if (studyBank.length > 0) {
                loadWord().then(window.location.reload());
            } else {
                window.location.reload();
            };
        
        });
        return(
            <Container className="centering padded">
                <p>You completed all questions. Your final score is {score}.</p>
            </Container>
        );
    }
}