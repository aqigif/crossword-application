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
    this.state= {
      answers:[],
      indexes:[],
      userAnswer:[],
    }
  }  
  componentWillMount(){
    this.fetchAllAnswers()
  }
  async fetchAllAnswers(){
    const rest = await axios.get(`http://192.168.0.23:3333/api/answers`)
    .then(res => {
      this.setState({answers: res.data.data})})
    .catch(err => console.log(err))
    
    console.log(this.state.answers)
    // let a=[1,2,3,4]
    // let b=[5,6,7]
    // let c=a.push(...b)
    // console.log(a)
    
    // for(let i=0; i < this.state.answers.length; i++){
    //   this.state.indexes.push(...this.state.answers[i].indexes.split(',').map(function(item){
    //     return parseInt(item,10)
    //   }))
    // }
    // this.setState({ myArray: [...this.state.myArray, ...[1,2,3] ] })    
    
    
    // console.log(this.state.answers[0].indexes.split(',').map(function(item){
    //       return parseInt(item,10)}))
    
  }
  
  render() {
    
    const list = [1,2,3,4,8,9,10,11,12,13,14,15,16,17,18,21,22,23,25,26,27,32,33,34,35]
    // console.log("index di render")
    // console.log(this.state.answers)
    
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
    var i =-1
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
    // console.log(indexes)
    // console.log(letters)
    console.log(results)
    const data = Array.from({length:36}, (x,i) =>{
      return {key:i}
    })
    const dataArray = Array(36)
    for(let i = 0; i < 36; i++){
      dataArray[i] = i
    }
    console.log("data")
    // console.log(data)
     return (
      <View style={styles.container}>
        <View style={styles.viewCrossWord}>
          <FlatList
            data = {data}
            numColumns={Math.sqrt(36)}
            
            renderItem={({item, index}) =>{
              
              if(indexes.includes(dataArray[index])){
                i+=1 
                return(
                  <Input  style={styles.activeInput}
                        maxLength={1}
                        lowercase={false}
                        autoCapitalize='characters'
                        // placeholder={results.filter(result => result.index === item.key).map(result => result.letter).toString()}
                        placeholder={dataArray[index].toString()}
                        key={dataArray[index].toString()}/>
                )
              }else{
                
                return(
                  <Input disabled style={styles.inactiveInput}/>
                )
              }
              // if(results.some(result => result.index == item.key)){
              //   i+=1
              //   return(
              //     <Input style={styles.activeInput}
              //           maxLength={1}
              //           lowercase={false}
              //           autoCapitalize='characters'
              //           placeholder={results.filter(item => item.index === item.key).map(item => item.letter).toString()}
              //           // key={letters[item.key]}/>
              //           />
                  
                  
              //   )
              // }else{
              //   return(
              //     <Input disabled style={styles.inactiveInput}/>
              //   )
              // }
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
        <Button><Text>Submit</Text></Button>
        {/* <View style={styles.viewQuestion}>
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
        </View> */}
        
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



