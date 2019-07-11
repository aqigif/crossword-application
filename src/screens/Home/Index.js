import { Icon } from "react-native-elements";
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
                onPress={() => {this.props.navigation.navigate('Crosswod',{
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