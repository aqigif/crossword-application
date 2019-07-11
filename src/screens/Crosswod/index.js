/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {View, 
      FlatList, 
      StyleSheet} from 'react-native'
import { Input, 
        Button,
        Text, 
        Item} from 'native-base'
import axios from 'axios'


export default class App extends Component {
  
  constructor(){
    super()
    global.userAnswers=[]
    this.state= {
      answers:[],
      indexes:[], 
    }
    
    
  }  
  componentWillMount(){
    this.fetchAllAnswers()
  }
  async fetchAllAnswers(){
    const rest = await axios.get(`http://192.168.0.18:3333/api/answers/1`)
    .then(res => {
      this.setState({answers: res.data.data})})
    .catch(err => console.log(err.response))
  }
  handleChangeText(userAnswer, index){
    global.userAnswers[index] = userAnswer
  }
  handleSubmit(letters){
    let jumlahSalah = 0
    for(let i =0; i < global.userAnswers.length; i++){
      if(typeof global.userAnswers[i] !== 'undefined'){
        if(global.userAnswers[i] != letters[i]){
          jumlahSalah = jumlahSalah+1
        }
      }
      
    }
    console.log(global.userAnswers)
    console.log(letters)
    if(global.userAnswers.length < letters.length){
      alert("Isi semua soal terlebih dahulu")
    }else{
      if(jumlahSalah > 0){
        alert("Masih ada yang salah")
        
      }else{
        alert("Selamat anda lulus!!")
        this.updateUserAnswers()
        this.updateIsFinished()
      }
    }
  }
  async updateUserAnswers(){
    for(let a =0; a < this.state.answers.length; a++){
      let letters = Array(10)
      let letter = this.state.answers[a].answer.split('')

      for(let b = 0; b < letter.length; b++){
        letters.push(
          letter[b]
        )
      }
      const rest = await axios.patch(`http://192.168.0.18:3333/api/user_answer/update`,{
          userId : 1,
          answerId : this.state.answers[a].id,
          answer : letters.join('')
        })
        .then((response) => {
          console.log(response)
        })
    }
  }
  async updateIsFinished(){
    const rest = await axios.patch(`http://192.168.0.18:3333/api/user_crossword/update`,{
      userId:2,
      crosswordId: 2,
      isFinished:1
    })
    .then((response) =>{
      console.log(response)
    })
  }
  render() {
    var indexes = []
    var letters = []
    
    var i =-1
    for(let a =0; a < this.state.answers.length; a++){
      let index = this.state.answers[a].indexes.split(',').map(function(item){
                  return parseInt(item,10)})
      let letter = this.state.answers[a].answer.split('')

      for(let b = 0; b < index.length; b++){
        indexes.push(
          index[b]
        )
        letters.push(
          letter[b]
        )
      }
    }
    var results =[]
    var i =0
    for(let a =0; a < this.state.answers.length; a++){
      let index = this.state.answers[a].indexes.split(',').map(function(item){
                  return parseInt(item,10)})
      let letter = this.state.answers[a].answer.split('')

      for(let b = 0; b < index.length; b++){
        results.push({
          letter: letter[b],
          index: index[b]
        })
      }
    }
    console.log("results")
    console.log(results)
    const data = Array.from({length:36}, (x,i) =>{
      return {key:i}
    })
    
    console.log("data")
     return (
      <View style={styles.container}>
        <View style={styles.viewCrossWord}>
          <FlatList
            data = {data}
            numColumns={Math.sqrt(36)}
            
            renderItem={({item, index}) =>{
              if(indexes.includes(item.key)){
                return(
                  <Input style={styles.activeInput}
                        maxLength={1}
                        lowercase={false}
                        autoCapitalize='characters'
                        onChangeText={(userAnswer) => this.handleChangeText(userAnswer, indexes.indexOf(item.key))}
                        value = {global.userAnswers[index]}/>
                )
              }else{
                return(
                  <Input disabled style={styles.inactiveInput}/>
                )
              }
            }} 
          />
          <View style={styles.viewQuestion}>
          <View style={styles.viewQuestionType}>
            <Text style={styles.titleQuestionType}>Mendatar</Text>
              {
                this.state.answers.map((item, index) => (
                  item.type === "mendatar" ? <Text key={index}>{item.question}</Text> : null
                ))
              }
          </View>
          <View style={styles.viewQuestionType}> 
            <Text style={styles.titleQuestionType}>Menurun</Text>
            {
              this.state.answers.map((item, index) => (
                item.type === "menurun" ? <Text key={index}>{item.question}</Text> : null        
              ))
            }
          </View>
        </View>
        </View>
        <Button onPress={()=>this.handleSubmit(letters)}><Text>Submit</Text></Button>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  viewCrossWord:{
    flex:2,
  },
  viewQuestion:{
    flexDirection:'row',
    flex:2,
    justifyContent:'center'

  },
  viewQuestionType:{
    margin: 10,
  },
  titleQuestionType:{
    fontWeight:'bold'
  },
  activeInput:{
    borderWidth:0.6,
    borderRadius:5,
    borderColor:'black',
    textAlign:'center',
  },
  inactiveInput:{
    backgroundColor:'black',
  }
})



