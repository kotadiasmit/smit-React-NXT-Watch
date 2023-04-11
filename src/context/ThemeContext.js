import React from 'react'

const ThemeContext = React.createContext({
  isLightTheme: true,
  selectedRoute: '/',
  changeTheme: () => {},
  onSelectedRoute: () => {},
})

export default ThemeContext
