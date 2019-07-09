import { createSwitchNavigator, createStackNavigator, createAppContainer ,createMaterialTopTabNavigator} from 'react-navigation';

import LoadingScreen from "../screens/Loading/Loading"
import LoginScreen from "../screens/Login/index"
import HomeScreen from "../screens/HomeScreen/index"



const AppStack = createStackNavigator({ 
  Home: HomeScreen, 
},{
  headerMode: 'none',
  navigationOptions: {
  headerVisible: false,
},});
const AuthStack = createStackNavigator({ Login: LoginScreen },{
  headerMode: 'none',
  navigationOptions: {
  headerVisible: false,
},});
const AuthLoadingScreen = createStackNavigator({Loading:LoadingScreen },{
  headerMode: 'none',
  navigationOptions: {
  headerVisible: false,
},});



export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));