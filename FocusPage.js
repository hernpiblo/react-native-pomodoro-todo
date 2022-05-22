import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Alert, Vibration} from 'react-native';
import HomePage from './HomePage';
import Timer from 'react-native-countdown-component';
import StepIndicator from 'react-native-step-indicator';


export default class FocusPage extends React.Component {

  state={
    isRunning: false,
  }

  startPauseTimer = () => {     
    console.log(this.taskChosen) 
    Vibration.vibrate();
    this.setState({isRunning: !this.state.isRunning});
  }

  timesUp = () => {
    Vibration.vibrate();
    Alert.alert("25 Mins Up!","Time to take a short break!"); 
    this.props.navigation.navigate('Break', 
      {selectedTask: this.props.navigation.getParam("selectedTask"),
       focuscount: this.props.navigation.getParam("focuscount")+1,
       breakcount: this.props.navigation.getParam("breakcount") });    
  }
  
  render() {
    return (
      <View style={timerStyles.background}>

        <Text style = {timerStyles.focus}> FOCUS </Text>      

        <View style={timerStyles.counter}>
          <StepIndicator
            currentPosition={this.props.navigation.getParam("focuscount")-1}
            customStyles={progressBar}
            stepCount={4}
          />
        </View>

        <Text style = {timerStyles.tasktitle}> {this.props.navigation.getParam("selectedTask")} </Text>

        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <Timer
            running={this.state.isRunning}
            size={50}
            until={25*60}
            onFinish={this.timesUp}
            digitStyle={{backgroundColor: 'black', borderWidth: 2, borderColor: 'red'}}
            digitTxtStyle={{color: 'red', fontFamily: 'sans-serif-thin'}}
            timeLabelStyle={{color: 'red', fontSize: 20, fontFamily: 'sans-serif-thin'}}
            separatorStyle={{color: 'red', marginBottom: 50}}
            timeToShow={['M', 'S']}
            showSeparator
            />
          
        </View>        

        <View style = {timerStyles.buttonRow}>

          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            style = {timerStyles.returnButton}>
            <Text style={timerStyles.returnArrow}> ←  </Text>
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
    backgroundColor:'black',
    alignItems: 'center',
    flex:1,
    justifyContent: 'space-between',
  },
  focus : {
    color: 'white',
    fontSize: 20,
    paddingTop: 30,
    fontFamily: 'sans-serif-thin',
  },
  returnButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnArrow: {
    color: '#A6A6A6',
    fontSize: 50,
    marginLeft: 10,
    marginRight: 30,
    paddingBottom: 10  
  },
  pauseButton: {
    borderColor: '#A6A6A6',
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 130,
    marginTop: 15,
    width:100,
    height: 50
  },
  startPause: {
    color: '#A6A6A6',
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
  tasktitle:{
    color:'white',
    fontSize: 20,
    fontFamily: 'sans-serif-thin',
  }
})

const progressBar = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:60,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'red',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'red',
  stepStrokeUnFinishedColor: '#515151',
  separatorFinishedColor: 'red',
  separatorUnFinishedColor: '#515151',
  stepIndicatorFinishedColor: 'red',
  stepIndicatorUnFinishedColor: 'black',
  stepIndicatorCurrentColor: 'black',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 20,
  stepIndicatorLabelCurrentColor: 'red',
  stepIndicatorLabelFinishedColor: 'black',
  stepIndicatorLabelUnFinishedColor: '#515151',
  }