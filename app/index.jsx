import { useRouter } from "expo-router";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import SafeArea from "../app/src/constants/safeArea";

import { IndexStyle } from "./src/styles/indexStyle";

export default function Index() {
  const router = useRouter();
  return (
   <>
    <SafeArea>
      <View style={IndexStyle.top}>
        <Text style={IndexStyle.logo}>Doodh Wala</Text>
        <Text style={IndexStyle.slogan}>Har Drop Ka Hisab, Doodh Wala Ke Saath</Text>
      </View>
      <View style={IndexStyle.bottom}>
          <View style={IndexStyle.button}>
               <TouchableOpacity style={{width:"100%", justifyContent:"center", alignItems:"center"}} onPress={()=>router.replace("/src/screens/home")} >
                <Text style={{fontSize:30, color:"white"}}>Lets Start</Text>
              </TouchableOpacity>
          </View>
          <View style={IndexStyle.button}>
              <TouchableOpacity style={{width:"100%", justifyContent:"center", alignItems:"center"}} onPress={() =>Linking.openURL("https://saketfolio.netlify.app/") }>
                <Text style={{fontSize:30, color:"white"}}>Follow</Text>
              </TouchableOpacity>
          </View>
      </View>
    </SafeArea>
   </>
  );
}
