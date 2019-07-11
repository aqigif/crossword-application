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
import { Right,Left,Header } from "native-base";
import { Icon } from "react-native-elements";
import { Menu, MenuOption , MenuOptions , MenuTrigger } from 'react-native-popup-menu';
import {withNavigation} from 'react-navigation';


class HomeScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      userSelected: [],
      data: [
        {id: 1,name: "Dunia Hewan",is_finished:0},
        {id: 2,name: "Dunia Makanan",is_finished:1},
        {id: 3,name: "Dunia Manji",is_finished:1},
        {id: 4,name: "Dunia Manji",is_finished:1},
        {id: 5,name: "Dunia Manji",is_finished:1},
        {id: 6,name: "Dunia Manji",is_finished:1},
      ]
    };
  }

  
  handleLogout = () =>{
    AsyncStorage.clear()
    this.props.navigation.navigate('Login')
    alert('Berhasil Logout')
  }
  static navigationOptions = {
    title: "Select Level",
    header: (
      <Header style={{backgroundColor:'white'}} androidStatusBarColor='black'>
        <Left>
          <Text style={{fontSize: 20,fontWeight:'bold',width:190}}>
            CrossWord
          </Text>
        </Left>
        <Right>
          <Menu >
            <MenuTrigger ><Icon name="more-vert" /></MenuTrigger>
            <MenuOptions >
              <MenuOption value={1} text='Setting' style={{padding:11}} />
              <MenuOption onSelect={this.handleLogout} text='Logout'  style={{padding:11}} />
            </MenuOptions>
          </Menu>
        </Right>
      </Header>
  )
  };


  clickEventListener = item => {
    Alert.alert("Message", "Item clicked. " + item.name);
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <ScrollView>
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
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(HomeScreen)

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
