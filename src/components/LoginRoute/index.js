import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'
import {
  LoginContainer,
  LoginFormContainer,
  LoginButton,
} from './styledComponent'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showSubmitError: false,
    showPassword: false,
  }

  inputUsernameChanged = event => {
    this.setState({username: event.target.value})
  }

  inputPasswordChanged = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  loginBtnClicked = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      errorMsg,
      showSubmitError,
      showPassword,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer className="main-login-container">
        {value => {
          const {isLightTheme} = value
          const fontColor = isLightTheme ? '' : 'dark'
          const webLogoUrl = isLightTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          return (
            <LoginContainer isLightTheme={isLightTheme}>
              <LoginFormContainer
                isLightTheme={isLightTheme}
                onSubmit={this.loginBtnClicked}
              >
                <img
                  alt="website logo"
                  className="login-web-logo"
                  src={webLogoUrl}
                />
                <div className="login-details-container">
                  <label
                    htmlFor="username"
                    className={`${fontColor} login-label`}
                  >
                    USERNAME
                  </label>
                  <input
                    className={`${fontColor} login-input`}
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.inputUsernameChanged}
                  />
                </div>
                <div className="login-details-container">
                  <label
                    htmlFor="password"
                    className={`${fontColor} login-label`}
                  >
                    PASSWORD
                  </label>
                  <input
                    className={`${fontColor} login-input`}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.inputPasswordChanged}
                  />
                </div>
                <div className="show-password-container">
                  <input
                    type="checkBox"
                    id="show-password"
                    value="Show Password"
                    onChange={this.onShowPassword}
                  />
                  <label
                    htmlFor="show-password"
                    className={`${fontColor} show-password`}
                  >
                    Show Password
                  </label>
                </div>
                <LoginButton type="submit">Login</LoginButton>
                {showSubmitError ? (
                  <p className="login-err-msg">
                    <sup>*</sup>
                    {errorMsg}
                  </p>
                ) : null}
              </LoginFormContainer>
            </LoginContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default LoginRoute
