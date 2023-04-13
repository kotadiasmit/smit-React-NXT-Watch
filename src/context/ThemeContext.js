import React from 'react'

const ThemeContext = React.createContext({
  isLightTheme: true,
  selectedRoute: '/',
  savedVideosList: [],
  likedVideosList: [],
  disLikedVideosList: [],
  changeTheme: () => {},
  onSelectedRoute: () => {},
  saveVideo: () => {},
  videoLiked: () => {},
  videoDisLiked: () => {},
})

export default ThemeContext
