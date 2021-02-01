import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

function Button({ onPressHandler, value }) {
  const checkOperationButton = (buttonValue) => {
    if(['+','=','-','x','m+','÷'].includes(buttonValue)) {
      return styles.operationButton;
    }
    if(buttonValue === '0') {
      return {flex: 2, alignItems: 'flex-start', paddingLeft: 28}
    }
    if(['AC', `+/-`, '%'].includes(buttonValue)){
      return styles.specialButton;
    }    
  }  

  return (
    <TouchableOpacity
      style={[styles.button, checkOperationButton(value)]}
      onPress={onPressHandler}      
    > 
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 100,    
    backgroundColor: 'hsl(0, 0%, 17%)',    
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 4,
    marginRight: 8,
    marginBottom: 4,
    marginLeft: 8,       
  },
  buttonText: {
    color:'white',
    fontSize: 32,
  },
  operationButton: {
    backgroundColor: '#FA9307',
  },
  specialButton: {
    backgroundColor: '#A4A4A4',
  }
})

export default Button;