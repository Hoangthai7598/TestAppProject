/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import PrimaryNavigator from './src';

function App() {
  return (
    <SafeAreaProvider>
      <PrimaryNavigator />
    </SafeAreaProvider>
  );
}

export default App;
