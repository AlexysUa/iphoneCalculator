import React, { useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';

import Button from '../components/Button';

const buttons = [
  ['AC', `+/-`, '%', '÷'],
  ['mc', 'mr', 'm-', 'm+'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=']
]

function MainScreen() {
  const [outputValue, setOutputValue] = useState('0');    
  const [pointChecker, setPointChecker] = useState(false);
  const [calcResult, setCalcResult] = useState(''); 
  const [calcMemory, setCalcMemory] = useState([]);  

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
  const resultChecker = (result, operator = '') => {
    let displayResult = eval(result).toString();    
    
    if(!/\./g.test(displayResult) && displayResult.length > 9) {
      let expoResult = eval(result).toExponential(1).toString().replace(/.0|\+/g, '');
      setOutputValue(expoResult);
      setCalcResult(expoResult + operator);
    } else {
      let numbersPart = displayResult.split(/\./);
      let formattedResult = +(eval(displayResult).toFixed(numbersPart[0].length>10 ? 0 : 10 - numbersPart[0].length));        
        setOutputValue(formattedResult);
        setCalcResult(formattedResult + operator); 
    }    
  }   

  const handlerForButton = (buttonInput) => {     
    let res; 
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
        if(outputValue.length >= 9 && /^\d+$/.test(calcResult) || /[\+\-\*\/]0$/.test(calcResult)) {                  
          break;
        }
        if(/\d+\.?\d+$/.test(calcResult) && outputValue.length >= 9) {
          break;
        }
        if(/[\+\-\*\/]/.test(calcResult[calcResult.length-1])) {          
          setOutputValue('');                    
        }        
        setOutputValue(current=>(current === '0' || current === '-0') ? buttonInput : current + buttonInput);               
        setCalcResult(current=>(current === '0') ? buttonInput : current + buttonInput);         
        break;               
      case 'AC':
        setOutputValue('0');
        setCalcResult('');
        setPointChecker(false);
        break;
      case '÷':        
      case 'x':         
      case '-':        
      case '+':
        setCalcResult(calcResult)
        setPointChecker(false);
        let formattedOperator = (buttonInput === 'x') ? '*' : (buttonInput === '÷') ? '/' : buttonInput;          
        if(/\w+[\+\-\*\/]\w+/.test(calcResult)) {
          res = eval(calcResult.replace(/0*$/,"")).toString().substr(0,9);
          resultChecker(calcResult, formattedOperator)            
          break;
        } 
        if(!/[\+\-\*\/]/.test(calcResult[calcResult.length-1])) {
          setCalcResult(calcResult+formattedOperator);            
        }
        if(/\d+[\+\-\*\/]$/.test(calcResult)) {
          setCalcResult(current=>current.substr(0, current.length - 1) + formattedOperator);            
        }        
        break;
      case '.':
        if(outputValue.includes('.') && !pointChecker) {            
          setPointChecker(true);
          break;
        }                       
        setOutputValue(pointChecker ? outputValue : outputValue + buttonInput);
        setCalcResult(pointChecker ? calcResult : calcResult + buttonInput)
        break;
      case '=':
        if(/^\d+[\+\-\*\/]$/.test(calcResult) || calcResult === '0') {
          break;
        }
        if(!/[\+\-\*\/]/.test(calcResult[calcResult.length-1])) {
          setCalcResult(calcResult+formattedOperator);            
        }                    
        if(/^\d+\.?\d?[\+\-\*\/]\d+$/.test(calcResult) || /\d+/.test(calcResult)) {                                    
          res = eval(calcResult.replace(/\.0*$/,"")).toString();       
        }
        setOutputValue(res);  
        setCalcResult(res); 
        setPointChecker(false);                
        resultChecker(calcResult);
        break;
      case `+/-`:
        let insertedMinus = calcResult;
        
        if(/^\-?\d*\.?\d+$/.test(calcResult) || calcResult.includes('e')) {          
          if(calcResult.includes('-')) {            
            setCalcResult(current=> current.substr(1,current.length-1));
            setOutputValue(current=> current.substr(1,current.length-1));
          } else {
            setOutputValue(current=>'-' + current)
            setCalcResult(current=> '-' + current);
          }
        }
        if(/^\-?\d+\.?\d+[\+\-\*\/]\(?\-?\d+\.?\d+\)?$/.test(calcResult)) {          
          if(/\({1}\-{1}\d+\.?\d?\){1}$/.test(calcResult)) {
            console.log('tut')
            let cutMinus = calcResult.replace(/\(\-?|\)/g,'');
            setCalcResult(cutMinus);
            setOutputValue(current=>current.replace(/\-/g,''));            
          } else {            
            insertedMinus = insertedMinus.substr(0,calcResult.length-outputValue.length) + '('  + '-' + insertedMinus.substr(calcResult.length-outputValue.length) + ')';            
            setCalcResult(insertedMinus);
            setOutputValue(current=>'-' + current);
          }         
          
        }        
        break;  
      case '%':
        if(/^\-?\d*\.?\d+$/.test(calcResult)){
          setCalcResult(current=> (current/100).toString().replace(/\.0*$/,""));
          setOutputValue(current=> (current/100).toString().replace(/\.0*$/,""));
          break;
        }
        if(/^\-?\d+\.?\d+[\+\-\*\/]\(?\-?\d+\.?\d+\)?$/.test(calcResult)) {
          let indexSecondNumber = calcResult.lastIndexOf(outputValue);
          let newNumber = ((+calcResult.slice(indexSecondNumber, indexSecondNumber+ outputValue.length))/100).toString();
          let resultNumber = calcResult.substr(0,indexSecondNumber) + `(${newNumber})`;
          let currentValue = (outputValue/100).toString().replace(/\.0*$/,"");
          if(/^\-?\d+\.?\d+[\+\-\*\/]\({1}\-?\d+\.?\d+\){1}$/.test(calcResult)) {
            resultNumber = calcResult.substr(0,indexSecondNumber-1) + `(${newNumber})`;
          }            
          setCalcResult(resultNumber);
          setOutputValue(currentValue); 
        }
      case 'mr':
        let resultMemory = (eval(calcMemory.join('+'))).toString().replace(/\.0*$/,"");
        setCalcResult(resultMemory);
        setOutputValue(resultMemory);
        break;
      case 'mc': 
        setCalcMemory([]);
        break;
      case 'm-': 
        if(/\d+\.?\d*[\+\-\*\/]?\(?\d+\.?\d*\)?$/.test(calcResult) || /^-?\d+$/.test(calcResult)) {
          calcMemory.pop();          
          if(calcMemory.length>0) {
            break;
          }
          setCalcMemory(calcMemory);
        } 
        break;
      case 'm+': 
        if(/\d+\.?\d*[\+\-\*\/]?\(?\d+\.?\d*\)?$/.test(calcResult) || /^-?\d+$/.test(calcResult)) {
          setCalcMemory(current=> [...current, `(${calcResult})`])
        }                 
        break;  
      }            
    }   
    
    return (    
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>          
          <Text style={styles.inputText}>{outputValue}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {addAllButtons()}
          {console.log(calcMemory, calcResult)}
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
    },
    buttonRow: {
      flex: 1,    
      flexDirection: 'row',
      justifyContent: 'space-around',    
    }  
  })
  
  export default MainScreen; 