
import React, {useState} from 'react';
import {OverlayTrigger, Spinner, Popover, Col, Row} from 'react-bootstrap';
import getRandomInt from '../functions/getRandomInt';
import { getWordSmartly } from '../functions/apiManager';
import GnizoButton from './widgets/GnizoButton';
import { XCircleFill } from 'react-bootstrap-icons';
import sanitize from '../functions/sanitize';

export default function SyriacWord(props) { 
  const {word} = props;   
  const [definition, setDefinition] = useState();
  const [show, setShow] = useState(false);

  const handleStudy = (word) => {
    var studyBank = localStorage.getItem('studyBank')
    studyBank = studyBank ? studyBank: '[]'
    studyBank = JSON.parse(studyBank)
    studyBank.push(word)
    localStorage.setItem("studyBank", JSON.stringify(studyBank))
  }

  const handleToggle = async () => {
    setShow(true)
    if (!definition) {
          let data = await getWordSmartly(word);
          if (data && data.length > 0) {
              let entry = data[0]
              //use .western instead of .syriac so that the user can view vowel diacritics
              setDefinition({
                syriac: entry.western,
                category: entry.category,
                meaning: entry.glosses.eng.join(', ')
              });
          } else {
              setDefinition({
                syriac: props.word,
                category: null,
                meaning: "No definition found."
              });
          }
      }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">
      <Row>
      <Col>
      {definition && definition.category}
      </Col>
      <Col md='auto' className='syriac-heading'>
      {definition ? definition.syriac: props.word}
      </Col>
      <Col md='auto'>
        <XCircleFill onClick={()=>setShow(false)}/>
      </Col>
      </Row>
      </Popover.Header>
      <Popover.Body>
      {definition ? sanitize(definition.meaning) : <Spinner variant="gnizo"/>}
      <hr/>
      <Row>
      <Col>
        <GnizoButton onClick={() => 
          handleStudy({word: definition.syriac, definition: sanitize(definition.meaning)})
          }>
            Add to Study Bank
        </GnizoButton>
      </Col>
      </Row>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
    <OverlayTrigger 
      key={getRandomInt()} 
      placement={"left"} 
      overlay={popover}
      show={show} 
      trigger="click"
      onToggle={()=>handleToggle()} 
    >
    <syriac-text active={show}>{word}</syriac-text>
    </OverlayTrigger>
    </>
  );
}