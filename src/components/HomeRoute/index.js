import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import SideBar from '../SideBar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {searchInput: '', apiStatus: apiStatusConstants.initial}

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
  }

  renderVideosList = () => {
    const {searchInput} = this.state
    return <div>sdv</div>
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
        We can not seem to find the page your are looking for.
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.onJobSearchRetryClicked}
      >
        Retry
      </button>
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
        return this.renderVideosList()
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
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.getVideosListApi()
    }
  }

  render() {
    const {searchInput} = this.state
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
                <div
                  className={`${bgColor} home-page-container`}
                  data-testid="home"
                >
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
                    >
                      <BsSearch color="#e6ebf1" size={18} />
                    </button>
                  </div>
                  {this.returnSwitchStatement(
                    failureView,
                    fontColor,
                    isLightTheme,
                  )}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default HomeRoute
