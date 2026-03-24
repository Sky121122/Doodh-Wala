import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SafeArea({children}) {
  return (
        <SafeAreaView style={{flex:1}}>    
           <StatusBar style='dark'></StatusBar>
          {children}</SafeAreaView>
  )
}