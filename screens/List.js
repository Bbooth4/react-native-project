
import React, { Component } from 'react';
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
import db from '../database/database.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch'
  },
  developmentModeText: {
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
  platformSpecificExample: {
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
  bodyCompleted: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ccc'
  },
  bodyAltCompleted: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#999'
  },
  input: {
    flex: 1,
    width: Dimensions.get('window').width,
    padding: 10
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  placeholderText: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 80,
    paddingVertical: 80,
    fontSize: 20
  }
});

export default class List extends Component {
  static navigationOptions = {
    header: null,
    title: 'List'
  };

  state = {
    text: '',
    options: false
  };

  componentDidMount() {
    db.get(this.props.id)
    .then(res => {
      if (res.not_found) this.setState({ list: { list: [] } });
      else this.setState({ list: res });
    })
    .catch(err => console.log(err));
    // db.get('db8face4-6834-4295-b619-31d04b6ef085')
    // .then(res => this.setState({ list: res }))
    // .catch(err => console.log(err));
    // db.destroy();
    // db.allDocs().then(e => console.log(e));
    // db.remove("26a762a5-c23e-477a-a952-2a8cb5b6fb2b", "1-3b0d43bcbeaa4ccf85689c3b1a3dbf34")
    // .then(e => console.log(e))
    // .catch(err => console.log(err));
    // db.post({
    //   list: [
    //     { key: '1', content: 'Grocery 1', completed: true },
    //     { key: '2', content: 'Grocery 2', completed: true },
    //     { key: '3', content: 'Grocery 3', completed: false },
    //     { key: '4', content: 'Grocery 4', completed: false },
    //     { key: '5', content: 'Grocery 5', completed: false },
    //     { key: '6', content: 'Grocery 6', completed: true }
    //   ],
    //   completed: false,
    //   name: 'List 1',
    //   user_id: '12345abcde'
    // })
    // .then(res => {
    //   console.log(res);
    // })
    // .catch(err => console.log(err));
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

  onSubmit = () => {
    if (this.state.list && this.state.list.list) {
      const list = this.state.list;
      console.log(list);

      list.list.push({
        key: list.list.length+1,
        content: this.state.text,
        completed: false
      });
      
      this.setState({
        list: {
          ...list,
          list: list.list
        }
      }, () => this.setState({ text: '' },
      () => {
        db.get(list._id)
        .then(doc => {
          console.log('line 249', list.list);
          db.put({
            _id: list._id,
            _rev: doc._rev,
            list: list.list,
            user_id: doc.user_id,
            name: doc.name,
            completed: doc.completed
          })
          .then(res => {
            db.get(list._id)
            .then(doc => {
              console.log('line 257', doc);
            })
            .catch(err => console.log(err));
            console.log(res);
          })
          .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      }));
    } else console.log('Not Found');
  };

  checkItems = (text, i) => {
    let list = [...this.state.list.list];
    list[i].completed = !list[i].completed;

    this.setState({ list: { ...this.state.list, list } },
    () => {
      // console.log(this.state.list);
      db.get(this.state.list._id)
      .then(doc => {
        db.put({
          _id: this.state.list._id,
          _rev: doc._rev,
          list: list,
          user_id: doc.user_id,
          name: doc.name,
          completed: doc.completed
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    });
  };

  renderRow(item, i) {
    return (
      <View key={item.key}>
        <TouchableOpacity
          onPress={() => this.checkItems(item, i)}
          style={
            item.completed
            ? i % 2 === 0
              ? styles.bodyCompleted
              : styles.bodyAltCompleted
            : i % 2 === 0
              ? styles.body
              : styles.bodyAlt
          }
          activeOpacity={0.5}
          onLongPress={() => this.setState({options: !this.state.options})}
        >
          {/* <Text style={{paddingRight: 20}}>{item.id}</Text> */}
          <Text style={item.completed ? styles.lineThrough : ''}>{item.content}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { list } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {/* <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View> */}

          <TouchableOpacity
            style={styles.bodyAlt}
            onPress={this.onPress}
          >
            <TextInput
              style={styles.input}
              placeholderTextColor='#bef2b5'
              selectionColor='#bef2b5'
              underlineColorAndroid='#bef2b5'
              placeholder="Add a new item to the list"
              returnKeyType="done"
              value={this.state.text}
              onChangeText={text => this.setState({text})}
              onSubmitEditing={() => this.onSubmit()}
            />
          </TouchableOpacity>
          {
            list
            ? list.list && list.list.length > 0
              ? list.list.map((e, i) => this.renderRow(e, i))
              : <Text style={styles.placeholderText}>You Have Not Added Any Items To The List Yet</Text>
            : <Text style={styles.placeholderText}>No List Is Available</Text>
          }
        </ScrollView>
      </View>
    );
  };
};
