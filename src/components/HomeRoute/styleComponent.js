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

export const HomePageMainContainer = styled.div`
  margin-left: 230px;
  margin-top: 55px;
  background-color: ${props => (props.isLightTheme ? '#f9f9f9' : '#181818')};
  @media screen and (max-width: 577px) {
    margin-left: 0px;
  }
`
export const HomeBannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
`
