import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {TiHome} from 'react-icons/ti'
import {HiFire} from 'react-icons/hi'
import {GiGamepad} from 'react-icons/gi'
import {MdPlaylistAdd} from 'react-icons/md'
import {
  SideBarRouteList,
  SideBarRouteContainer,
  SideBarRouteName,
  SideBarContainer,
  ContactUsHeading,
  ContactUsPara,
} from './styleComponent'
import ThemeContext from '../../context/ThemeContext'

const SideBar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isLightTheme, selectedRoute, onSelectedRoute} = value
      let isSelected
      if (isLightTheme) {
        isSelected = '#f1f5f9'
      } else {
        isSelected = '#313131'
      }

      const onHomeRouteClicked = () => {
        onSelectedRoute('/')
      }

      const onTrendingRouteClicked = () => {
        onSelectedRoute('/trending')
      }

      const onGamingRouteClicked = () => {
        onSelectedRoute('/gaming')
      }

      const onSavedVideosRouteClicked = () => {
        onSelectedRoute('/saved-videos')
      }

      const contactUsContainer = () => (
        <>
          <div className="handler-logo-container">
            <ContactUsHeading isLightTheme={isLightTheme}>
              Contact Us
            </ContactUsHeading>
            <img
              alt="facebook logo"
              className="handler-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            />
            <img
              alt="twitter logo"
              className="handler-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            />
            <img
              alt="linked in logo"
              className="handler-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            />
            <ContactUsPara isLightTheme={isLightTheme}>
              Enjoy! Now to see your channels and recommendations!
            </ContactUsPara>
          </div>
        </>
      )

      return (
        <SideBarContainer isLightTheme={isLightTheme}>
          <SideBarRouteList>
            <Link to="/" className="route-link">
              <SideBarRouteContainer
                isRouteSelected={
                  selectedRoute === '/' ? isSelected : 'transparent'
                }
                onClick={onHomeRouteClicked}
              >
                <TiHome
                  color={selectedRoute === '/' ? '#ff0000' : '#475569'}
                  size={23}
                />
                <SideBarRouteName
                  isLightTheme={isLightTheme}
                  isSelected={selectedRoute === '/'}
                >
                  Home
                </SideBarRouteName>
              </SideBarRouteContainer>
            </Link>
            <Link to="/trending" className="route-link">
              <SideBarRouteContainer
                isRouteSelected={
                  selectedRoute === '/trending' ? isSelected : 'transparent'
                }
                onClick={onTrendingRouteClicked}
              >
                <HiFire
                  size={23}
                  color={selectedRoute === '/trending' ? '#ff0000' : '#475569'}
                />
                <SideBarRouteName
                  isLightTheme={isLightTheme}
                  isSelected={selectedRoute === '/trending'}
                >
                  Trending
                </SideBarRouteName>
              </SideBarRouteContainer>
            </Link>
            <Link to="/gaming" className="route-link">
              <SideBarRouteContainer
                isRouteSelected={
                  selectedRoute === '/gaming' ? isSelected : 'transparent'
                }
                onClick={onGamingRouteClicked}
              >
                <GiGamepad
                  color={selectedRoute === '/gaming' ? '#ff0000' : '#475569'}
                  size={23}
                />
                <SideBarRouteName
                  isLightTheme={isLightTheme}
                  isSelected={selectedRoute === '/gaming'}
                >
                  Gaming
                </SideBarRouteName>
              </SideBarRouteContainer>
            </Link>
            <Link to="/saved-videos" className="route-link">
              <SideBarRouteContainer
                isRouteSelected={
                  selectedRoute === '/saved-videos' ? isSelected : 'transparent'
                }
                onClick={onSavedVideosRouteClicked}
              >
                <MdPlaylistAdd
                  color={
                    selectedRoute === '/saved-videos' ? '#ff0000' : '#475569'
                  }
                  size={23}
                />
                <SideBarRouteName
                  isLightTheme={isLightTheme}
                  isSelected={selectedRoute === '/saved-videos'}
                >
                  Saved videos
                </SideBarRouteName>
              </SideBarRouteContainer>
            </Link>
          </SideBarRouteList>
          {contactUsContainer()}
        </SideBarContainer>
      )
    }}
  </ThemeContext.Consumer>
)
export default withRouter(SideBar)
