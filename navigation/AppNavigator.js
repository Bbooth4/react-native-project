import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import List from '../screens/List';

const ListView = createStackNavigator({
  List: List
});

ListView.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  )
};

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  List: ListView
});