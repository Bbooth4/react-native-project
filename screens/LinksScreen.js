import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  TextInput
} from 'react-native';
import db from '../database/database.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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

export default class LinksScreen extends Component {
  static navigationOptions = {
    title: 'List Collection'
  };

  state = {
    text: '',
    options: false
  };

  componentDidMount() {
    db.allDocs()
    .then(res => {
      if (res.not_found) this.setState({ listCollection: [] });
      else this.setState({ listCollection: res.rows });
    })
    .catch(err => console.log(err));
  };

  onSubmit = () => {
    const list = this.state.listCollection;

    list.push({
      list: [],
      deleted: false,
      name: this.state.text
    });

    this.setState({ listCollection: list },
      () => db.post({
      list: [],
      deleted: false,
      name: this.state.text
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err)));
  };


  checkItems = (text, i) => {
    let list = [...this.state.listCollection];
    console.log(list[i])
    listCollection[i].deleted = !listCollection[i].deleted;

    // this.setState({ list: { ...this.state.list, list } },
    // () => {
    //   // console.log(this.state.list);
    //   db.get(this.state.list._id)
    //   .then(doc => {
    //     db.put({
    //       _id: this.state.list._id,
    //       _rev: doc._rev,
    //       list: list,
    //     })
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => console.log(err));
    //   })
    //   .catch(err => console.log(err));
    // });
  };

  renderRow(item, i) {
    return (
      <View key={item.key}>
        <TouchableOpacity
          onPress={() => this.checkItems(item, i)}
          style={
            item.delete
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
          <Text style={item.doc.deleted ? styles.lineThrough : ''}>{item.doc.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { listCollection } = this.state;

    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.bodyAlt}
          onPress={this.onPress}
        >
          <TextInput
            style={styles.input}
            selectionColor='#bef2b5'
            placeholderTextColor='#bef2b5'
            underlineColorAndroid='#bef2b5'
            placeholder='Create a new list'
            returnKeyType='done'
            value={this.state.text}
            onChangeText={text => this.setState({text})}
            onSubmitEditing={() => this.onSubmit()}
          />
        </TouchableOpacity>
        {
          listCollection &&
          listCollection.length > 0
          ? listCollection.map((e, i) => this.renderRow(e, i))
          : <Text style={styles.placeholderText}>No Lists Available</Text>
        }
      </ScrollView>
    );
  };
};
