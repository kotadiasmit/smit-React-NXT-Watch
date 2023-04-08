import './App.css'
import {Component} from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import NotFound from './components/NotFound'
import GamingRoute from './components/GamingRoute'
import SavedVideos from './components/SavedVideos'
import TrendingRoute from './components/TrendingRoute'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {
    isLightTheme: true,
  }

  changeTheme = () => {
    this.setState(prevState => ({isLightTheme: !prevState.isLightTheme}))
  }

  render() {
    const {isLightTheme} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isLightTheme,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
