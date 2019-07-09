import { createSwitchNavigator, createStackNavigator, createAppContainer ,createMaterialTopTabNavigator} from 'react-navigation';

import LoadingScreen from "../screens/Loading/Loading"
import LoginScreen from "../screens/Login/index"
import RegisterScreen from "../screens/Register/index"
import HomeScreen from "../screens/HomeScreen/Index"
import CrosswodScreen from "../screens/CrosswodScreen/index"



const AppStack = createStackNavigator({ 
  Home: HomeScreen, 
  Crosswod: CrosswodScreen, 
},{
  headerMode: 'none',
  navigationOptions: {
  headerVisible: false,
},});
const AuthStack = createStackNavigator({ Login: LoginScreen, Register:RegisterScreen },{
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