import './index.css'
import {Component} from 'react'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import SideBar from '../SideBar'

class HomeRoute extends Component {
  state = {searchInput: ''}

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
                  <img
                    className="failure-view-img"
                    alt="failure view"
                    src={failureView}
                  />
                  <h1 className={`not-found-page-heading ${fontColor}`}>sa</h1>
                  <p
                    style={{
                      color: '#64748b',
                      marginTop: '0px',
                      textAlign: 'center',
                    }}
                  >
                    we are sorry, the page you requested could not be found.
                  </p>
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
