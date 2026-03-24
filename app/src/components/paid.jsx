import { useRouter } from 'expo-router';
import * as Sqlite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/colors';

export default function Paid({firstDate, lastDate , price, quantity}) {

  const router = useRouter();

  const [newFirstDate , setNewFirstDate] = useState("");
  const [newLastDate , setNewLastDate] = useState("");
  const [newPrice , setNewPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [paymentDb, setPaymentDb] = useState(null);


useEffect(()=>{
      setNewFirstDate(firstDate);
      setNewLastDate(lastDate);
      setNewPrice(price);
      setTotalQuantity(quantity);
    },[firstDate]);

    // ------- db setup ------------ 
    // ------ creating new databse to stire the payment details ---------------  
   useEffect(()=>{
      const dbSetup = async () =>{
        const db = await Sqlite.openDatabaseAsync("dailydoodh.db");
        setPaymentDb(db);
        try {
          await db.execAsync('CREATE TABLE IF NOT EXISTS payment_details (id INTEGER PRIMARY KEY AUTOINCREMENT, firstdate TEXT, lastdate TEXT, quantity TEXT, price TEXT );');
        } catch (error) {
          console.log("Error while createing payment table", error);
        };        
      }
      dbSetup();
    },[])


  // ------------- function to perform task over the paid button clicked ----------------- 
  const paymentFunction = async ()=>{
    try {
      await paymentDb.runAsync('INSERT INTO payment_details (firstdate, lastdate, quantity, price) VALUES (?, ?, ?, ?)',
      [newFirstDate, newLastDate, totalQuantity, newPrice]);
      Alert.alert("✅ Success", "Payment successful from " + lastDate + " to " + firstDate + " thankyou");

       await paymentDb.runAsync('DELETE FROM milk_records');
        await router.replace("/src/screens/home");
    } catch (error) {
      console.log("Error while adding payment details", error);
    };
  };


    const handleButton = () =>{
        Alert.alert("Alert","Are you sure to pay ?",
            [
                {text:"Cancle", style:"cancel"},{text:"Yes Paid", style:"destructive", 
                  onPress:()=>{
                    try {
                      paymentFunction();
                    } catch (error) {
                      console.log("Error on payment button", error);
                      
                    }
                }}
            ]
        )
    }



  return (
    <View style={{alignSelf:"center", marginTop:20, width:"90%", display:"flex", flexDirection:
  "row" , justifyContent:"space-around", gap:10,
    }}>
{/* -------------- paid button ------  */}
      <TouchableOpacity style={{backgroundColor:Colors.success, borderRadius:10, justifyContent:"center", alignItems:"center", flex:1
      }} onPress={handleButton}>
        <Text style={{color:Colors.card, paddingHorizontal:10, paddingVertical:8}}>Paid !</Text>
      </TouchableOpacity>

{/* ---------- payment details button ------------------ */}
      <TouchableOpacity style={{backgroundColor:Colors.success, borderRadius:10, justifyContent:"center", alignItems:"center", flex:1
      }} onPress={()=>router.push({
        pathname:"/src/screens/payment"
      })}>
        <Text style={{color:Colors.card, paddingHorizontal:10, paddingVertical:8}}>Payment Details</Text>
      </TouchableOpacity>
    
    </View>
  )
}