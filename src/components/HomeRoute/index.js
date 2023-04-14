import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineClose} from 'react-icons/ai'
import {
  FailureViewRetryBtn,
  HomePageMainContainer,
  HomeBannerContainer,
} from './styleComponent'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import SideBar from '../SideBar'
import HomeRouteVideoCard from '../HomeRouteVideoCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    homeRouteVideosList: [],
    closeBanner: false,
  }

  componentDidMount() {
    this.getVideosListApi()
  }

  getVideosListApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const homeRouteVideosFetchUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(homeRouteVideosFetchUrl, options)
    const data = await response.json()
    const GamingRouteVideosFetchUrl = `https://apis.ccbp.in/videos/gaming`
    const GamingRouteVideosResponse = await fetch(
      GamingRouteVideosFetchUrl,
      options,
    )
    const GamingData = await GamingRouteVideosResponse.json()

    let camelCaseData = []

    if (response.ok) {
      const homeCamelCaseData = data.videos.map(each => ({
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
      camelCaseData = [...homeCamelCaseData]
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }

    if (GamingRouteVideosResponse.ok) {
      const GamingCamelCaseData = GamingData.videos.map(each => ({
        id: each.id,
        title: each.title,
        publishedAt: `${Math.ceil(Math.random() * 3)} years ago`,
        viewCount: each.view_count,
        channel: {
          name: each.title,
          profileImageUrl: each.thumbnail_url,
        },
        thumbnailUrl: each.thumbnail_url,
      }))
      camelCaseData = [...camelCaseData, ...GamingCamelCaseData]
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
    this.setState({
      apiStatus: apiStatusConstants.success,
      homeRouteVideosList: camelCaseData,
    })
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

  renderVideosList = fontColor => {
    const {homeRouteVideosList} = this.state
    if (homeRouteVideosList.length === 0) {
      return this.renderNoVideos(fontColor)
    }
    return (
      <ul className="home-route-video-list-container">
        {homeRouteVideosList.map(eachVideo => (
          <HomeRouteVideoCard videoDetails={eachVideo} key={eachVideo.id} />
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

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchInputBtnClicked = () => {
    this.getVideosListApi()
  }

  onCloseBanner = () => {
    this.setState(prevState => ({closeBanner: !prevState.closeBanner}))
  }

  bannerContainer = () => (
    <HomeBannerContainer data-testid="banner">
      <div className="home-banner-sub-container">
        <img
          alt="nxt watch logo"
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        />
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button type="button" className="get-now-btn">
          GET IT NOW
        </button>
      </div>
      <button
        className="banner-close-btn"
        onClick={this.onCloseBanner}
        data-testid="close"
        type="button"
      >
        <AiOutlineClose />
      </button>
    </HomeBannerContainer>
  )

  render() {
    const {searchInput, closeBanner} = this.state

    return (
      <ThemeContext.Consumer className="main-login-container">
        {value => {
          const {isLightTheme} = value
          const bgColor = isLightTheme ? 'home-light' : ''
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
                <HomePageMainContainer
                  isLightTheme={isLightTheme}
                  data-testid="home"
                >
                  {closeBanner ? '' : this.bannerContainer()}
                  <div className={`${bgColor} home-page-container`}>
                    <div className="search-bar-container">
                      <input
                        className={`search-input ${fontColor}`}
                        type="search"
                        placeholder="Search"
                        onChange={this.onSearchInput}
                        value={searchInput}
                      />
                      <button
                        type="button"
                        className="search-btn"
                        onClick={this.onSearchInputBtnClicked}
                        data-testid="searchButton"
                      >
                        <BsSearch size={18} color="#e6ebf1" />
                      </button>
                    </div>
                    {this.returnSwitchStatement(
                      failureView,
                      fontColor,
                      isLightTheme,
                    )}
                  </div>
                </HomePageMainContainer>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default HomeRoute
