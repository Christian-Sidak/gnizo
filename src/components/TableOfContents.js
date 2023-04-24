import Container from 'react-bootstrap/Container';
import {Book} from 'react-bootstrap-icons';
const FilterableTable = require('react-filterable-table');


export default function TableOfContents() {

    let texts = require('../resources/mapping.json');

    const renderIcon = (props) => {
        return (
            <a href={"../reader/" + props.record.file}><Book className='icon'/></a>
        );
    };

    const fields = [
        { name: 'file', displayName: '', render: renderIcon},
        { name: 'author', displayName: "Author", inputFilterable: true, exactFilterable: true, sortable: true },
        { name: 'title', displayName: "Title", inputFilterable: true, exactFilterable: true,},
        { name: 'subtitle', displayName: "Collection", inputFilterable: true, exactFilterable: true, sortable: true},
        { name: 'syriacTitle', displayName: "Syriac Title", inputFilterable: true, exactFilterable: true, sortable: true},
    ];

    return(
        <div>
        <Container className='padded'>
        <FilterableTable
        initialSort="author"
        initialSortDir={true}
        data={texts}
        fields={fields}
        topPagerVisible={false}
	    noRecordsMessage="There are no texts to display"
	    noFilteredRecordsMessage="No texts match your filters!"
        />
        </Container>
        </div>
    );
}