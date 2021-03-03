import React from 'react';
import styled, {css, keyframes} from 'styled-components'

export const Wrapper = styled.section`
    margin-top: 2rem;
    background-color: paleturquoise;
`;


export const FadeIn = keyframes`
    0%{
        opacity: 0;
    }

    100%{
        opacity: 1;
    }
`;