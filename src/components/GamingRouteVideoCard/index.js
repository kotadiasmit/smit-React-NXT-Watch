import './index.css'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {VideoCardPara} from './styleComponent'
import ThemeContext from '../../context/ThemeContext'

const GamingRouteVideoCard = props => {
  const {videoDetails} = props
  const {id, thumbnailUrl, title, viewCount} = videoDetails
  return (
    <ThemeContext.Consumer className="main-login-container">
      {value => {
        const {isLightTheme} = value
        return (
          <>
            <Link to={`/videos/${id}`} className="route-link">
              <li className="gaming-video-card-details-container">
                <img
                  src={thumbnailUrl}
                  className="thumbnail-img"
                  alt="video thumbnail"
                />
                <div className="gaming-video-card-detail">
                  <div>
                    <VideoCardPara isLightTheme={isLightTheme}>
                      {title}
                    </VideoCardPara>
                    <div className="views-published-container">
                      <p className="other-video-card-detail">{`${viewCount} Watching Worldwide`}</p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default GamingRouteVideoCard
