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
import List from './List';
import Home from './Home';

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

export default class Lists extends Component {
  static navigationOptions = {
    title: 'Your Lists'
  };

  state = {
    text: '',
    options: false,
    error: false, 
    selectedList: false
  };

  componentDidMount() {
    // db.destroy();
    let byUser;

    db.allDocs()
    .then(async res => {
      // console.log(res);
      if (res.not_found) this.setState({ listCollection: [] });
      else {
        try { byUser = await res.rows.filter(e => e.doc.user_id === '12345abcde'); }
        catch(err) { console.log(err); };

        if (byUser.length > 0) this.setState({ listCollection: byUser });
        else this.setState({ listCollection: [] });
      };
    })
    .catch(err => console.log(err));
  };

  onSubmit = () => {
    let byUser;

    if (this.state.text.length > 0) {
      db.post({
        list: [],
        completed: false,
        name: this.state.text,
        user_id: '12345abcde'
      })
      .then(res => {
        console.log('line 112', res);
        db.allDocs()
        .then(async res => {
          console.log(res);
          try { byUser = await res.rows.filter(e => e.doc.user_id === '12345abcde'); }
          catch(err) { console.log(err); };
  
          if (byUser.length > 0) this.setState({ listCollection: byUser, text: '' });
          else this.setState({ error: true, text: '' });
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log('line 106', err));
    } else this.setState({ error: true });
  };

  checkItems = (text, i) => {
    console.log('checked');
    // let listCollection = [...this.state.listCollection];
    // console.log(listCollection[i]);
    // listCollection[i].deleted = !listCollection[i].deleted;

    // this.setState({ listCollection: { ...this.state.listCollection, listCollection } },
    // () => {
    //   db.get(listCollection[i]._id)
    //   .then(doc => {
    //     db.put({
    //       _id: listCollection[i]._id,
    //       _rev: doc._rev,
    //       listCollection: listCollection[i],
    //     })
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => console.log(err));
    //   })
    //   .catch(err => console.log(err));
    // });
  };

  renderRow = (item, i) => {
    return (
      <View key={item.id}>
        <TouchableOpacity
          onPress={() => this.setState({selectedList: true, selectedId: item.id})}
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
          <Text style={item.doc.completed ? styles.lineThrough : ''}>{item.doc.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          selectedList
          ? <List id={selectedId}/>
          : <Home />
        }
        <Text>Back</Text>
      </ScrollView>
    );
  };
};
