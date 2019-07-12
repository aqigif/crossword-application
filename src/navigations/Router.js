import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";

import LoadingScreen from "../screens/Loading/Loading";
import LoginScreen from "../screens/Login/index";
import RegisterScreen from "../screens/Register/index";
import HomeScreen from "../screens/Home/index";
import CrosswordScreen from "../screens/Crossword/index";
import ProfileScreen from "../screens/Profile/index";



const AppStack = createStackNavigator({ 
  Home: {
    screen:HomeScreen,
  }, 
  Profile : {
    screen:ProfileScreen,
  },
  Crossword:{ 
    screen: CrosswordScreen,
  },
});

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const AuthLoadingScreen = createStackNavigator(
  { Loading: LoadingScreen },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);


  const CrosswordRoute = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
  export default createAppContainer(CrosswordRoute);
