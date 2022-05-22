import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert} from 'react-native';
import CheckBox  from 'react-native-check-box';
import AsyncStorage from '@react-native-community/async-storage'

export default class HomePage extends React.Component {

  state = {
    taskList: [{
        id: 0,
        title: '1) Type something and click ADD to insert new task to the list \n\n 2) Click SAVE to save your list \n\n3) Click on the X to delete a task \n\n4) Use the Checkbox to keep track of your finished tasks \n\n5) Click on any task to start your Pomodoro \n\n6) Enjoy!',
        done: false
      }],
    newTask: '',
    isChecked:false,
  };

  toggleCheckbox = (currentItem) => {
    const todos = [...this.state.taskList];   

    let foundIndex = null;

    for (let i = 0; i < this.state.taskList.length; i++) {
      if (todos[i].id == currentItem.id) {
        foundIndex = i;
      }
    }       

    if (foundIndex != null) {
      const newTodo = {...currentItem};
      newTodo.done = !newTodo.done;
      todos[foundIndex]=newTodo;
    }

    this.setState({
      taskList: todos
    })
  }

  designTask = (info) => {
    let currentItem = info.item    
    return (
      <View style ={homeStyles.checkBox}>
        <CheckBox
          style={{ paddingTop: 10, paddingLeft: 5, flex: 10}}
          onClick={()=>{
            this.toggleCheckbox(currentItem);       
            }}
          isChecked={currentItem.done}     
        />
        <TouchableOpacity 
          style={homeStyles.eachTask} 
          onPress={() => {console.log(this.taskChosen)
                          this.props.navigation.navigate('Focus', 
                                                          {selectedTask: currentItem.title, 
                                                           focuscount: 1,
                                                           breakcount: 1
                                                          } ); 
                          this.saveData();}}>
            <Text style={[{fontSize: 20, fontFamily: 'sans-serif-condensed'},
                          {textDecorationLine: currentItem.done?'line-through':'none'}]}>
                          {currentItem.title}
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={homeStyles.deleteButton}
          onPress={() => {this.deleteTodo(currentItem)}}>
          <Text style={{fontSize: 20}}>✖</Text>
        </TouchableOpacity>

      </View>
    )
  }

  deleteTodo = (item) => {
      let index = this.state.taskList.findIndex((each) => {
        return each.id == item.id;  
      });
      console.log(index);
      let copy = [...this.state.taskList];
      copy.splice(index, 1);
      this.setState({
        taskList: copy
      });
  }
  
  addTask = () => {
    if (this.state.newTask.trim() !== ''){
      let newTodo = {
        id: Math.random(1000000, 999999),
        title: this.state.newTask,
        done: false
      }

      this.setState({
        taskList: [...this.state.taskList, newTodo],
        newTask: '',
      })

    } else {
      Alert.alert("Oops!","Cannot add empty task");
    }
  }

  saveData = async () => {
    console.log("Saving");
     try {
        await AsyncStorage.setItem('todos', JSON.stringify(this.state.taskList));

        console.log('Test', AsyncStorage.getItem('todos'));
        Alert.alert("Success!","Your tasks have been saved!");
      } catch (error) {
        console.log("Error saving")
      }
  }

  loadData = async () => {
    try {
    const value = await AsyncStorage.getItem('todos');
    if (value !== null) {
      console.log("Old data loaded")
      this.setState( {taskList: JSON.parse(value)})
    } 
   } catch (error) {
     alert("Problem retriving data");
   }
  }


  componentDidMount = () => {
    this.loadData();
  }

  render() {
    return (
      <View style = {homeStyles.background}>

        <View style = {{flexDirection: 'row',justifyContent: 'space-between' }}>

          <TextInput
            value={this.state.newTask}
            onChangeText={(inputText) => {this.setState({newTask:inputText})}}
            style={homeStyles.textbox}
            placeholder='Enter new task here . . .'
            placeholderTextColor='#515151'
            autoCapitalize='sentences'
          />
          
          <TouchableOpacity 
            onPress={this.addTask} 
            style = {homeStyles.addButton}>
              <Text style = {homeStyles.buttonText} >
                ADD
              </Text>
          </TouchableOpacity>

        </View>
        
        <FlatList 
          data={this.state.taskList}
          renderItem={this.designTask}
          style={homeStyles.list}
          keyExtractor={(item) => item.id}
        />
        
        <View >
          <TouchableOpacity 
            onPress={this.saveData}
            style = {homeStyles.saveButton}>
            <Text style = {homeStyles.buttonText}> SAVE </Text>
          </TouchableOpacity>
        </View>        
        
      </View>
    )
  }
}

const homeStyles = StyleSheet.create({
  background: {
    backgroundColor: '#FFCFB7',
    flex:1,
    paddingTop:45,
  },
  list: {
    margin: 10,
    backgroundColor: '#ff8585',
    borderRadius: 15,
    borderColor: '#FF4E4E',
    borderWidth: 4,
    width: '93%',
    alignSelf: 'center',
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 100
  },  
  eachTask:{
    borderRadius: 10,
    backgroundColor: '#FFBF93',
    marginTop: 10,
    marginLeft: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 70,
  },
  deleteButton:{
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 15
  },  
  textbox: { 
    backgroundColor: '#999999', 
    borderRadius: 20, 
    height: 65, 
    paddingHorizontal: 20, 
    marginLeft: 10,
    marginRight: 5,
    justifyContent: 'center',
    flex:60,
    borderColor: '#676767',
    borderWidth: 4
  },
  addButton: {                         
    backgroundColor: '#00B4FF',
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 10,
    height: 65,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex:15,
    borderColor: '#0084BC',
    borderWidth: 4
    },
  saveButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#00B4FF',
    borderRadius: 100,
    width: '93%',
    height: 60,
    borderColor: '#0084BC',
    borderWidth: 4,
  },
  buttonText: {
    fontWeight:'bold', 
    fontSize: 20,
    fontFamily: 'sans-serif-light'
  }
})