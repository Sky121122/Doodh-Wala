import { router } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Card from "../components/card";
import { Colors } from '../constants/colors';
import SafeArea from '../constants/safeArea';
import { DetailStyle, MainStyle } from '../styles/styleSheet';


const Payment = () => {
    
    const [paymentDb, setPaymentDb] = useState(null);
    const [paymentData, setPaymentData]  = useState([]);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalLiter, setTotalLiter] = useState(0);
// --------- get all payment data ---------- 
    useEffect(()=>{
      const loadData = async () =>{
        try {
            const db = await SQLite.openDatabaseAsync("dailydoodh.db");
            await setPaymentDb(db);

            const allData = await db.getAllAsync('SELECT * FROM payment_details ORDER BY id DESC');
            setPaymentData(allData);
            

            const totalPrice = await allData.reduce((sum, item) => sum + Number(item.price), 0);
            const totalQuantity = await allData.reduce((sum, item) => sum + Number(item.quantity), 0);

             setTotalLiter(totalQuantity);
             setTotalPayment(totalPrice);


        } catch (error) {
            console.log("Error geeting data to payment", error);
            
        }
      }
      loadData();
          
    },[]);

    // ---------- claring the payment details -------- 
    const clearPayment = async () =>{
         await paymentDb.runAsync('DELETE FROM payment_details');
         await router.replace("/src/screens/home");
         Alert.alert("Success", "All payment data deleted");
    };

    // ---------- handle clear button -------- 
    const handleClear = () =>{
       Alert.alert("⚠️ Alert", "Are you sure to delete all payment details ?", 
        [
            {text:"Cancle", style:"cancel"
            },
            {text:"Yes", style:"destructive",
                 onPress: ()=>{
                        clearPayment();
                }
            }
        ]
       )
    }
    
  return (
    <View style={MainStyle.main}>
        <SafeArea>
                <Text style={{alignSelf:"center", fontSize:20, fontWeight:"500", color:Colors.text}}>Payment Details</Text>
                <View style={DetailStyle.main}>
                        <View style={{ display:"flex", flexDirection:"row", justifyContent:"space-between" ,backgroundColor:Colors.accent, paddingHorizontal:30, paddingVertical:5, borderRadius:8, width:"98%", marginTop:10}}>
                
                            <Text style={{color:Colors.background}}>Date</Text>
                            <Text style={{color:Colors.background}}>Liter</Text>
                            <Text style={{color:Colors.background}}>Price</Text>
                            <Text style={{color:Colors.background}}>Status</Text>
              
                         </View>

                         <ScrollView style={DetailStyle.scrollView}>
                                {
                                    paymentData.length === 0 ? (
                                        <Text style={{alignSelf:"center"}}>No Payment Record Yet</Text>
                                    ) : (
                                        paymentData.map((data)=>{
                                            return (
                                                <View key={data.id}>
                                                     <View style={{display:"flex", flexDirection:"row", width:"90%", justifyContent:"space-between", alignSelf:"center", marginBottom:20, borderBottomWidth:1, borderBottomColor:Colors.text}}>
                                                      
                                                      <View>
                                                         <Text style={{color:"black", fontWeight:"500"}}>{data.lastdate}</Text>
                                                         <Text style={{color:"black", fontWeight:"500"}}>{data.firstdate}</Text>
                                                      </View>
                                                         
                                                          <Text style={{color:"black"}}>{data.quantity}</Text>
                                                          <Text style={{color:"black"}}>{data.price}</Text>
                                                            <TouchableOpacity>
                                                                       <Text style={{color:Colors.card, backgroundColor:Colors.success, paddingHorizontal:5, borderRadius:4, marginBottom:5}}>Paid</Text>
                                                             </TouchableOpacity>
                                                       </View>
                                                </View>
                                            )
                                        })
                                    )
                                }
                         </ScrollView>
                </View>

                <View>
                    <View>
                        <Card totalLiter={totalLiter} totalPayment={totalPayment} />
                    </View>
                    <TouchableOpacity style={MainStyle.button} onPress={handleClear}>
                        <Text style={{color:Colors.card}}>Clear</Text>
                    </TouchableOpacity>
                </View>
        </SafeArea>
    </View>
  )
}

export default Payment