import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList
} from "react-native";
import Box from './components/Box'
// import console = require("console");
// import console = require("console");
// import console = require("console");
// import console = require("console");


class CrosswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { 
            id: 1,
            number: 1,
        }
      ]
    };
  }
  
  render() {
    // const list = [0,1,2,3,4,5,8,13,18,23];
    // const totalColumn = 25
    // let column = []
    // for(let i = 0; i < totalColumn; i++){
	// 	column.push(
    //        {key : i} 
	// 	)
    // }
    
    const dummy = [
        {
            letter: null,
            index: 0
        },
        {
            number: 1,
            letter: "a",
            index: 1
        },
        {
            letter: "s",
            index: 2
        },
        {
            letter: null,
            index: 3
        },
        {
            number: 2,
            index: 4
        }
    ]
   
    const data = [
        {
            number: 1,
            question: "pertanyaan",
            answer: "asd",
            indexes: "0,1,2"
        },
        {
            number: 2,
            question: "pertanyaan",
            answer: "asd",
            indexes: "4,5,6"
        }
    ]
    let result = []
    let col = 25

    // $questionNumber = 1;
    // index = 0;
    // for(let a = 0; a < col; a++){
    //     indexes
    // }



    // for(let a = 0; a < data.length; a++){
    //     let indexes = data[a].indexes.split(",")
    //     let answer = data[a].answer.split("")
    //     for(let b = 0; b < indexes.length; b++){
    //         if(b === 0){
    //             result.push(
    //                 {
    //                     number: data[a].number,
    //                     letter: data[a].answer,
    //                     index: indexes[b]
    //                 }
    //             )
    //         }else{
    //             result.push(
    //                 {
    //                     letter: data[a].answer,
    //                     index: indexes[b]
    //                 }
    //             )
    //         }
    //     }
    // }
    // console.log(result)


    // const GRID = []
    // $id = 1
    // for(let a = 0; a < data.length; a++){
        
    //     let split = data[a].indexes.split(",")
    //     for(let b = 0; b < split.length; b++){
    //         if(b == 0){
    //             GRID.push(
    //                 {
    //                     id: a,
    //                     number: data[a].number
    //                 }
    //             )
    //         }else{
    //             GRID.push(
    //                 {
    //                     id: a
    //                 }
    //             )
    //         }
    //     }
    // }
    // console.log(GRID)
    let grid= [
        {
          id: "1",
          letter: null
        },
        {
          id: "2",
          letter: "a",
          across: true,
          clue_across: 1,
          down: true,
          clue_down: 1,
          number: 2
        },
        {
          id: "3",
          letter: "r",
          across: true,
          clue_across: 1,
          down: true,
          clue_down: 1,
          number: 3
        }
  ] 
    return (
      <View style={styles.container}>
        <View style={styles.crosswordBoxWrapper}>
        <FlatList
          data={grid}
          numColumns={5}
          renderItem={({item,index}) => {
            return(
              <Box key={item.id} letter={item.letter} across={item.across} number={item.number} 
              answer={item.answer} />
            )
          }}
        />
        </View>
      </View>
    );
  }
}

export default CrosswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#000"
  },
  crosswordBoxWrapper: {
    marginHorizontal:20,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#000"
  },
  inputCrossword: { height: "100%", width: "100%", textAlign: "center" },
  crosswordBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 1,
    width: 62,
    height: 62
  },
  crosswordBoxBlack: {
    backgroundColor: "#000",
    borderRadius: 10,
    margin: 1,
    width: 62,
    height: 62
  }
});
