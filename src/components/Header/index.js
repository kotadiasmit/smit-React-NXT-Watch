import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {Component} from 'react'
import {FaMoon} from 'react-icons/fa'
import {BsBrightnessHigh} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import SideBar from '../SideBar'
import {NavHeader, LogoutDesktopBtn} from './styleComponent'
import ThemeContext from '../../context/ThemeContext'

class Header extends Component {
  state = {isHamburgerClicked: false}

  onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = this.props
    history.replace('/login')
  }

  hamburgerMenuClicked = () => {
    this.setState(prevState => ({
      isHamburgerClicked: !prevState.isHamburgerClicked,
    }))
  }

  render() {
    const {isHamburgerClicked} = this.state
    return (
      <ThemeContext.Consumer className="main-login-container">
        {value => {
          const {isLightTheme, changeTheme} = value
          const onThemeChange = () => {
            changeTheme()
          }
          const themeBtn = isLightTheme ? (
            <FaMoon size={28} />
          ) : (
            <BsBrightnessHigh color="#ffffff" size={28} />
          )
          const fontColor = isLightTheme ? '' : 'dark'
          const webLogoUrl = isLightTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          return (
            <>
              <NavHeader isLightTheme={isLightTheme}>
                <Link to="/">
                  <img
                    className="website-logo"
                    src={webLogoUrl}
                    alt="website logo"
                  />
                </Link>

                <div className="nav-content">
                  <button
                    className="theme-logo-btn"
                    data-testid="theme"
                    onClick={onThemeChange}
                  >
                    {themeBtn}
                  </button>

                  <img
                    className="user-profile-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />

                  <LogoutDesktopBtn
                    isLightTheme={isLightTheme}
                    type="button"
                    onClick={this.onClickLogout}
                  >
                    Logout
                  </LogoutDesktopBtn>
                </div>

                <div className="nav-menu-mobile">
                  <ul className="nav-menu-list-mobile">
                    <button
                      className="theme-logo-btn"
                      data-testid="theme"
                      onClick={onThemeChange}
                    >
                      {themeBtn}
                    </button>
                    <button
                      type="button"
                      className="nav-menu-item-mobile"
                      onClick={this.hamburgerMenuClicked}
                    >
                      <GiHamburgerMenu
                        color={isLightTheme ? 'black' : '#ffffff'}
                        size={30}
                      />
                    </button>
                  </ul>
                  <button
                    type="button"
                    className="logout-mobile-btn"
                    onClick={this.onClickLogout}
                  >
                    <FiLogOut
                      color={isLightTheme ? 'black' : '#ffffff'}
                      size={30}
                    />
                  </button>
                </div>
              </NavHeader>
              <div className="mobile-sidebar">
                {isHamburgerClicked ? <SideBar /> : null}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default withRouter(Header)
