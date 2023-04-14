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
export const VideoCardPara = styled.p`
  color: ${props => (props.isLightTheme ? '#0f0f0f' : '#ffffff')};
  margin: 0px;
  font-size: 14px;
  font-weight: 400;
`
export const Like = styled.button`
  color: ${props => (props.isVideoLiked ? '#2563eb' : '#64748b')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin-left: 10px;
  margin-right: 0px;

  background-color: transparent;
  cursor: pointer;
  @media screen and (max-width: 577px) {
    margin-left: 0px;
    margin-right: 10px;
    margin-top: 8px;
  }
`
export const Dislike = styled.button`
  color: ${props => (props.isVideoDisLiked ? '#2563eb' : '#64748b')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin-left: 10px;
  margin-right: 0px;

  background-color: transparent;
  cursor: pointer;
  @media screen and (max-width: 577px) {
    margin-left: 0px;
    margin-right: 10px;
    margin-top: 8px;
  }
`
