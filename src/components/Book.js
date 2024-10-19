import styled from 'styled-components';

import BookContainer from './BookContainer';
//import InputBook from './InputBook';

const BooksContainer = styled.div`
    padding: 1.8rem 6rem 16rem
`;

const Books = () => (
    <BooksContainer>
        <BookContainer />
        <hr />
        {
        //<InputBook />
        }
    </BooksContainer>
);

export default Books;