// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   Alert,
//   ScrollView,
//   AsyncStorage
// } from "react-native";
// import { Body } from "native-base";
// import { Icon } from "react-native-elements";

// class HomeScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modalVisible: false,
//       userSelected: [],
//       data: [
//         {id: 1,name: "Dunia Hewan",is_finished:0},
//         {id: 2,name: "Dunia Makanan",is_finished:1},
//         {id: 2,name: "Dunia Manji",is_finished:1},
//       ]
//     };
//   }

//   clickEventListener = item => {
//     Alert.alert("Message", "Item clicked. " + item.name);
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           style={styles.contentList}
//           columnWrapperStyle={styles.listContainer}
//           data={this.state.data}
//           keyExtractor={item => {
//             return item.id;
//           }}
//           renderItem={({ item }) => {
//             return (
//               <TouchableOpacity
//                 style={styles.card}
//                 onPress={() => {this.props.navigation.navigate('Crosswod')}}>
//                 {item.is_finished==1?
//                 (<Icon name="check-circle" color='green' size={40} />):
//                 (<View style={styles.circle}></View>)}
//                 <View style={styles.cardContent}>
//                   <Text style={styles.name}>{item.name}</Text>
//                 </View>
//               </TouchableOpacity>
//             );
//           }}
//         />
//       </View>
//     );
//   }
// }

// export default HomeScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ebf0f7"
//   },
//   contentList: {
//     flex: 1,
//   },
//   cardContent: {
//     marginLeft: 20,
//     marginTop:5
//   },
//   circle: {
//     borderWidth: 2,
//     width:36,
//     height:36,
//     borderRadius:36/2
//   },

//   card: {
//     shadowColor: "#00000021",
//     shadowOffset: {
//       width: 0,
//       height: 6
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 7.49,
//     elevation: 12,

//     margin: 10,
//     backgroundColor: "white",
//     padding: 10,
//     flexDirection: "row",
//     borderRadius: 30
//   },

//   name: {
//     fontSize: 18,
//     flex: 1,
//     alignSelf: "center",
//     color: "#000",
//     fontWeight: "bold"
//   },
//   count: {
//     fontSize: 14,
//     flex: 1,
//     alignSelf: "center",
//     color: "#6666ff"
//   },
// });


import React, { Component } from  'react'
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    FlatList,
    TextInput
} from 'react-native'

import {Container, Input, Content} from 'native-base'
import axios from 'axios'

class Board extends Component {

    constructor(){
        super()
        this.state = {
            answer : [
                {
                    "id": 1,
                    "crossword_id": 1,
                    "number": 1,
                    "question": "siapakah yousufe",
                    "answer": "kadal",
                    "is_clue": true,
                    "indexes": '0,1,2,3,4'
                },
                {
                    "id": 2,
                    "crossword_id": 1,
                    "number": 2,
                    "question": "kita suka apa?",
                    "answer": "ayam",
                    "is_clue": false,
                    "indexes": '1,6,11,16'
                },
            ],
        }
    }
    generateArray() {

        let answer = []
        let index = []
        this.state.answer.map((data) => {
                data.indexes.split(',').map((item,key) => {
                    answer.push({index:item, value:data.answer.substr(key,1)})
                    index.push(parseInt(item))
                })
            })



        return index
    }

    render(){
        const data = this.generateArray()
        let tts = []
        
        for (let i = 0; i < 25; i++) {
            tts.push({index: i, value:'index ke-'+i})
        }
        return(
            
      <View style={styles.container}>
      <View style={styles.crosswordBoxWrapper}>
                        <FlatList data={tts} numColumns={5} renderItem={({item}) => 
                          
                          <View>      
                           { 
                               data.includes(item.index) 
                                ?
                                <View style={styles.crosswordBox}>
                                <Text style={{ position: "absolute", left: 5, top: 0 }}>{item.index}</Text>
                                <TextInput maxLength={1} style={styles.inputCrossword} />
                              </View>
                                :
                                <View style={styles.crosswordBoxBlack} />
                            }
                          </View>

                        }
                        />
                    </View>
                    
                    <View style={{
                        flex: 1, height: 40, backgroundColor: '#00142B', flexDirection: 'row', alignItems: 'center'
                        , justifyContent: 'center'
                    }}>
                        <Text style={{ textAlign: "center", color: '#f4f6f6' }}>{this.state.question}</Text>
                    </View>
      </View>
        )
    }

}

export default Board

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