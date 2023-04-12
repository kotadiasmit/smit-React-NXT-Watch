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

export const VideoItemDetailsPageMainContainer = styled.div`
  margin-left: 230px;
  margin-top: 55px;
  overflow-y: scroll;
  background-color: ${props => (props.isLightTheme ? '#f9f9f9' : '#0f0f0f')};
  @media screen and (max-width: 577px) {
    margin-left: 0px;
  }
`
