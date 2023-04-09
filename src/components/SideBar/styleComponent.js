import styled from 'styled-components'

export const SideBarContainer = styled.div`
  background-color: ${props => (props.isLightTheme ? '#f9f9f9f9' : '#212121')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90vh;
  width: 230px;
  @media screen and (max-width: 576px) {
    display: none;
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
`
