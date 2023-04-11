import styled from 'styled-components'

export const FailureViewRetryBtn = styled.button`
  width: 85px;
  height: 30px;
  border: none;
  color: #ffffff;
  background-color: #6366f1;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  align-self: center;
`

export const TrendingPageMainContainer = styled.div`
  margin-left: 230px;
  margin-top: 55px;
  overflow-y: scroll;
  background-color: ${props => (props.isLightTheme ? '#f9f9f9' : '#0f0f0f')};
  @media screen and (max-width: 577px) {
    margin-left: 0px;
  }
`
export const TrendingBannerContainer = styled.div`
  background-color: ${props => (props.isLightTheme ? '#ebebeb' : '#424242')};
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 15px;
`
export const TrendingBannerSubContainer = styled.div`
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
export const TrendingBannerPara = styled.h1`
  font-weight: 600;
  font-size: 20px;
  color: ${props => (props.isLightTheme ? '#0f0f0f' : '#ffffff')};
`
