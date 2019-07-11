import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  AsyncStorage
} from "react-native";
import { Body } from "native-base";
import { Icon } from "react-native-elements";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [
        {id: 1,name: "Dunia Hewan",is_finished:0},
        {id: 2,name: "Dunia Makanan",is_finished:1},
        {id: 2,name: "Dunia Manji",is_finished:1},
      ]
    };
  }
  clickEventListener = item => {
    Alert.alert("Message", "Item clicked. " + item.name);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.data}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {this.props.navigation.navigate('Crosswod')}}>
                {item.is_finished==1?
                (<Icon name="check-circle" color='green' size={40} />):
                (<View style={styles.circle}></View>)}
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebf0f7"
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop:5
  },
  circle: {
    borderWidth: 2,
    width:36,
    height:36,
    borderRadius:36/2
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    margin: 10,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#000",
    fontWeight: "bold"
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#6666ff"
  },
});
