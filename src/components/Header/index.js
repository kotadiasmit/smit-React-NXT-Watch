import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {Component} from 'react'
import {FaMoon} from 'react-icons/fa'
import {BsBrightnessHigh} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import Popup from 'reactjs-popup'
import SideBar from '../SideBar'
import {
  NavHeader,
  LogoutDesktopBtn,
  ModalContainer,
  LogoutPara,
} from './styleComponent'
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
          const {isLightTheme, changeTheme, onSelectedRoute} = value
          const onThemeChange = () => {
            changeTheme()
          }

          const onHomeRouteClicked = () => {
            onSelectedRoute('/')
          }

          const themeBtn = isLightTheme ? (
            <FaMoon size={28} />
          ) : (
            <BsBrightnessHigh color="#ffffff" size={28} />
          )
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
                    onClick={onHomeRouteClicked}
                  />
                </Link>

                <div className="nav-content">
                  <button
                    type="button"
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
                  <Popup
                    modal
                    trigger={
                      <LogoutDesktopBtn
                        isLightTheme={isLightTheme}
                        type="button"
                      >
                        Logout
                      </LogoutDesktopBtn>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <ModalContainer isLightTheme={isLightTheme}>
                        <LogoutPara isLightTheme={isLightTheme}>
                          Are you sure, you want to logout?
                        </LogoutPara>
                        <div>
                          <button
                            className="close-button"
                            type="button"
                            data-testid="closeButton"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            className="Confirm-logout-button"
                            type="button"
                            onClick={this.onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </ModalContainer>
                    )}
                  </Popup>
                </div>

                <div className="nav-menu-mobile">
                  <ul className="nav-menu-list-mobile">
                    <button
                      type="button"
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
                  <Popup
                    modal
                    trigger={
                      <button type="button" className="logout-mobile-btn">
                        <FiLogOut
                          color={isLightTheme ? 'black' : '#ffffff'}
                          size={30}
                        />
                      </button>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <ModalContainer isLightTheme={isLightTheme}>
                        <LogoutPara isLightTheme={isLightTheme}>
                          Are you sure, you want to logout?
                        </LogoutPara>
                        <div>
                          <button
                            className="close-button"
                            type="button"
                            data-testid="closeButton"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            className="Confirm-logout-button"
                            type="button"
                            onClick={this.onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </ModalContainer>
                    )}
                  </Popup>
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
