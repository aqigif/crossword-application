import React, { Component } from 'react';
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
import { Icon } from "react-native-elements";
import { Right,Left,Header } from "native-base";
import { Menu, MenuOption , MenuOptions , MenuTrigger } from 'react-native-popup-menu';
import {withNavigation} from 'react-navigation';
const axios = require('axios');
import configs from '../../../config'
import * as actionCrosswords from '../../redux/action';
import { connect } from 'react-redux';


class HomeScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      menu:[],
      token:'',
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
  async componentDidMount(){
    that = this
    const valueToken= await AsyncStorage.getItem('token')
    this.setState({
      token:valueToken
    })
    let config = {
      headers: {
        'Authorization': 'bearer ' + that.state.token
      }
    }
    axios.get(`http://${configs.BASE_URL}:3333/api/crosswords`,config)
    .then(function (response) {
      console.log(response.data)
      that.setState({
        menu:response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    
}

  handleLogout = () =>{
    AsyncStorage.clear()
    this.props.navigation.navigate('Login')
    alert('Berhasil Logout')
  }
  static navigationOptions  =  ({ navigation }) =>   {
    return {
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
              <MenuOption 
              onSelect={()=>navigation.navigate("Profile")}
               text='Profile' style={{padding:11}} />
              <MenuOption text='Setting' style={{padding:11}} />
              <MenuOption onSelect={()=>Alert.alert('Konfirmasi','Apakah anda yakin?'
                ,[{text: 'Logout', onPress: async () => {
                  try {
                    const token = await AsyncStorage.removeItem("token");
                    if (token == null) {
                      navigation.navigate("Login");
                    }
                  } catch (error) {console.error(error);}
                }},
                {text: 'Batal'}
              ]
              )} text='Logout'  style={{padding:11}} />
            </MenuOptions>
          </Menu>
        </Right>
      </Header>
    
  )
  }
  };

  clickEventListener = item => {
    Alert.alert("Message", "Item clicked. " + item.name);
  };

  render() {
    console.log('ini props home',this.props);
    
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <ScrollView>
        <FlatList
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.menu}
          keyExtractor={(item, index) => (`menu-${index}`)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {this.props.navigation.navigate('Crossword',{
                            crosswordId:item.pivot.id,
                        })}}>
                {item.pivot.is_finished==1?
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

const mapStateToProps = state => {
  return {
    menu: state.menu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    menu: () => dispatch(actionCrosswords.menu())
  }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen))


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
