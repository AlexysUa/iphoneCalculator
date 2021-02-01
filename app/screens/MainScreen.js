import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';

import Button from '../components/Button';

const buttons = [
  ['AC', `+/-`, '%', '÷'],
  ['mc', 'mr', 'm-', 'm+'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', ',', '=']
]

function MainScreen() {
  const [outputValue, setOutputValue] = useState('0');    
  const [operation, setOperation] = useState(undefined);
  const [commaChecker, setCommaChecker] = useState(false);
  const [calcResult, setCalcResult] = useState([]);  

  const addAllButtons = () => {
    let allButtons = buttons.map((buttonsRows, index) => {
      let rows = buttonsRows.map((eachButton, buttonIndex) => {        
        return (
          <Button 
            key={'button' + buttonIndex} 
            value={eachButton}
            onPressHandler={handlerForButton.bind(this, eachButton)}
          />
        )
      });

      return <View key={'row' + index} style={styles.buttonRow}>{rows}</View>
    });

    return allButtons;
  }
  
  const handlerForButton = (buttonInput) => {
    switch (buttonInput) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if(outputValue.length >= 10) {
          break;
        }
        if(calcResult[calcResult.length-2] === outputValue) {          
          setOutputValue('');          
        }
        setCalcResult([...calcResult, buttonInput]); 
        setOutputValue(current=>(current === '0') ? buttonInput : current + buttonInput);       
        break;               
        case 'AC':
          setOutputValue('0');
          setOperation(undefined);
          setCalcResult([]);
          setCommaChecker(false);
          break;
        case '÷':        
        case 'x':         
        case '-':        
        case '+':
          let formattedOperator = (buttonInput === 'x') ? '*' : (buttonInput === '÷') ? '/' : buttonInput;
          if(calcResult.length >= 3) {
            const res = eval(calcResult.join(' ')).toString();
            setOutputValue(res);  
            setCalcResult([res, formattedOperator]); 
            break;
          }        
          if(Number(calcResult[calcResult.length-1]) || calcResult[calcResult.length-1] === undefined) {
            setOperation(formattedOperator);
            setCalcResult(current => [...current, formattedOperator]);          
          }                       
          break;
        case ',':
          setCommaChecker(true);
          setOutputValue(commaChecker ? outputValue : outputValue + buttonInput);
          break;
        case '=':
          if(calcResult.length >= 3) {
            const res = eval(calcResult.join(' ')).toString();
            setOutputValue(res);  
            setCalcResult([res]);      
          }
          break;    
      }
    }  
    
    return (    
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          {console.log(calcResult)}
          <Text style={styles.inputText}>{outputValue}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {addAllButtons()}
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
      margin: 10,    
    },
    buttonRow: {
      flex: 1,    
      flexDirection: 'row',
      justifyContent: 'space-around',    
    }  
  })
  
  export default MainScreen; 