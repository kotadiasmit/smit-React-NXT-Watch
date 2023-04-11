import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {GiGamepad} from 'react-icons/gi'
import {
  FailureViewRetryBtn,
  GamingPageMainContainer,
  GamingBannerContainer,
  GamingBannerSubContainer,
  GamingBannerPara,
} from './styleComponent'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import SideBar from '../SideBar'
import GamingRouteVideoCard from '../GamingRouteVideoCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingRouteVideosList: [],
  }

  componentDidMount() {
    this.getVideosListApi()
  }

  getVideosListApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const GamingRouteVideosFetchUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(GamingRouteVideosFetchUrl, options)
    const data = await response.json()

    if (response.ok) {
      const camelCaseData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        viewCount: each.view_count,
        thumbnailUrl: each.thumbnail_url,
      }))
      // console.log(camelCaseData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        gamingRouteVideosList: camelCaseData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onSearchRetryClicked = () => {
    this.getVideosListApi()
  }

  renderNoVideos = fontColor => (
    <div className="not-videos-found-page-container">
      <img
        className="not-videos-found-page-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1 className={`not-found-page-heading ${fontColor}`}>
        No Search results Found
      </h1>
      <p style={{color: '#64748b', marginTop: '0px', textAlign: 'center'}}>
        Try different key words or remove search filter
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.onSearchRetryClicked}
      >
        Retry
      </button>
    </div>
  )

  renderVideosList = isLightTheme => {
    const {gamingRouteVideosList} = this.state
    if (gamingRouteVideosList.length === 0) {
      return this.renderNoVideos(isLightTheme)
    }
    return (
      <ul className="gaming-route-video-list-container">
        {gamingRouteVideosList.map(eachVideo => (
          <GamingRouteVideoCard videoDetails={eachVideo} key={eachVideo.id} />
        ))}
      </ul>
    )
  }

  renderVideosListFailureView = (failureView, fontColor) => (
    <>
      <img className="failure-view-img" alt="failure view" src={failureView} />
      <h1 className={`not-found-page-heading ${fontColor}`}>
        Oops! Something Went Wrong
      </h1>
      <p
        style={{
          color: '#64748b',
          marginTop: '0px',
          textAlign: 'center',
        }}
      >
        We are having some trouble to complete your request. Please try again.
      </p>
      <FailureViewRetryBtn
        className="retry-btn"
        type="button"
        onClick={this.onSearchRetryClicked}
      >
        Retry
      </FailureViewRetryBtn>
    </>
  )

  renderLoadingView = isLightTheme => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color={isLightTheme ? '#0f0f0f' : '#ffffff'}
        height="50"
        width="50"
        data-testid="loader"
      />
    </div>
  )

  returnSwitchStatement = (failureView, fontColor, isLightTheme) => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosList(fontColor)
      case apiStatusConstants.failure:
        return this.renderVideosListFailureView(failureView, fontColor)
      case apiStatusConstants.inProgress:
        return this.renderLoadingView(isLightTheme)
      default:
        return null
    }
  }

  bannerContainer = isLightTheme => (
    <GamingBannerContainer isLightTheme={isLightTheme} data-testid="banner">
      <GamingBannerSubContainer isLightTheme={isLightTheme}>
        <GiGamepad size={30} color="#ff0000" />
      </GamingBannerSubContainer>
      <GamingBannerPara isLightTheme={isLightTheme}>Gaming</GamingBannerPara>
    </GamingBannerContainer>
  )

  render() {
    return (
      <ThemeContext.Consumer className="main-login-container">
        {value => {
          const {isLightTheme} = value
          const bgColor = isLightTheme ? 'gaming-light' : ''
          const fontColor = isLightTheme ? '' : 'dark'
          const failureView = isLightTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          return (
            <>
              <Header />
              <div className="main-container">
                <div className="sidebar-for-desktop">
                  <SideBar />
                </div>
                <GamingPageMainContainer
                  isLightTheme={isLightTheme}
                  data-testid="gaming"
                >
                  {this.bannerContainer(isLightTheme)}
                  <div className={`${bgColor} gaming-page-container`}>
                    {this.returnSwitchStatement(
                      failureView,
                      fontColor,
                      isLightTheme,
                    )}
                  </div>
                </GamingPageMainContainer>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default GamingRoute
