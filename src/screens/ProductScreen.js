import React, {useState} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ArrowLeftCircleIcon, ShoppingBagIcon} from 'react-native-heroicons/outline'
import {StatusBar} from 'expo-status-bar'
import {useNavigation} from '@react-navigation/native'
import { HeartIcon, MinusIcon, StarIcon } from 'react-native-heroicons/solid'
import { PlusIcon } from 'react-native-heroicons/outline'
import { themeColor } from '../theme'

const ProductScreen = (props) => {
  const item = props.route.params;
  const naigation = useNavigation()
  const [size, setSize] = useState('small')
  const [buyNum, setBuyNum] = useState(1)
  const [like, setLike]  = useState(false)
  return (
        <View className="flex-1"> 
          <StatusBar style='light'/>
          <Image 
          source={require('../../assets/images/beansBackground2.png')}
          style={{height:300, borderBottomLeftRadius:50, borderBottomRightRadius:50}} 
          className="w-full absolute"/>
        <SafeAreaView className=" space-x-4">
          <View className="mx-4 flex-row justify-between items-center">
            <TouchableOpacity onPress={()=> naigation.goBack()}>
              <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
            </TouchableOpacity>

            <TouchableOpacity className="rounded-full border-2 border-white p-2"
              onPress={()=>setLike(!like)}>
              <HeartIcon size="24" color={like?"white": "red"} />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center"
            style={{
              shadowColor: themeColor.bgDark,
              shadowOpacity:0.9,
              shadowRadius:30,
              shadowOffset:{width:0, height:30}
            }}
          >
            <Image source={item.image} className="w-60 h-60" />
          </View>
          <View className="flex-row items-center rounded-3xl mx-4 p-1 px-2 space-x-1 w-16 opacity-90"
             style={{backgroundColor: themeColor.bgLight}}>
                <StarIcon size="15" color="white" />
                <Text className = "text-base font-semibold text-white">{item.stars}</Text>
            </View>

            <View className="m-4 flex-row justify-between items-center">
                <Text style={{color:themeColor.text}}  className="text-3xl font-semibold">
                    {item.name}
                </Text>
                <Text style={{color:themeColor.text}}  className="text-lg font-semibold">
                    $ {item.price * (
                      size == 'small'? 1: size == 'medium'? 1.5: size == 'Large'?2:1
                      )} 
                </Text>
            </View>
            
            <View className="mx-2 space-y-2">
              <Text style={{color:themeColor.text}} className="text-lg font-bold">
                Coffe size
              </Text>
              <View className="flex-row justify-between">
                <TouchableOpacity
                className="p-3 px-8 rounded-full"
                onPress={() => setSize('small')}
                style={{
                  backgroundColor:size =='small'? themeColor.bgLight:'rgba(0, 0, 0, 0.07)'
                }}>
                  <Text className={size == 'small'?'text-white':'text-gray-700'}>Samll</Text>
                </TouchableOpacity>
                <TouchableOpacity
                className="p-3 px-8 rounded-full"
                onPress={() => setSize('medium')}
                style={{backgroundColor:size =='medium'? themeColor.bgLight:'rgba(0, 0, 0, 0.07)'}}>
                  <Text className={size == 'medium'?'text-white':'text-gray-700'}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity
                className="p-3 px-8 rounded-full"
                onPress={() => setSize('Large')}
                style={{ backgroundColor:size =='Large'? themeColor.bgLight:'rgba(0, 0, 0, 0.07)'}}>
                  <Text className={size == 'Large'?'text-white':'text-gray-700'}>Large</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View className="mx-4 space-y-2 h-28">
              <Text style={{color:themeColor.text}} className="text-lg font-bold">
                  About
              </Text>
              <Text className="text-gray-600">
                  {item.desc}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mx-4 mb-2">
                <View className="flex-row items-center space-x-1">
                  <Text className="text-base text-gray-700 font-semibold opacity-60">
                    Volume
                  </Text>
                  <Text className="text-base text-black font-semibold">
                    {parseInt(item.volume) + (
                      size == 'small'? 0: size == 'medium'? 30: size == 'Large'?50:0
                      )} ml
                  </Text>
                </View>
                <View className="flex-row items-center space-x-4 border-gray-500 border rounded-full p-1 px-4">
                  <TouchableOpacity onPress={()=>buyNum >1 ?setBuyNum(buyNum -1):1}>
                      <MinusIcon size="20" strokeWidth={3} color={themeColor.text} />
                  </TouchableOpacity>
                  <Text style={{color:themeColor.text}} className="font-extrabold text-lg">{buyNum}</Text>
                  <TouchableOpacity  onPress={()=>setBuyNum(buyNum + 1)}>
                      <PlusIcon size="20" strokeWidth={3} color={themeColor.text} />
                  </TouchableOpacity>
                </View>
            </View>
            <View className="flex-row justify-between items-center mx-4 mt-4">
                <TouchableOpacity className="p-4 rounded-full border border-gray-400">
                  <ShoppingBagIcon size="30"  color="gray" />
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:themeColor.bgLight}}
                className="p-5 rounded-full flex-1 ml-3">
                  <Text className="text-center text-base font-semibold text-white">
                     Buy now
                  </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </View>
  )
}

export default ProductScreen
 

