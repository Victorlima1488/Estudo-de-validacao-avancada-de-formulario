import styled from "styled-components"

const BaseButton = styled.button`
    padding: 0.8rem 1rem;
    background: #54bebb;
    border: 0;
    color: #393939;
    font-weight: bold;

    cursor: pointer;

    &:hover{
        background: #64a88c;
    }
`

export const MainStyle = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100vh;
    font-weight: bold;
    color: #393939;

    form{
        min-width: 18rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        padding: 1rem;
    }

`

export const DivForms = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    input{
        border: 1px solid gray;
        border-radius: 8px;
        height: 2rem;
        padding: 0 0.5rem;

        &:focus{
            outline: none;
        }
    }
`

export const ButtonTech = styled(BaseButton)`
    margin-left: 1rem;
    border-radius: 8px;
    padding: 0.6rem 0.8rem;
`

export const ButtonStyle = styled(BaseButton)`

`

export const ContainerTech = styled.div`
    display: flex;
    flex-direction: column;

    div{
        display: flex;
        gap: 0.5rem;
        margin-top: 0.8rem;
    }

    input{
        border: 1px solid gray;
        border-radius: 8px;
        height: 2rem;
        padding: 0 0.5rem;
        width: 12.4rem;

        &:focus{
            outline: none;
        }

        &:nth-child(2){
            width: 3rem;
        }
    }
`

export const SpanStyle = styled.span`
    margin-top: 0.3rem;
    color: red;
`