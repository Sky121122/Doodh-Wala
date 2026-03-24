import { useRouter } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';
import { MainStyle } from '../styles/styleSheet';

const Clear = ({db}) => {

    const router = useRouter();


    const clearAllData = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete all records?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Delete', style: 'destructive',

        //    'DELETE FROM milk_records;',
          onPress: () => {
            try {
                 db.runAsync('DELETE FROM milk_records');
                 Alert.alert("All data deleted !");
                 router.replace("/src/screens/home");

            } catch (error) {
                console.log("Error while clearing data",error);
                
            }
          },
        },
      ]
    );
  };



  return (
    <View style={{alignSelf:"center", marginTop:20}}>
        <TouchableOpacity style={MainStyle.button}   onPress={clearAllData}>
            <Text style={{color:Colors.card}}>Clear All</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Clear