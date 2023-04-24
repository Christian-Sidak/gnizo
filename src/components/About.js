import { Card } from "react-bootstrap"

export default function About() {
    return(
        <div className="text-article">
        <Card.Body>
        <Card.Title>Welcome to Gnizo</Card.Title>
        <Card.Text>This website was created to help in the study of Syriac. Our text section allows
        you to read from over 500 classical Syriac texts, including the Peshitta, St. Ephrem, and St. Jacob of Sarug.
        Click on a word to see its definition, and optionally add it to your study bank. Then in the Review Vocabulary section, 
        you can drill vocabulary that you have added to your study bank. Optionally, you can parse the tense, mood, and
        gender of words in your study bank in the Parse Lexemes section.
        </Card.Text>
        
        <Card.Title>Special Thanks</Card.Title>
        <Card.Text>
        This website wouldn't be possible without the many years of 
        hard work by <a target="_blank" rel="noreferrer" href="https://sedra.bethmardutho.org/">George Kiraz and Beth Mardutho.</a>
        This project uses the Sedra API for Syriac parsing and translation.
        This project also owes special thanks to the <a target="_blank" rel="noreferrer" href="https://github.com/srophe/syriac-corpus">Oxford-BYU Syriac Corpus</a>, 
        which has streamlined the digitization of hundreds of Syriac texts.
        Finally, acknowledgement is due to Professor Emeritus Wheeler Thackston of Harvard University, whose years of Syriac instruction inspired me to create this website.
        </Card.Text>

        <Card.Title>Developers</Card.Title>
        <Card.Text>You can star, fork, or contribute to our Github <a target="_blank" rel="noreferrer" href="https://github.com/Christian-Sidak/Gnizo">here</a></Card.Text>  
        
        </Card.Body>
        </div>
    );
}