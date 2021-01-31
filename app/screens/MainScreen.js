import React from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';

import Button from '../components/Button';

const buttons = [
  ['AC', `+/-`, '%', '÷'],
  ['mc', 'mr', 'm-', 'm+'],
  [7, 8, 9, 'x'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, ',','=']
]

function MainScreen(props) {
  const adderForButtons = () => {
    let layouts = buttons.map((buttonsRows, index) => {
      let rowItem = buttonsRows.map((buttonsItems, buttonIndex) => {        
        return <Button key={'btn-' + buttonIndex} value={buttonsItems} />
      });

      return <View style={styles.buttonRow}>{rowItem}</View>
    });

    return layouts;
  }
  
  return (    
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>10000000</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {adderForButtons()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: 'black',    
  },  
  inputContainer: {
    justifyContent:'flex-end',
    alignItems: 'flex-end',
    flex: 2,
    margin: 20,
  },
  inputText: {
    fontSize: 60,
    color:'white',
    textAlign: 'right',
  },
  buttonsContainer: {
    flex: 8,
    margin: 20,    
  },
  buttonRow: {
    flex: 1,    
    flexDirection: 'row',
    justifyContent: 'space-around',    
  }  
})

export default MainScreen; 