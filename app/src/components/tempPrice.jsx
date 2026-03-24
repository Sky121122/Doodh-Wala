import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import { PriceStyle } from '../styles/styleSheet';
import Paid from './paid';


export default function TempPrice({data = []}) {

  const [price, setPrice] = useState(0);
  const [firstDate , setFirstDate] = useState(0);
  const [lastDate, setLastDate] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

useEffect(()=>{
   
const calcualtion = async () =>{
      
const prices = await data.map(item => Number(item.price));
const date = await data.map(item=>item.date);
const quantity = await data.map(item=> Number(item.quantity));

 if(date.length >0){
  const firstResult = await date.length ? date[0] : null;
  const lastResult = await date.length ? date[date.length-1] : null;
  
   await setFirstDate(firstResult);
   await setLastDate(lastResult);
 }
 
  // 💰 Calculate total price and quantity
  const totalPrice =  await prices.reduce((sum, value) => sum + value, 0);
   const totalquant =  await quantity.reduce((sum, current)=>sum + current, 0);
   
   await setPrice(totalPrice);
  await setTotalQuantity(totalquant);  
   }

   calcualtion();

},[data]);
 
  return (
    <>
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
    {/* ----------------- payment paid component -------------  */}
     <Paid firstDate={firstDate} lastDate={lastDate} price={price} quantity={totalQuantity} />
</>
    )
}