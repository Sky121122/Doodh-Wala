import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { PriceStyle } from '../styles/styleSheet';

export default function Price({data = []}) {

  const [price, setPrice] = useState(0);
  const [firstDate , setFirstDate] = useState(0);
  const [lastDate, setLastDate] = useState(0);

  
  useEffect(()=>{
    
const prices = data.map(item => Number(item.price));

 const date = data.map(item=>item.date);
 if(date.length >0){
  const firstResult = date.length ? date[0] : null;
  const lastResult = date.length ? date[date.length-1] : null;

  setFirstDate(firstResult);
  setLastDate(lastResult);
 }
 
    
  // 💰 Calculate total price
  const totalPrice = prices.reduce((sum, value) => sum + value, 0);
  setPrice(totalPrice);
  },[data]);
 
  return (
    <View style={PriceStyle.main}>
     <View style={PriceStyle.left}>
        <Text style={{fontSize:20, color:Colors.text, fontWeight:"400"}}>Date from</Text>
        <Text style={{color:Colors.text}}>{lastDate}</Text>
        <Text style={{color:Colors.text}}>{firstDate}</Text>
     </View>
     <View style={PriceStyle.right}>
        <Text style={{fontSize:20, color:Colors.text, fontWeight:"400"}}>Total Price</Text>
        <Text style={{color:Colors.text}}>Rs {price}</Text>
     </View>
    </View>
  )
}