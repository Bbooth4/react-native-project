import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  CheckBox,
  Dimensions
} from 'react-native';
import { WebBrowser } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bef2b5',
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
    paddingTop: 30,
    paddingLeft: 0,
    paddingRight: 0
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
    alignSelf: 'center'
  },
  tableRowAlt: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    backgroundColor: '#72ce63'
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
    backgroundColor: '#bef2b5'
  },
  bodyAlt: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#72ce63'
  },
  addToList: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#72ce63',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  listItem: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  listItemContent: {
    flex: 4,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#72ce63',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
});

export default class HomeScreen extends React.Component {
  static navigationOptions = { header: null };

  state = {
    count: 0,
    checked: true
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

  onPress = () => this.setState({count: this.state.count+1});

  renderRow(item, i) {
    return (
      <View style={i % 2 === 0 ? styles.body : styles.bodyAlt} key={item.key}>
        <CheckBox
          center
          title={item.content}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={item.completed}
        />
        <TouchableOpacity
          onPress={this.onPress}
          style={styles.listItemContent}
          activeOpacity={0.5}
        >
          <Text>{item.content}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const list = [
      { key: '1', content: 'Item 1', completed: true },
      { key: '2', content: 'Item 2', completed: true },
      { key: '3', content: 'Item 3', completed: false },
      { key: '4', content: 'Item 4', completed: false },
      { key: '5', content: 'Item 5', completed: true },
      { key: '6', content: 'Item 6', completed: false }
    ];

    const { count, checked } = this.state;

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
              style={styles.button}
              onPress={this.onPress}
            >
              <Text>+ Add to the list {count}</Text>
            </TouchableOpacity>
            { list.map((e, i) => this.renderRow(e, i)) }

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onPress}
            >
              <Text> Touch Here </Text>
            </TouchableOpacity>
            <View style={styles.countContainer}>
              <Text style={styles.countText}>
                {count}
              </Text>
            </View>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this.handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <Text style={styles.codeHighlightText}>navigation/MainTabNavigator.js</Text>
          </View>
        </View>
      </View>
    );
  }
}
