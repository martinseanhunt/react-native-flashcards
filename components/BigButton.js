import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'

const BigButton = (props) => (
  <Button {...props}>
    <ButtonTxt>{props.text}</ButtonTxt>
  </Button>
)

const Button = styled.TouchableOpacity`
  background: #0F0F0F;
  padding: 15px;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
`

const ButtonTxt = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;  
`

export default BigButton