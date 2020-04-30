import styled from '@emotion/styled';

const Button = styled.a`
    font-weight: 700px;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin-right: 1rem;
    background-color: ${props => props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};
    cursor: pointer;
    &:last-of-type{
        margin-right: 0;
    }
`

export default Button;