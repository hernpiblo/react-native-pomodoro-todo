import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Alert, Vibration} from 'react-native';
import HomePage from './HomePage';
import Timer from 'react-native-countdown-component';
import StepIndicator from 'react-native-step-indicator';

export default class LongBreakPage extends React.Component {

  state={
    isRunning: false,
  }

  startPauseTimer = () => {    
    Vibration.vibrate();
    this.setState({isRunning: !this.state.isRunning});
  }

  timesUp = () => {
    Vibration.vibrate();
    Alert.alert("Congrats!","You have completed 4 Pomodoros!");
    this.setState({breakCount : this.state.breakCount+1});
    this.props.navigation.navigate('Home')
    }   


  render() { 
    return (
      <View style={timerStyles.background}>
      
        <Text style = {timerStyles.title}>LONG BREAK!</Text>

        <View style={timerStyles.counter}>
          <StepIndicator
            currentPosition={4}
            customStyles={progressBar}
            stepCount={5}
          />
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <Timer
            running={this.state.isRunning}
            size={50}
            until={30*60}
            onFinish={this.timesUp}
            digitStyle={{backgroundColor: 'AFEDFF', borderWidth: 2, borderColor: '#00755D'}}
            digitTxtStyle={{color: '#00755D', fontFamily: 'sans-serif-thin'}}
            timeLabelStyle={{color: '#00755D', fontSize: 20, fontFamily: 'sans-serif-thin'}}
            separatorStyle={{color: '#00755D', marginBottom: 50}}
            timeToShow={['M', 'S']}
            showSeparator
            />
          
        </View>

        <View style = {timerStyles.buttonRow}>

          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            style = {timerStyles.returnButton}>
            <Text style={timerStyles.returnArrow} > ←  </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={this.startPauseTimer}
            style = {timerStyles.pauseButton}>
            <Text style={timerStyles.startPause}> ▷  | |  </Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const timerStyles = StyleSheet.create({
  background: {
    alignItems: 'center',
    flex:1,
    justifyContent: 'space-between',
    backgroundColor: '#FFCFB7'
  },
  title : {
    fontSize: 20,
    paddingTop: 40,
    fontFamily: 'sans-serif-thin'
  },
  returnButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnArrow: {
    color: '#575757',
    fontSize: 50,
    marginLeft: 10,
    marginRight: 30,
    paddingBottom: 10  
  },
  pauseButton: {
    borderColor: '#575757',
    borderWidth:3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 130,
    marginTop: 15,
    width:100,
    height: 50    
  },
  startPause: {
    color: '#575757',
    fontSize: 20,
    paddingHorizontal: 20,
    fontWeight: 'bold'
  },
  buttonRow: {
    flexDirection:'row',
    justifyContent: 'space-evenly',
    marginTop: -50,
    marginBottom: 15
  },
  counter:{
    width: '100%'
  },
})

const progressBar = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:60,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#00755D',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#00755D',
  stepStrokeUnFinishedColor: '#D8D8D8',
  separatorFinishedColor: '#00755D',
  separatorUnFinishedColor: '#D8D8D8',
  stepIndicatorFinishedColor: '#00755D',
  stepIndicatorUnFinishedColor: '#FFCFB7',
  stepIndicatorCurrentColor: '#FFCFB7',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 20,
  stepIndicatorLabelCurrentColor: '#00755D',
  stepIndicatorLabelFinishedColor: '#FFCFB7',
  stepIndicatorLabelUnFinishedColor: '#D8D8D8',
  }