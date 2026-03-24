import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../constants/colors';

export default function Card({totalLiter, totalPayment}) {

    const [payment, setPayment] = useState(0);
    const [liter, setLiter] = useState(0)

    useEffect(()=>{
        setPayment(totalPayment);
        setLiter(totalLiter);
    },[totalPayment])

  return (
    <View style={{backgroundColor:Colors.background, height:40, width:"90%", alignSelf:"center", marginTop:20, borderRadius:10, borderWidth:1.5, borderColor:Colors.accent, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}}>
      <Text>Total Liter :  {liter}</Text>
      <Text>Total Price : Rs {payment}</Text>
    </View>
  )
}