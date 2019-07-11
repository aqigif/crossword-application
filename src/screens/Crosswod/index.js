
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  FlatList,
  TextInput
} from "react-native";

import { Container, Input, Content } from "native-base";
import axios from "axios";

class Board extends Component {
  constructor() {
    super();
    this.state = {
      answer: [
        {
          id: 1,
          crossword_id: 1,
          number: 1,
          question: "siapakah sa",
          answer: "kadala",
          is_clue: true,
          indexes: "0,1,2,3,4,5"
        },
        {
          id: 2,
          crossword_id: 1,
          number: 2,
          question: " suka ?",
          answer: "ayama",
          is_clue: false,
          indexes: "1,6,11,16"
        },
        {
          id: 3,
          crossword_id: 1,
          number: 3,
          question: "wis?",
          answer: "oraaa",
          is_clue: false,
          indexes: "21,22,23,24"
        }
      ]
    };
  }
  generateArray() {
    let answer = [];
    let index = [];
    this.state.answer.map(data => {
      data.indexes.split(",").map((item, key) => {
        answer.push({ index: item, value: data.answer.substr(key, 1) });
        index.push(parseInt(item));
      });
    });

    return index;
  }

  render() {
    const data = this.generateArray();
    let tts = [];

    for (let i = 0; i < 36; i++) {
      tts.push({ index: i, value: "index ke-" + i });
    }
    return (
      <View style={styles.container}>
        <View style={styles.crosswordBoxWrapper}>
          <FlatList
            data={tts}
            numColumns={6}
            renderItem={({ item }) => (
              <View>
                {data.includes(item.index) ? (
                  <View style={styles.crosswordBox}>
                    <Text style={{ position: "absolute", left: 5, top: 0 }}>
                      {item.number}
                    </Text>
                    <TextInput maxLength={1} style={styles.inputCrossword} />
                  </View>
                ) : (
                  <View style={styles.crosswordBoxBlack} />
                )}
              </View>
            )}
          />
        </View>

        <View
          style={{
            flex: 1,
            height: 40,
            backgroundColor: "#00142B",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ textAlign: "center", color: "#f4f6f6" }}>
            {this.state.question}
          </Text>
        </View>
      </View>
    );
  }
}

export default Board;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#000"
  },
  crosswordBoxWrapper: {
    marginHorizontal: 10,
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
