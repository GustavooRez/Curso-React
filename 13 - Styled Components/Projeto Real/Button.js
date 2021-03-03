import React from 'react';
import styled, {css} from 'styled-components'

import {Wrapper, FadeIn} from './styled';


const OutterWrapper = styled.div`
width: 100%;
background-color: blueviolet;
margin-top: 2rem;

&:hover ${StyledButton}{
    color: red;
}
`

const StyledButton = styled.button`
    background-color: white;
    color: palevioletred.
    font-size: 1.2rem;
    margin: ${({margin}) => margin || '2rem'};
    padding: 0.5rem 1rem;
    border: 1px solid palevioletred;
    border-radius: 3px;
    animation: 2s ${FadeIn} ease-in;

    ${({primary}) =>
     primary &&
     css`
        background-color:palevioletred;
        color:white;
        box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
        `}

 &:hover{
    color: white;
    background-color:palevioletred;
}


`;

const SuperButton = styled(StyledButton) `
    font-size: 2.5rem;
`;

const Button = ({ primary, margin, children }) => {
    return (
        <Wrapper>
            <StyledButton margin={margin} primary={primary}>
                {children}
                <p className="someClass"> Text </p>
            </StyledButton>
        </Wrapper>
    );
};

export default Button;