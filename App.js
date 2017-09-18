import React, { PureComponent } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Animated,
  Easing
} from 'react-native'
import HTMLView from 'react-native-htmlview'

import isNull from 'lodash/isNull'

const API_URL = 'https://cap_america.inkitt.de/1/stories/106766/chapters/1'

class App extends PureComponent {
  option = {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  state = {
    data: null,
    anim: new Animated.Value(0)
  }

  componentWillMount = () => {
    fetch(API_URL, this.option)  
      .then(res => res.json())
      .then(resJson => resJson.response)
      .then(data => this.setState({ data }))
      .then(this.animateContent)
  }

  animateContent = () => {
    Animated.timing(this.state.anim, {
      toValue: 1,
      duration: 500,
      easing: Easing.circle
    }).start()
  }

  renderPreloader () {
    return (
      <View style={[styles.container, styles.container__loading]}>
        <Text>Loading...</Text>
      </View>
    )
  }
  
  render () {
    const { data, anim } = this.state

    if (isNull(data)) {
      return this.renderPreloader()
    }

    const contentAnimation = {
      paddingTop: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]
      }),
      opacity: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    }

    return (
      <Animated.ScrollView style={[styles.container, contentAnimation]}>
        <HTMLView value={data.text} />
      </Animated.ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10
  },

  container__loading: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App

