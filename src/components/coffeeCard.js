import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {themeColor} from '../theme'
import { StarIcon } from 'react-native-heroicons/solid'
import { PlusIcon } from 'react-native-heroicons/outline'


const coffeeCard = ({item}) => {
    const navigation = useNavigation()
  return (
        <View className="w-[250px] h-[350px] rounded-[40px] "
         style={{
                backgroundColor: themeColor.bgDark,
        }}>
            <View style={{
                shadowColor:'black',
                shadowOpacity: 0.8,
                shadowRadius:30,
                shadowOffset:{width:0, height:40}
            }}
                className="flex-row justify-center -mt-14"
            >
                <Image source = {item.image} className="h-40 w-40" />
            </View>
            <View className="px-5 mt-5 space-y-3 ">
                <Text className = "text-3xl text-white font-semibold z-10" >
                    {item.name}
                </Text>
            </View>
            <View className="flex-row items-center rounded-3xl m-4 p-1 px-2 space-x-1 w-16"
             style={{backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                <StarIcon size="15" color="white" />
                <Text className = "text-base font-semibold text-white">{item.stars}</Text>
            </View>
            <View className="flex-row space-x-1 z-10 mb-6 ml-4">
                <Text className="text-base text-white font-semibold opacity-60">
                    Volume
                </Text>
                <Text className="text-base text-white font-semibold ">
                    {item.volume} ml
                </Text>
            </View>
            <View style={{
                backgroundColor:themeColor.bgDark,
                shadowColor:themeColor.bgDark,
                shadowOffset:{width:0, height:40},
                shadowRadius: 25,
                shadowOpacity:0.8

            }}
            className="flex-row justify-between items-center ml-4 rounded-[25px]"
            >
                <Text className="text-white font-bold text-lg">
                  $ {item.price}
                </Text>
                <TouchableOpacity className="p-4 bg-white rounded-full mr-4" 
                onPress={() => navigation.navigate("Product", {...item})}
                style={{
                    shadowColor:"black",
                    shadowOffset:{width:-20, height:-10},
                    shadowRadius: 40,
                    shadowOpacity:1
    
                }}>
                    <PlusIcon size="25" strokeWidth={2} color={themeColor.bgDark} />
                </TouchableOpacity>
            </View>
        </View>
  )
}

export default coffeeCard