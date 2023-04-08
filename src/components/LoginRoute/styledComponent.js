import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12%;
  height: 100vh;
  background-color: ${props => (props.isLightTheme ? '#ffffff' : '#231f20')};
`
export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${props =>
    props.isLightTheme ? '0px 4px 5px 5px #dedddd' : '0px 4px 5px 5px #1b2432'};
  border-radius: 5px;
  padding: 4%;
  background-color: ${props => (props.isLightTheme ? '#ffffff' : '#0f0f0f')};
`
export const LoginButton = styled.button`
  color: #ffffff;
  background-color: #3577e1;
  cursor: pointer;
  outline: none;
  width: 100%;
  border: none;
  height: 30px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
`
