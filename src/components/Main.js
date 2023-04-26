import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LexemeParser from './LexemeParser';
import TableOfContents from './TableOfContents';
import TextReader from './TextReader';
import Header from './Header';
import Vocabulary from './Vocabulary';
import About from './About';
import VerbParadigm from './VerbParadigm';


export default function Main() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Navigate to="/toc"/>}/>
          <Route path="/lexeme" element={<LexemeParser/>}/>
          <Route path="/reader" element={<TextReader/>}/>
          <Route path="/reader/:file" element={<TextReader/>}/>
          <Route path="/toc" element={<TableOfContents/>}/>
          <Route path="/vocabulary" element={<Vocabulary/>}/>
          <Route path="/verbs" element={<VerbParadigm/>}/>
          <Route path="/about" element={<About/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}
