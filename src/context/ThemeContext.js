import React from 'react'

const ThemeContext = React.createContext({
  isLightTheme: true,
  changeTheme: () => {},
})

export default ThemeContext
