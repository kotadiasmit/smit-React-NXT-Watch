import './index.css'
import {Link} from 'react-router-dom'
import {VideoCardPara} from './styleComponent'
import ThemeContext from '../../../context/ThemeContext'

const HomeRouteVideoCard = props => {
  const {videoDetails} = props
  const {
    channel,
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = videoDetails
  return (
    <ThemeContext.Consumer className="main-login-container">
      {value => {
        const {isLightTheme} = value
        return (
          <>
            <li className="video-card-details-container">
              <Link to={`/videos/${id}`} className="route-link">
                <img
                  src={thumbnailUrl}
                  className="home-thumbnail-img"
                  alt="video thumbnail"
                />
                <div className="video-card-detail">
                  <img
                    src={channel.profileImageUrl}
                    className="profile-img"
                    alt="channel logo"
                  />
                  <div>
                    <VideoCardPara isLightTheme={isLightTheme}>
                      {title}
                    </VideoCardPara>
                    <p className="other-video-card-detail">{channel.name}</p>
                    <div className="views-published-container">
                      <p className="other-video-card-detail">{`${viewCount} views`}</p>
                      <p className="other-video-card-detail font-size">
                        <sup>.</sup>
                      </p>
                      <p className="other-video-card-detail">{publishedAt}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default HomeRouteVideoCard
