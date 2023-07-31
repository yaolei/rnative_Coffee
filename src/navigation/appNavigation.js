import {NavigationContainer} from '@react-navigation/native';
import {Dimensions, LogBox, Platform, Text, View} from 'react-native'

import HomeScreen from '../screens/HomeScreen'
import ProductScreen from '../screens/ProductScreen'
import {themeColor} from '../theme'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline, UserIcon as UserIconOutLine } from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid,  UserCircleIcon as UserIconSolid} from 'react-native-heroicons/solid';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform == 'ios'

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    "ViewPropTypes will be removed",
    "exported from 'deprecated-react-native-prop-types'.",
  ]);

export default function AppNavigation () {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions ={{
                constentStyle: {backgroundColor: 'white'}
            }}>
                <Stack.Screen name='Home' option={{headerShow: false}} 
                component={HomeTabs}/>
                <Stack.Screen name='Product' option={{headerShow: false}} 
                component={ProductScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => menuIcons(route, focused),
                tabBarStyle: {
                  marginBottom: 20,
                  height: 75,
                  alignItems: 'center',
                  
                  borderRadius: 100,
                  marginHorizontal: 20,
                  backgroundColor: themeColor.bgLight,
        
                },
                tabBarItemStyle: {
                  marginTop: ios? 30: 0,
                  
                }
              })}
        >
            <Tab.Screen name='home' component={HomeScreen} />
            <Tab.Screen name='favourite' component={HomeScreen} />
            <Tab.Screen name='cart' component={HomeScreen} />
            <Tab.Screen name='user' component={HomeScreen} />
        </Tab.Navigator>
    )
}
const menuIcons = (route, focused)=> {
    let icon;
    
    if (route.name === 'home') {
      icon =  focused? <HomeSolid size="30" color={themeColor.bgLight} /> : <HomeOutline size="30" strokeWidth={2} color="white" />
    } else if (route.name === 'favourite') {
      icon =  focused? <HeartSolid size="30" color={themeColor.bgLight} /> : <HeartOutline size="30" strokeWidth={2} color="white" />
    }else if(route.name==='cart'){
      icon =  focused? <BagSolid size="30" color={themeColor.bgLight} /> : <BagOutline size="30" strokeWidth={2} color="white" />
    }else if (route.name==='user') {
        icon =  focused? <UserIconSolid size="30" color={themeColor.bgLight} /> : <UserIconOutLine size="30" strokeWidth={2} color="white" />
    }
  
    
    let buttonClass = focused? "bg-white": "";
    return (
      <View className={"flex items-center rounded-full mt-8 p-3 shadow " + buttonClass}>
        {icon}
      </View>
    )
  }