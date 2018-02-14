/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import TodoInput from './src/component/TodoInput';
import TodoItem from './src/component/TodoItem';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      list:[],
    };
  }

  _delete = (index) => () => {
    const list = [].concat(this.state.list);
    list.splice(index,1);

    this.setState({
      list,
    });
  }

  _done = (index) => () => {
    const list = [].concat(this.state.list);
    list[index].done = !list[index].done;

    this.setState({
      list,
    });
  }

  _onPress = (text) => {
    const list = [].concat(this.state.list);

    list.push({
      key: Date.now(),
      text:text,
      done:false,
    });
    this.setState({
      list,
    });
  }

  render() {
    const {
      list,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <TodoInput _onPress={this._onPress}/>
          <View style={styles.todoListContainer}>
            <FlatList
              style={styles.todoList}
              data={list}
              renderItem={({item,index}) =>(
                <TodoItem
                  onDone={this._done(index)}
                  onDelete={this._delete(index)}
                  {...item}
                />
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 40,
    alignItems: 'center',
  },
  main:{
    flex:1,
    maxWidth: 400,
    alignItems: 'center',
  },
  todoListContainer:{
    flexDirection:'row',
    flex:1
  },
  todoList:{
    paddingLeft: 10,
    paddingRight: 10,
  }
});
