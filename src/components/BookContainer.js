import styled from 'styled-components';

import Book from './Book';

const Container = styled.div`
    display: grid
`;

const BookList = () => {
    const books = [];

    if (books.length === 0) return <h2>No vooks Added yet</h2>

    return (
        <Container>
            {books.map(book => {
                <Book key={book.id} title={book.title} author={book.author} />
            })}
        </Container>
    );
};

export default BookList;