/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import Home from './src/screens/Home';

const createHome = ({ database }) => () => <Home database={database} />


export default createHome;
