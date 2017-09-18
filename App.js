import React, { PureComponent } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
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
    data: null
  }

  componentWillMount = () => {
    fetch(API_URL, this.option)  
      .then(res => res.json())
      .then(resJson => resJson.response)
      .then((data) => {
        this.setState({ data })
      })
  }
  
  render () {
    const { data } = this.state
    if (isNull(data)) {
      return (
        <View style={[styles.container, styles.container__loading]}>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <HTMLView value={data.text} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 10
  },

  container__loading: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App

