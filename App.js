import React, { Component } from 'react';
import {YellowBox} from 'react-native';
import Routing from './src/navigations/Router';

export default class App extends Component{
  render(){
    YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core'],
    ["Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method."]);
    return(
       <Routing/>
    );
  }
}

