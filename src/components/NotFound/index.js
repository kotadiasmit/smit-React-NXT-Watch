import './index.css'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import SideBar from '../SideBar'

const NotFound = () => (
  <ThemeContext.Consumer className="main-login-container">
    {value => {
      const {isLightTheme} = value
      const bgColor = isLightTheme ? 'not-found-light' : ''
      const fontColor = isLightTheme ? '' : 'dark'
      const notFoundUrl = isLightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <>
          <Header />
          <div className="main-container">
            <SideBar className="sidebar-for-desktop" />
            <div className={`${bgColor} not-found-page-container`}>
              <img
                className="not-found-page-img"
                alt="not found"
                src={notFoundUrl}
              />
              <h1 className={`not-found-page-heading ${fontColor}`}>
                Page Not Found
              </h1>
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
export default NotFound
