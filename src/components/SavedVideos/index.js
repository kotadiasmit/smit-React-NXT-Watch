import './index.css'
import {Component} from 'react'

import {MdPlaylistAdd} from 'react-icons/md'
import {
  SavedVideosPageMainContainer,
  SavedVideosBannerContainer,
  SavedVideosBannerSubContainer,
  SavedVideosBannerPara,
} from './styleComponent'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import SideBar from '../SideBar'
// import SavedVideosRouteVideoCard from '../SavedVideosRouteVideoCard'

class SavedVideosRoute extends Component {
  state = {
    savedRouteVideosList: [],
  }

  renderNoVideos = fontColor => (
    <div className="not-videos-found-page-container">
      <img
        className="not-videos-found-page-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h1 className={`not-found-page-heading ${fontColor}`}>
        No saved videos Found
      </h1>
      <p style={{color: '#64748b', marginTop: '0px', textAlign: 'center'}}>
        You can save your videos while watching them
      </p>
    </div>
  )

  renderVideosList = fontColor => {
    const {savedRouteVideosList} = this.state
    if (savedRouteVideosList.length === 0) {
      return this.renderNoVideos(fontColor)
    }
    return (
      <ul className="saved-route-video-list-container">
        {savedRouteVideosList.map(eachVideo => (
          /* <SavedVideosRouteVideoCard
            videoDetails={eachVideo}
            key={eachVideo.id}
          /> */
        ))}
      </ul>
    )
  }

  bannerContainer = isLightTheme => (
    <SavedVideosBannerContainer
      isLightTheme={isLightTheme}
      data-testid="banner"
    >
      <SavedVideosBannerSubContainer isLightTheme={isLightTheme}>
        <MdPlaylistAdd size={30} color="#ff0000" />
      </SavedVideosBannerSubContainer>
      <SavedVideosBannerPara isLightTheme={isLightTheme}>
        SavedVideos
      </SavedVideosBannerPara>
    </SavedVideosBannerContainer>
  )

  render() {
    return (
      <ThemeContext.Consumer className="main-login-container">
        {value => {
          const {isLightTheme} = value
          const bgColor = isLightTheme ? 'saved-light' : ''
          const fontColor = isLightTheme ? '' : 'dark'
          return (
            <>
              <Header />
              <div className="main-container">
                <div className="sidebar-for-desktop">
                  <SideBar />
                </div>
                <SavedVideosPageMainContainer
                  isLightTheme={isLightTheme}
                  data-testid="saved"
                >
                  {this.bannerContainer(isLightTheme)}
                  <div className={`${bgColor} saved-page-container`}>
                    {this.renderVideosList(fontColor, isLightTheme)}
                  </div>
                </SavedVideosPageMainContainer>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default SavedVideosRoute
