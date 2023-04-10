import styled from 'styled-components'

export const SideBarContainer = styled.div`
  background-color: ${props => (props.isLightTheme ? '#ffffff' : '#212121')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 53px;
  height: 92vh;
  max-height: 100vh;
  width: 230px;
  position: fixed;
  @media screen and (max-width: 576px) {
    padding-top: 2%;
    height: 50%;
    width: 100%;
  }
`

export const SideBarRouteList = styled.ul`
  padding-left: 0px;
  margin-top: 0px;
  padding-top: 5px;
`

export const SideBarRouteContainer = styled.li`
  display: flex;
  align-items: center;
  margin-top: 3px;
  margin-bottom: 3px;
  padding-left: 15px;
  background-color: ${props => props.isRouteSelected};
`
export const SideBarRouteName = styled.p`
  margin-left: 15px;
  margin-bottom: 8px;
  margin-top: 8px;
  font-size: 14px;
  color: ${props => (props.isLightTheme ? 'black' : '#ffffff')};
  font-weight: ${props => (props.isSelected ? 700 : 400)};
`
export const ContactUsHeading = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${props => (props.isLightTheme ? 'black' : '#ffffff')};
`

export const ContactUsPara = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${props => (props.isLightTheme ? 'black' : '#ffffff')};
  margin-bottom: 30px;
  margin-right: 10px;
`
