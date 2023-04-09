import styled from 'styled-components'

export const NavHeader = styled.nav`
  background-color: ${props => (props.isLightTheme ? '#f9f9f9f9' : '#212121')};
  padding: 2px 25px 2px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
`

export const LogoutDesktopBtn = styled.button`
  color: ${props => (props.isLightTheme ? '#3b82f6' : '#ffffff')};
  background-color: transparent;
  border: ${props =>
    props.isLightTheme ? '2px solid #3b82f6' : '2px solid #ffffff'};
  cursor: pointer;
  outline: none;
  width: 90px;
  height: 30px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14.5px;
`
