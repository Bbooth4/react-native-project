import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  },
  tableRow: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  tableRowAlt: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#d9dde2'
  },
  tableBody: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  body: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#bef2b5'
  },
  bodyAlt: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#72ce63'
  },
  input: {
    flex: 1,
    width: Dimensions.get('window').width,
    padding: 10
  }
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    list: [
      { key: '1', content: 'Item 1', completed: true },
      { key: '2', content: 'Item 2', completed: true },
      { key: '3', content: 'Item 3', completed: false },
      { key: '4', content: 'Item 4', completed: true },
      { key: '5', content: 'Item 5', completed: false },
      { key: '6', content: 'Item 6', completed: true }
    ],
    text: '',
    options: false
  };

  maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this.handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    };
  };

  handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };

  onSubmit = () => {
    this.setState({
      list: this.state.list.concat({
        key: this.state.list.length+1,
        content: this.state.text,
        completed: false
      })
    }, () => this.setState({ text: '' }));
  };

  checkItems = (text, i) => {
    let list = [...this.state.list];
    list[i].completed = !list[i].completed;

    this.setState({ list: list });
  };

  renderRow(item, i) {
    return (
      <View key={item.key}>
        <TouchableOpacity
          onPress={() => this.checkItems(item, i)}
          style={i % 2 === 0 ? styles.body : styles.bodyAlt}
          activeOpacity={0.5}
          onLongPress={() => this.setState({options: !this.state.options})}
        >
          <Text style={{paddingRight: 10}}>{item.key}</Text>
          <Text>{item.content} {item.completed ? 'incomplete' : 'complete'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { list, text } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <TouchableOpacity
            style={styles.bodyAlt}
            onPress={this.onPress}
          >
            <TextInput
              style={styles.input}
              placeholderTextColor='#bef2b5'
              selectionColor='#bef2b5'
              underlineColorAndroid='#bef2b5'
              placeholder="Add a new item"
              returnKeyType="done"
              value={this.state.text}
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={() => this.onSubmit()}
            />
          </TouchableOpacity>
          { list.map((e, i) => this.renderRow(e, i)) }

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };
};
