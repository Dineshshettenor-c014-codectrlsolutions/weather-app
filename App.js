import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import WeatherScreen from './src/screens/WeatherScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WeatherScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
