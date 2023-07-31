import {useState, useRef, useEffect} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput, FlatList, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StatusBar} from 'expo-status-bar'
import {themeColor} from '../theme'
import {categories, coffeeItems} from '../constants'
import {MagnifyingGlassIcon, MapPinIcon} from 'react-native-heroicons/solid'
import {BellIcon} from 'react-native-heroicons/outline'
import Carousel from 'react-native-snap-carousel'
import CoffeeCard from '../components/coffeeCard'

const HomeScreen = () => {
    const [activeCategory, setActiveCategory] = useState(1);
    const [inputFilter, setInputFilter] = useState("");
    const _textInput = useRef()
    const _animate = useRef()
    const syanceMenu = (e) => {
        setActiveCategory(e == 0 ?5:e)
    }
    const keyFilter = () => {
        if (inputFilter && inputFilter.length >= 2) {
            const reg = new RegExp(inputFilter)
            const result = categories.map(item => item.title).filter(i => i.match(reg))
            // only the results 1 could get the Id (index)
            if (result.length === 1) {
               const filter =  categories.filter(item => item.title === result.toString())[0];
               setInputFilter(result.toString())
               setActiveCategory(filter.id)
            } else {
                Alert.alert("No data found")
            }
        }

    }
    useEffect(()=>{
        _animate.current.snapToItem(activeCategory);
    },[activeCategory])

  return (
        <View className="flex-1 relative bg-white"> 
            <StatusBar />
            <Image source={require('../../assets/images/beansBackground1.png')}
            className='w-full absolute -top-5 opacity-10'
            style={{height:220}}
            />
            <SafeAreaView  className="flex-1">
                <View className="px-4 flex-row justify-between items-center">
                    <Image source={require('../../assets/images/avatar.png')}
                     className='h-9 w-9 rounded-full' />
                     <View className="flex-row items-center space-x-2">
                        <MapPinIcon size="25" color={themeColor.bgLight} />
                        <Text className="text-base font-semibold">New York, NYC</Text>
                     </View>
                    <BellIcon size="27" color="black" />
                </View>
                <View className="mx-5 mt-14">
                    <View className="flex-row justify-center items-center rounded-full p-1 bg-[#e6e6e6]">
                        <TextInput ref={_textInput} placeholder= "Search..." className="p-4 flex-1 font-semibold text-gray-700" maxLength={12} 
                        onChangeText={val => setInputFilter(val)} value={inputFilter}/>
                        <TouchableOpacity className="rounded-full p-2" 
                        style={{backgroundColor:themeColor.bgLight}} onPress={keyFilter}>
                            <MagnifyingGlassIcon size="25" strokeWidth={2} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className = "px-5 mt-6" >
                    <FlatList
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={categories} 
                     keyExtractor={item => item.id}
                     className = "overflow-visible"
                     renderItem = {({item}) => {
                        let isActive = item.id === activeCategory;
                        activeTextClass = isActive? 'text-white': 'text-gray-700'
                        return (
                            <TouchableOpacity
                            onPress={()=> {
                                setActiveCategory(item.id)
                                setInputFilter("")
                            }}
                            style={{backgroundColor:isActive? themeColor.bgLight: 'rgba(0,0,0,0.07)'}}
                            className={` p-4 px-5 rounded-full mr-2 shadow`}>
                                <Text className={`font-semibold ${activeTextClass}`}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                     }}
                     />
                </View>
                <View className="mt-16 py-2">
                    <Carousel
                        containerCustomStyle={{overflow: 'visible'}}
                        data={coffeeItems}
                        ref={_animate}
                        renderItem={({item}) => <CoffeeCard item={item} />} 
                        firstItem={1}
                        loop={true}
                        onBeforeSnapToItem={(e) => syanceMenu(e)}
                        inactiveSlideOpacity={0.75}
                        inactiveSlideScale={0.77}
                        sliderWidth={400}
                        itemWidth={260}
                        sliderStyle={{display:'flex', alignItems: 'center'}}
                    />

                </View>
            </SafeAreaView>
        </View>
  )
}

export default HomeScreen