import React from 'react'
import { View, StatusBar } from 'react-native'
import styled from 'styled-components'
import { Constants } from 'expo'

const StatusBarView = () => (
  <Container>
    <StatusBar translucent backgroundColor='#000' barStyle='light-content' />
  </Container>
)

const Container = styled.View`
  background: #0F0F0F;
  height: ${Constants.statusBarHeight};
`

export default StatusBarView