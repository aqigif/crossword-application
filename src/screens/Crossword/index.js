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
      StyleSheet,
      ScrollView} from 'react-native'
import { Input, 
        Button,
        Text, 
        Item} from 'native-base'
import axios from 'axios'
import configs from '../../../config'

export default class App extends Component {
  
  constructor(){
    super()
    global.userAnswers=[]
    this.state= {
      answers:[],
      indexes:[], 
      crosswordId:"",
      userId:""
    }
    
    
  }  
  componentDidMount(){
    const { navigation } = this.props;
    const id = navigation.getParam('userId')
    const idCrossword = navigation.getParam('crosswordId')
    this.setState({userId:id, crosswordId:idCrossword})
    this.fetchAllAnswers()
  }
  async fetchAllAnswers(){
    const { navigation } = this.props;
    const crosswordId = navigation.getParam('crosswordId')

    const rest = await axios.get(`http://${configs.BASE_URL}:3333/api/answers/${crosswordId}`)
    .then(res => {
      console.log(res.data.data)
      this.setState({answers: res.data.data})})
    .catch(err => console.log(err.response))
    
    console.log("answers")
    console.log(this.state.answers)
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
    
    // console.log(global.userAnswers)
    // console.log(letters)
    // alert(this.state.answers[1].users[0].pivot.id)

    if(global.userAnswers.length < letters.length){
      alert("Isi semua soal terlebih dahulu")
    }else{
      if(jumlahSalah > 0){
        alert("Masih ada yang salah")
        
      }else{
        alert("Selamat anda lulus!!")
        this.updateUserAnswers()
        this.updateIsFinished()
        this.props.navigation.navigate('Home')
      }
    }
    
  }
  async updateUserAnswers(){
    for(let a =0; a < this.state.answers.length; a++){
      let letters = []
      let letter = this.state.answers[a].answer.split('')

      for(let b = 0; b < letter.length; b++){
        letters.push(
          letter[b]
        )
      }
      console.log()
      let answerId = this.state.answers[a].id
      const rest = await axios.patch(`http://${configs.BASE_URL}:3333/api/user_answer/update`,{
          userId:this.state.userId,
          answerId:answerId,
          answer : letters.join('')
        })
        .then((response) => {
          console.log(response)
        })
    }

  }
  async updateIsFinished(){
    console.log("yeee")
    console.log(this.state.userId)
    console.log(this.state.crosswordId)
    
    const rest = await axios.patch(`http://${configs.BASE_URL}:3333/api/user_crossword/update`,{
      userId:this.state.userId,
      crosswordId:this.state.crosswordId,
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
      <ScrollView>
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
                  item.type === "mendatar" ? <Text key={index}>{item.number}. {item.question}</Text> : null
                ))
              }
          </View>
          <View style={styles.viewQuestionType}> 
            <Text style={styles.titleQuestionType}>Menurun</Text>
            {
              this.state.answers.map((item, index) => (
                item.type === "menurun" ? <Text key={index}>{item.number}. {item.question}</Text> : null        
              ))
            }
          </View>
        </View>
        </View>
      </ScrollView>
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
    borderRadius:0,
    borderColor:'black',
    textAlign:'center',
  },
  inactiveInput:{
    backgroundColor:'black',
  }
})



