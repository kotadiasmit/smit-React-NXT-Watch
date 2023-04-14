import './index.css'
import {Link} from 'react-router-dom'
import {VideoCardPara} from './styleComponent'
import ThemeContext from '../../context/ThemeContext'

const TrendingRouteVideoCard = props => {
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
            <Link to={`/videos/${id}`} className="route-link">
              <li className="trending-video-card-details-container">
                <img
                  src={thumbnailUrl}
                  className="thumbnail-img"
                  alt="video thumbnail"
                />
                <div className="trending-video-card-detail">
                  <img
                    src={channel.profileImageUrl}
                    className="trending-profile-img"
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
              </li>
            </Link>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default TrendingRouteVideoCard
