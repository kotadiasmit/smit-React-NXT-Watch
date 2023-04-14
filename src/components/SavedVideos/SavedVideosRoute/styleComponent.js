import styled from 'styled-components'

export const SavedVideosPageMainContainer = styled.div`
  margin-left: 230px;
  margin-top: 55px;
  overflow-y: scroll;
  background-color: ${props => (props.isLightTheme ? '#f9f9f9' : '#0f0f0f')};
  @media screen and (max-width: 577px) {
    margin-left: 0px;
  }
`
export const SavedVideosBannerContainer = styled.div`
  background-color: ${props => (props.isLightTheme ? '#ebebeb' : '#424242')};
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 1px;
  padding: 15px;
  @media screen and (max-width: 577px) {
    margin-top: 10px;
  }
`
export const SavedVideosBannerSubContainer = styled.div`
  height: 50px;
  width: 50px;
  margin-right: 10px;
  border-radius: 80px;
  background-color: ${props => (props.isLightTheme ? '#f1f5f9' : '#313131')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const SavedVideosBannerPara = styled.h1`
  font-weight: 600;
  font-size: 20px;
  color: ${props => (props.isLightTheme ? '#0f0f0f' : '#ffffff')};
`
