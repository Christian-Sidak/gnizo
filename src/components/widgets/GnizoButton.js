import { Button } from "react-bootstrap";


//Unfortunately bootstrap custom variants force us to use in-line styling in this case :(
export default function GnizoButton(props) {

    const style = `.btn-gnizo {
        background-color: aliceblue;
        color: var(--bs-nav-link-color);
        margin: 5px 0px;
        padding: 5px;
        border-radius: 0.375rem;
        width: 100%;
    }
        .btn-gnizo:hover {
            background-color: lightslategray;
        }
    `;

    return(
        <>
        <style type="text/css">
            {style}
        </style>
        <Button variant = 'gnizo' onClick={props.onClick}>
            {props.children}
        </Button>
        </>
    );
}