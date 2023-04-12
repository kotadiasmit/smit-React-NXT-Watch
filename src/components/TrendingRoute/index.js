import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {HiFire} from 'react-icons/hi'
import {
  FailureViewRetryBtn,
  TrendingPageMainContainer,
  TrendingBannerContainer,
  TrendingBannerSubContainer,
  TrendingBannerPara,
} from './styleComponent'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import SideBar from '../SideBar'
import TrendingRouteVideoCard from '../TrendingRouteVideoCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingRouteVideosList: [],
  }

  componentDidMount() {
    this.getVideosListApi()
  }

  getVideosListApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const TrendingRouteVideosFetchUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(TrendingRouteVideosFetchUrl, options)
    const data = await response.json()

    if (response.ok) {
      const camelCaseData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        publishedAt: each.published_at,
        viewCount: each.view_count,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        thumbnailUrl: each.thumbnail_url,
      }))
      // console.log(camelCaseData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        trendingRouteVideosList: camelCaseData,
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
    const {trendingRouteVideosList} = this.state
    if (trendingRouteVideosList.length === 0) {
      return this.renderNoVideos(isLightTheme)
    }
    return (
      <ul className="trending-route-video-list-container">
        {trendingRouteVideosList.map(eachVideo => (
          <TrendingRouteVideoCard videoDetails={eachVideo} key={eachVideo.id} />
        ))}
      </ul>
    )
  }

  renderVideosListFailureView = (failureView, fontColor) => (
    <div className="failure-view-container">
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
    </div>
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
    <TrendingBannerContainer isLightTheme={isLightTheme} data-testid="banner">
      <TrendingBannerSubContainer isLightTheme={isLightTheme}>
        <HiFire size={30} color="#ff0000" />
      </TrendingBannerSubContainer>
      <TrendingBannerPara isLightTheme={isLightTheme}>
        Trending
      </TrendingBannerPara>
    </TrendingBannerContainer>
  )

  render() {
    return (
      <ThemeContext.Consumer className="main-login-container">
        {value => {
          const {isLightTheme} = value
          const bgColor = isLightTheme ? 'trending-light' : ''
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
                <TrendingPageMainContainer
                  isLightTheme={isLightTheme}
                  data-testid="trending"
                >
                  {this.bannerContainer(isLightTheme)}
                  <div className={`${bgColor} trending-page-container`}>
                    {this.returnSwitchStatement(
                      failureView,
                      fontColor,
                      isLightTheme,
                    )}
                  </div>
                </TrendingPageMainContainer>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default TrendingRoute
