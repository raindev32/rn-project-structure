import React from 'react'
import {
  StatusBar,
  View,
  StyleSheet,
  Platform
} from 'react-native'
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import color from 'theme/color'

import TabBarItem from 'screens/components/TabBarItem'
import ForgotPasswordScreen from 'screens/ForgotPassword'

// Auth
import Login from 'screens/Auth/Login'
import Register from 'screens/Auth/Register'
import ResetPassword from 'screens/Auth/ResetPassword'
import ChangePassword from 'screens/Auth/ChangePassword'

// User
import EditProfile from 'screens/User/EditProfile'
import Setting from 'screens/User/Setting'
import Address from 'screens/User/Address'
import AddAddress from 'screens/User/AddAddress'
import Profile from 'screens/User/Profile'
import Notification from 'screens/User/Notification'
import EmailScreen from 'screens/User/EmailScreen'

// Content
import Home from 'screens/Content/Home'

// Transaction
import Checkout from 'screens/Transaction/Checkout'
import TransactionList from 'screens/Transaction/TransactionList'
import TransactionDetail from 'screens/Transaction/TransactionDetail'
import UploadInvoice from 'screens/Transaction/UploadInvoice'

// Local Transaction
import Bundle from 'screens/LocalTransaction/Bundle'
import BundleDetail from 'screens/LocalTransaction/BundleDetail'
import Cart from 'screens/LocalTransaction/Cart'
import CartDetail from 'screens/LocalTransaction/CartDetail'
import PhotoDetail from 'screens/LocalTransaction/PhotoDetail'
import UploadPhotos from 'screens/LocalTransaction/UploadPhotos'
import PhotoList from 'screens/LocalTransaction/PhotoList'
import VerificationPage from './screens/VerificationPage'

import VersionChecker from './screens/VersionChecker'

import AuthLoadingScreen from './root/AuthLoadingScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const BottomTabNavigatorConfig = {
  // tabBarComponent: null,
  initialRouteName: 'Home',
  backBehavior: 'history',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  mode: 'card',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: color.primaryColor,
    inactiveTintColor: color.inputTextColor,
    style: {
      backgroundColor: color.textIcons,
      height: 60
    },
    labelStyle: {
      marginTop: -4,
      fontSize: 12
    },
    indicatorStyle: {
      height: 0
    }
  },
  navigationOptions: {
    headerMode: 'float',
    headerTitleAllowFontScaling: false,
    headerTintColor: color.textIcons,
    headerLeft: null,
    headerStyle: {
      height: 0,
      paddingTop: 0,
      color: color.primaryColor,
      backgroundColor: color.textIcons
    }
  }
}

// Bagian ini sudah login.
const Main = createBottomTabNavigator({
  Home: {
    screen: createStackNavigator({
      Home
    }),
    navigationOptions: () => {
      return ({
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            tintColor={tintColor}
            iconName="home"
          />
        )
      })
    }
  },
  Bundle: {
    screen: createStackNavigator({
      Product: {
        screen: Bundle
      }
    }),
    navigationOptions: () => {
      return ({
        tabBarLabel: 'Category',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            tintColor={tintColor}
            iconName="appstore-o"
          />
        )
      })
    }
  },
  Cart: {
    screen: createStackNavigator({
      Cart: {
        screen: Cart
      }
    }),
    navigationOptions: () => {
      return ({
        tabBarLabel: 'Cart',
        tabBarIcon: ({ focused, tintColor }) => {
          return (
            <TabBarItem
              focused={focused}
              tintColor={tintColor}
              iconName="shoppingcart"
            />
          )
        }
      })
    }
  },
  Profile: {
    screen: createStackNavigator({
      Profile
    }),
    navigationOptions: () => {
      return ({
        tabBarLabel: 'Account',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            tintColor={tintColor}
            iconName="user"
          />
        )
      })
    }
  }
}, BottomTabNavigatorConfig)

// Bagian ini membutuhkan Login First.
const MainAuth = createBottomTabNavigator({
  Home: {
    screen: createStackNavigator({
      Home
    }),
    navigationOptions: () => {
      return ({
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            tintColor={tintColor}
            iconName="home"
          />
        )
      })
    }
  },
  Product: {
    screen: Login,
    navigationOptions: () => {
      return ({
        tabBarLabel: 'Category',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            tintColor={tintColor}
            iconName="appstore-o"
          />
        )
      })
    }
  },
  Transaction: {
    screen: Login,
    navigationOptions: () => {
      return ({
        tabBarLabel: 'Cart',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            tintColor={tintColor}
            iconName="shoppingcart"
          />
        )
      })
    }
  },
  Login: {
    screen: Login,
    navigationOptions: () => {
      return ({
        tabBarLabel: 'Account',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            tintColor={tintColor}
            iconName="user"
          />
        )
      })
    }
  }
}, BottomTabNavigatorConfig)

const RequireAuth = createStackNavigator(
  {
    Main,
    AddAddress,
    VerificationPage,
    ChangePassword,
    Notification,
    Profile,
    EditProfile,
    Setting,
    EmailScreen,
    Checkout,
    TransactionList,
    TransactionDetail,
    UploadInvoice,
    Address,
    Bundle,
    BundleDetail,
    Cart,
    CartDetail: {
      screen: CartDetail
    },
    PhotoList: {
      screen: PhotoList,
      navigationOptions: {
        headerLeft: null,
        headerStyle: {
          height: 0,
          paddingTop: 0
        }
      }
    },
    UploadPhotos: {
      screen: UploadPhotos,
      navigationOptions: {
        headerLeft: null,
        headerStyle: {
          height: 0,
          paddingTop: 0
        }
      }
    },
    PhotoDetail,
    VersionChecker
  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      headerMode: 'float',
      headerTitleAllowFontScaling: false,
      headerTintColor: '#6418b5',
      headerStyle: {
        height: 0,
        paddingTop: 0,
        color: color.textIcons,
        backgroundColor: color.primaryColor
      }
    }
  }
)

const LoginStack = createStackNavigator(
  {
    Main: MainAuth,
    ForgotPassword: {
      screen: ForgotPasswordScreen
    },
    VerificationPage: {
      screen: VerificationPage
    },
    Register,
    ResetPassword,
    Notification,
    BundleItem: {
      screen: Login
    },
    BundleDetail: {
      screen: Login
    },
    ChooseStore: {
      screen: Login
    },
    VersionChecker
  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      headerMode: 'float',
      headerTitleAllowFontScaling: false,
      headerTintColor: '#6418b5',
      headerStyle: {
        height: 0,
        paddingTop: 0,
        color: color.primaryColor,
        backgroundColor: color.primaryColor
      }
    }
  }
)

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RequireAuth,
    Auth: LoginStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

const AppContainer = createAppContainer(AppNavigator)

class Routes extends React.Component {
  render () {
    return (
      <View
        style={styles.container}
      >
        <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} backgroundColor={color.primaryColor} />
        <AppContainer
          ref={(nav) => {
            this.navigator = nav
          }}
        />
      </View>
    )
  }
}

export default Routes
