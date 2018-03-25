import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TodoList from './Todo/TodoList';
import NewTodo from './Todo/NewTodo';
import Settings from './Personal/Settings';

const MainTab = StackNavigator({
  Home: {
    screen: TodoList,
    path: '/',
  },
  NewTodo: {
    screen: NewTodo,
    path: '/new',
    navigationOptions: {
      title: 'New To Do',
    },
  },
});

const SettingsTab = StackNavigator({
  Settings: {
    screen: Settings,
    path: '/',
    navigationOptions: () => ({
      title: 'Settings',
    }),
  },
});

const TodoMiniApp = TabNavigator(
  {
    MainTab: {
      screen: MainTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    SettingsTab: {
      screen: SettingsTab,
      path: '/settings',
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
    },
  },
);

export default TodoMiniApp;
