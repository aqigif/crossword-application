import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList
} from "react-native";

class Box extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      if(!this.props.letter){
        return(
          <View style={styles.crosswordBoxBlack} />
        )
      }
      if(this.props.number){
          return(
      <View style={styles.crosswordBox}>
        <Text style={{ position: "absolute", left: 5, top: 0 }}>{this.props.number}</Text>
        <TextInput maxLength={1} style={styles.inputCrossword} />
      </View>)
      }
      return(
        <View style={styles.crosswordBox}>
          <TextInput maxLength={1} style={styles.inputCrossword} />
        </View>

      )
  }
}

export default Box;

const styles = StyleSheet.create({
  inputCrossword: { height: "100%", width: "100%", textAlign: "center" },
  crosswordBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  crosswordBoxBlack: {
    backgroundColor: "#000",
    borderRadius: 10,
    margin: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
