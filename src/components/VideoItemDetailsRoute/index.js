import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {MdPlaylistAdd} from 'react-icons/md'
import {BiDislike, BiLike} from 'react-icons/bi'
import {
  FailureViewRetryBtn,
  VideoItemDetailsPageMainContainer,
} from './styleComponent'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import SideBar from '../SideBar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetailObject: {},
  }

  componentDidMount() {
    this.getVideoItemDetailsApi()
  }

  getVideoItemDetailsApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const VideoItemDetailsRouteVideosFetchUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(VideoItemDetailsRouteVideosFetchUrl, options)
    const data = await response.json()
    const videoDetails = data.video_details
    if (response.ok) {
      const camelCaseData = {
        description: videoDetails.description,
        id: videoDetails.id,
        title: videoDetails.title,
        publishedAt: videoDetails.published_at,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.subscriber_count,
        },
        thumbnailUrl: videoDetails.thumbnail_url,
      }
      console.log(camelCaseData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        videoDetailObject: camelCaseData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onSearchRetryClicked = () => {
    this.getVideoItemDetailsApi()
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

  renderVideoItemDetails = (fontColor, isLightTheme) => {
    const {videoDetailObject} = this.state
    console.log(Object.keys(videoDetailObject))
    const {
      description,
      id,
      title,
      publishedAt,
      videoUrl,
      viewCount,
      channel,
      thumbnailUrl,
    } = videoDetailObject
    const {name, profileImageUrl, subscriberCount} = channel
    if (videoDetailObject.length === 0) {
      return this.renderNoVideos(isLightTheme)
    }
    return (
      <div className="video-item-details-container">
        <div className="react-player">
          <ReactPlayer
            url={videoUrl}
            controls="true"
            width="100%"
            height="100%"
          />
        </div>
        <p className={`video-item-heading ${fontColor}`}>{title}</p>
        <div className="item-views-like-save-container">
          <div className="views-published-container">
            <p className="other-video-card-detail">{`${viewCount} views`}</p>
            <p className="other-video-card-detail font-size">
              <sup>.</sup>
            </p>
            <p className="other-video-card-detail">{publishedAt}</p>
          </div>
          <div>
            <BiLike />
            <BiDislike />
            <MdPlaylistAdd />
          </div>
        </div>
      </div>
    )
  }

  renderVideoItemDetailsFailureView = (failureView, fontColor) => (
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
        return this.renderVideoItemDetails(fontColor)
      case apiStatusConstants.failure:
        return this.renderVideoItemDetailsFailureView(failureView, fontColor)
      case apiStatusConstants.inProgress:
        return this.renderLoadingView(isLightTheme)
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer className="main-login-container">
        {value => {
          const {isLightTheme} = value
          const bgColor = isLightTheme ? 'videoItemDetails-light' : ''
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
                <VideoItemDetailsPageMainContainer
                  isLightTheme={isLightTheme}
                  data-testid="videoItemDetails"
                >
                  <div className={`${bgColor} videoItemDetails-page-container`}>
                    {this.returnSwitchStatement(
                      failureView,
                      fontColor,
                      isLightTheme,
                    )}
                  </div>
                </VideoItemDetailsPageMainContainer>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default VideoItemDetailsRoute
