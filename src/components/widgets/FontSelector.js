import { Dropdown } from "react-bootstrap"



export default function FontSelector() {

    const handleSelect = (font) => {
        document.documentElement.style.setProperty('--syriac-font-family-normal', font + '-normal');
        document.documentElement.style.setProperty('--syriac-font-family-bold', font + '-bold');
    }

    return(
    <Dropdown onSelect={(font) => handleSelect(font)}>

    <Dropdown.Toggle variant="gnizo" id="dropdown-basic">Select Font</Dropdown.Toggle>
    <Dropdown.Menu>
        <Dropdown.Item eventKey="serto">Serto</Dropdown.Item>
        <Dropdown.Item eventKey="estrangelo">Estrangelo</Dropdown.Item>
        <Dropdown.Item eventKey="nestorian">Eastern</Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
    )
}