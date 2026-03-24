import { router } from "expo-router"
import * as SQLite from "expo-sqlite"
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Clear from "../components/clear"
import Price from '../components/price'
import { Colors } from '../constants/colors'
import SafeArea from '../constants/safeArea'
import { DetailStyle, MainStyle } from '../styles/styleSheet'

const Detail = () => {

  const [db, setDb] = useState(null);
  const [data, setData] = useState([]);


  // --------- get all data from db ------------------ 
  useEffect(()=>{
    const loadData = async () =>{
      try {
        const db = await SQLite.openDatabaseAsync("dailydoodh.db");
        await setDb(db);
        const allData = await db.getAllAsync('SELECT * FROM milk_records ORDER BY id DESC');
        setData(allData);

        
      } catch (error) {
        console.log("Error while loading data", error);
      }
    }
    loadData();
  },[]);

// ---------- handle delete button ---------- 
const handleDelete = async(id)=>{
  try {
    await db.runAsync('DELETE FROM milk_records WHERE id = ?', [id]);
    Alert.alert("Delete", "Item deleted ");
    router.replace("/src/screens/home");
  } catch (error) {
    console.log("Error delteing one data", error);
  }
}


  return (
    <View style={MainStyle.main}>
        <StatusBar style="dark" hidden={false} />
        <SafeArea>
          {/* --------------- price component ---------------  */}
            <Price data={data} />
            {/* ------------------ all details from data base ---------------  */}
            <View style={DetailStyle.main}>
              <Text style={{fontSize:20, fontWeight:"500", color:Colors.text, marginTop:10}}>Details</Text>

              <View style={{ display:"flex", flexDirection:"row", justifyContent:"space-between" ,backgroundColor:Colors.accent, paddingHorizontal:30, paddingVertical:5, borderRadius:8, width:"98%", marginTop:10}}>
                
                <Text style={{color:Colors.background}}>Date</Text>
                <Text style={{color:Colors.background}}>Liter</Text>
                <Text style={{color:Colors.background}}>Price</Text>
                <Text style={{color:Colors.background}}>Delete</Text>
              
              </View>
{/* --------- to show all data here ------------------  */}
    <ScrollView style={DetailStyle.scrollView}>
      {data.length === 0 ? (
        <Text style={{alignSelf:"center"}}>No Milk Record !</Text>
      ) : (
          data.map((data)=>{
            return (
              <View key={data.id} >

              <View style={{display:"flex", flexDirection:"row", width:"90%", justifyContent:"space-between", alignSelf:"center", marginBottom:20, borderBottomWidth:1, borderBottomColor:Colors.text}}>
                  <Text style={{color:"black", fontWeight:"500"}}>{data.date}</Text>
                  <Text style={{color:"black"}}>{data.quantity}</Text>
                  <Text style={{color:"black"}}>{data.price}</Text>
                  <TouchableOpacity onPress={()=>handleDelete(data.id)}>
                    <Text style={{color:Colors.card, backgroundColor:"red", paddingHorizontal:5, borderRadius:4, marginBottom:5}}>Delete</Text>
                  </TouchableOpacity>
              </View>
              </View>
            )
          })
      )

      }
    </ScrollView>
            </View>

            {/* ---------- clear all component ------------  */}
            <Clear db={db} />

        </SafeArea>
    </View>
  )
}

export default Detail