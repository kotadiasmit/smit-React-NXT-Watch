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
  VideoCardPara,
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
          subscriberCount: videoDetails.channel.subscriber_count,
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

  renderVideoItemDetails = (
    fontColor,
    isLightTheme,
    saveVideo,
    savedVideosList,
    videoLiked,
    likedVideosList,
    disLikedVideosList,
    videoDisLiked,
  ) => {
    const {videoDetailObject} = this.state
    function onSaveVideo() {
      saveVideo(videoDetailObject)
    }
    const isVideoSaved = savedVideosList.find(
      each => videoDetailObject.id === each.id,
    )
    const savedVideoColorClass = isVideoSaved ? 'blue-color' : ''
    // console.log(Object.keys(videoDetailObject))
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

    function onLikeVideo() {
      videoLiked(id)
    }
    function onDisLikeVideo() {
      videoDisLiked(id)
    }
    const isVideoLiked = likedVideosList.includes(id)
    const isVideoDisLiked = disLikedVideosList.includes(id)
    const likedColorClass = isVideoLiked ? 'blue-color' : ''
    const disLikedColorClass = isVideoDisLiked ? 'blue-color' : ''

    if (videoDetailObject.length === 0) {
      return this.renderNoVideos(isLightTheme)
    }
    return (
      <div className="video-item-details-container">
        <div className="react-player">
          <ReactPlayer
            url={videoUrl}
            controls
            width="100%"
            height="100%"
            alt={`${title} Video`}
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
          <div className="like-save-btn-container">
            <button type="button" className="btn" onClick={onLikeVideo}>
              <BiLike color={isVideoLiked ? '#075ac6' : '#7e8b9e'} size={20} />
              <p className={`other-video-card-detail ${likedColorClass}`}>
                Like
              </p>
            </button>
            <button type="button" className="btn" onClick={onDisLikeVideo}>
              <BiDislike
                color={isVideoDisLiked ? '#075ac6' : '#7e8b9e'}
                size={20}
              />
              <p className={`other-video-card-detail ${disLikedColorClass}`}>
                Dislike
              </p>
            </button>
            <button type="button" className="btn" onClick={onSaveVideo}>
              <MdPlaylistAdd
                color={isVideoSaved ? '#075ac6' : '#7e8b9e'}
                size={22}
              />
              <p className={`other-video-card-detail ${savedVideoColorClass}`}>
                {isVideoSaved ? 'Saved' : 'Save'}
              </p>
            </button>
          </div>
        </div>
        <hr />
        <div className="video-item-card-detail">
          <img
            src={profileImageUrl}
            className="trending-profile-img"
            alt="channel logo"
          />
          <div>
            <VideoCardPara isLightTheme={isLightTheme}>{name}</VideoCardPara>
            <p className="other-video-item-card-detail">{`${subscriberCount} subscribers`}</p>
            <VideoCardPara isLightTheme={isLightTheme}>
              {description}
            </VideoCardPara>
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

  returnSwitchStatement = (
    failureView,
    fontColor,
    isLightTheme,
    saveVideo,
    savedVideosList,
    videoLiked,
    likedVideosList,
    disLikedVideosList,
    videoDisLiked,
  ) => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoItemDetails(
          fontColor,
          isLightTheme,
          saveVideo,
          savedVideosList,
          videoLiked,
          likedVideosList,
          disLikedVideosList,
          videoDisLiked,
        )
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
          const {
            isLightTheme,
            saveVideo,
            savedVideosList,
            videoLiked,
            likedVideosList,
            disLikedVideosList,
            videoDisLiked,
          } = value
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
                      saveVideo,
                      savedVideosList,
                      videoLiked,
                      likedVideosList,
                      disLikedVideosList,
                      videoDisLiked,
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
