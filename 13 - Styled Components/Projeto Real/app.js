import React from 'react';
import styled, {css, keyframes} from 'styled-components'


const PaginationWrapper = styled.div `
    display: flex;
    width:100%;
    justify-content: ${({page}) =>{
        if (page === 'first') return 'flex-end';
        else if (page === 'midlde') return 'space-between';
        else return 'flex-start'
    }};
`;

const App = () => {
    return (
        <MainWrapper>
            <Button primary> Primary button </Button>
            <Button> My button </Button>
            <PaginationWrapper>
                 <Button > 2 </Button>
                 <Button > 4 </Button>
            </PaginationWrapper>
        </MainWrapper>
    );
}