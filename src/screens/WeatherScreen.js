import { View, Text, StyleSheet, Image, TextInput, Pressable, Alert, ImageBackground, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
const api_key = 'bfa1bb833c275d8ec6f17658a1db704e';
// const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=goa&appid=bfa1bb833c275d8ec6f17658a1db704e`;
// https://api.openweathermap.org/data/2.5/weather?units=metric&q=goa&appid=bfa1bb833c275d8ec6f17658a1db704e


let currentDate = new Date();


let day = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();

let formattedDate = year + '-' + month + '-' + day;

var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayName = daysOfWeek[currentDate.getDay()];
const WeatherScreen = () => {
    const [weather, setWeather] = useState({ cityName: 'delhi', countryName: 'india', weatherType: 'clear', temp: 23, windSpeed: 55, humidity: 38 });
    const [location, setLocation] = useState('');
    const [time, setTime] = useState(formattedDate);

    const fecthWeather = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=goa&appid=bfa1bb833c275d8ec6f17658a1db704e`);
        const data = await response.json();
        if (response.status == 404 || response.status == 400 || response.status == 402 || response.status == 403) {
            Alert.alert('Please Enter Valid City Name');
        }
        else {
            setWeather(
                { cityName: data.name, countryName: data.sys.country, weatherType: data.weather[0].main, temp: Math.round(data.main.temp), windSpeed: Math.round(data.wind.speed), humidity: Math.round(data.main.humidity) }
            )
        }
    }

    useEffect(() => {
        fecthWeather();
    }, [])

    const handleLocation = async () => {
        if (location === '') {

        }
        else {
            const response = await fetch(`${url}${location}&appid=${api_key}`);
            const data = await response.json();
            if (response.status == 404) {
            }
            else {
                setWeather(
                    { cityName: data.name, countryName: data.sys.country, weatherType: data.weather[0].main, temp: Math.round(data.main.temp), windSpeed: Math.round(data.wind.speed), humidity: Math.round(data.main.humidity) }
                )
            }
        }
        Keyboard.dismiss();
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/weather.jpg')} style={styles.backgroundImage} blurRadius={5} >
                <View style={styles.view1}>
                    <View style={styles.view2}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Enter City Name'
                            placeholderTextColor={'lightgray'}
                            onChangeText={text => {
                                setLocation(text)
                            }}
                            value={location}
                        ></TextInput>
                        <Pressable style={styles.pressable1}
                            onPress={handleLocation}>
                            <MaterialIcons name="location-searching" size={30} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.view3}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: 24 }}>{weather.cityName},</Text>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 22, marginLeft: 4 }}>{weather.countryName}</Text>
                        </View>
                        {
                            (weather.weatherType === "Clouds") &&
                            <Image source={require('../../assets/clouds.png')} />
                        }
                        {
                            (weather.weatherType === "Clear") &&
                            <Image source={require('../../assets/clear.png')} />
                        }
                        {
                            (weather.weatherType === "Rain") &&
                            <Image source={require('../../assets/rain.png')} />
                        }
                        {
                            (weather.weatherType === "Drizzle") &&
                            <Image source={require('../../assets/drizzle.png')} />
                        }
                        {
                            (weather.weatherType === "Mist") &&
                            <Image source={require('../../assets/mist.png')} />
                        }
                        <Text style={{ color: 'white', fontSize: 64, fontWeight: '600', marginTop: 4, }}>{weather.temp}°C</Text>
                        <Text style={{ color: 'white', fontSize: 32, fontWeight: '500', marginTop: 8 }}>{weather.weatherType}</Text>
                    </View>
                    <View style={styles.view4}>
                        <View style={styles.view5}>
                            <Feather name="wind" size={30} color="white" />

                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>{weather.windSpeed}km/h</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>windSpeed</Text>

                        </View>
                        <View style={styles.view5}>
                            <MaterialIcons name="water-drop" size={30} color="white" />

                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>{weather.humidity}%</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>Humidity</Text>

                        </View>
                        <View style={styles.view5}>
                            <Feather name="clock" size={30} color="white" />
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>{time}</Text>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>{dayName}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    view1: {
        flex: 1,
        padding: 16,
    },
    view2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#FDFEFE',
        justifyContent: 'space-between',
        padding: 8,
    },
    textInput: {
        alignItems: 'baseline',
        color: 'black',
        borderWidth: 1,
        borderColor: 'transparent',
        paddingLeft: 16,
        flex: 1,
        fontSize: 16,
    },
    pressable1: {
        backgroundColor: 'red',
        borderRadius: 100,
    },
    view3: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 64,
    },
    view4: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    view5: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(255,255,255,0.4)',
        padding: 16,
        borderRadius: 8,
    }
})
export default WeatherScreen;