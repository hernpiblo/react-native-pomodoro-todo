import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Alert, Vibration} from 'react-native';
import HomePage from './HomePage';
import Timer from 'react-native-countdown-component';
import StepIndicator from 'react-native-step-indicator';

export default class BreakPage extends React.Component {

  state={
    isRunning: false,
  }

  startPauseTimer = () => {      
    Vibration.vibrate();
    this.setState({isRunning: !this.state.isRunning});
  }

  timesUp = () => {
    Vibration.vibrate();
    this.setState({breakCount : this.state.breakCount+1});
    {this.props.navigation.getParam("breakcount")!==4
      ? (Alert.alert("5 Mins Up!","Time to work on your task!"),
        this.props.navigation.navigate('Focus',
                                        {selectedTask: this.props.navigation.getParam("selectedTask"),
                                         focuscount: this.props.navigation.getParam("focuscount"),
                                         breakcount: this.props.navigation.getParam("breakcount")+1} ) )
                                         
      : (Alert.alert("5 Mins Up!","Take a long break!"),
        this.props.navigation.navigate('LongBreak'))};
    }   


  render() { 
    return (
      <View style={timerStyles.background}>
      
        <Text style = {timerStyles.title}> BREAK TIME! </Text>

        <View style={timerStyles.counter}>
          <StepIndicator
            currentPosition={this.props.navigation.getParam("breakcount")-1}
            customStyles={progressBar}
            stepCount={5}
          />
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <Timer
            running={this.state.isRunning}
            size={50}
            until={5*60}
            onFinish={this.timesUp}
            digitStyle={{backgroundColor: 'white', borderWidth: 2, borderColor: '#1CC625'}}
            digitTxtStyle={{color: '#1CC625', fontFamily: 'sans-serif-thin'}}
            timeLabelStyle={{color: '#1CC625', fontSize: 20, fontFamily: 'sans-serif-thin'}}
            separatorStyle={{color: '#1CC625', marginBottom: 50}}
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
    justifyContent: 'space-between'
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
    color: '#6B6B6B',
    fontSize: 50,
    marginLeft: 10,
    marginRight: 30,
    paddingBottom: 10  
  },
  pauseButton: {
    borderColor: '#6B6B6B',
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
    color: '#6B6B6B',
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
  stepStrokeCurrentColor: '#1CC625',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#1CC625',
  stepStrokeUnFinishedColor: '#D8D8D8',
  separatorFinishedColor: '#1CC625',
  separatorUnFinishedColor: '#D8D8D8',
  stepIndicatorFinishedColor: '#1CC625',
  stepIndicatorUnFinishedColor: 'white',
  stepIndicatorCurrentColor: 'white',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 20,
  stepIndicatorLabelCurrentColor: '#1CC625',
  stepIndicatorLabelFinishedColor: 'white',
  stepIndicatorLabelUnFinishedColor: '#D8D8D8',
  }