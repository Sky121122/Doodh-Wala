import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TempPrice from '../components/tempPrice';
import { Colors } from '../constants/colors';
import SafeArea from '../constants/safeArea';
import { MainStyle } from '../styles/styleSheet';




const Home = () => {

const router = useRouter();

  // 🥛 Quantity & Price
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [db, setDb] = useState("");
  const [data , setData] = useState();
  
  // 📅 Date Picker
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  
  // ✅ Create table on first load
  
  useEffect(() => {
    const dbSetup= async() =>{

       const db = await SQLite.openDatabaseAsync("dailydoodh.db")
  
     try {
     await db.execAsync(
        'CREATE TABLE IF NOT EXISTS milk_records (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, quantity TEXT, price TEXT);'
      );
      setDb(db);
    } catch (error) {
      console.log("Error while database setup", error);
    }
    }
dbSetup();
  }, []);

  // ✅ Save record to database
  const saveRecord = async () => {
    if (!quantity || !price) {
      Alert.alert('⚠️ Missing Info', 'Please enter both quantity and price.');
      return;
    }
    const formattedDate = await date.toLocaleDateString();
    const newPrice = await (quantity * price);
    // ------------ code of insert into databse ----------- 

    try {
      await db.runAsync('INSERT INTO milk_records (date, quantity, price) VALUES (?, ?, ?)', [formattedDate, quantity, newPrice]);
      setPrice("");
      setQuantity("");
      Alert.alert("✅ Saved Successfuly Thankyou !");
    } catch (error) {
      console.log("Error while adding milk", error);
    }
  };


  // ----------------- fetch again data for the price component ------------- 
  // --------- fetch again data to use in price component ------------- 
  useEffect(()=>{
      const priceData = async () =>{
        try {
         const allData = await db.getAllAsync('SELECT * FROM milk_records ORDER BY id DESC');
        setData(allData);
        } catch (error) {
          console.log("Error while fetching data in home from price", error);
          
        }
      }
      priceData();
  },[saveRecord])


  return (
    <View style={MainStyle.main}>
      <StatusBar style="dark" hidden={false} />
      <SafeArea>
        <View style={MainStyle.add}>
          <Text style={{
              fontSize: 26,
              color: Colors.text,
              alignSelf: 'center',
              marginTop: 10,
              color:Colors.accent,
            }}>Add Here</Text>

          {/* 📅 Date Input */}
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 10,
                marginTop: 30,
                alignSelf: 'center',
                color: Colors.text,}}>Select Date</Text>

            <TouchableOpacity onPress={() => setShow(true)} style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                padding: 12,
                width: 250,
                alignItems: 'center', }}>
              <Text style={{ fontSize: 16 }}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                onChange={(event, selectedDate) => {
                  setShow(false);
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
          </View>

          {/* 🥛 Quantity & Price Inputs */}
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={MainStyle.inputText}
              placeholder="Enter Quantity (litres)"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
              placeholderTextColor={"grey"}
            />

            <TextInput
              style={MainStyle.inputText}
              placeholder="Enter Price (per liters) "
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
              placeholderTextColor={"grey"}
            />
          </View>

          {/* ✅ Save Button */}
          <TouchableOpacity onPress={saveRecord} style={MainStyle.button}>
            <Text style={{
                color: Colors.background,
                fontSize: 18,
                fontWeight: '600',}}>Save Record</Text>
          </TouchableOpacity>
        </View>

{/* ----------- the temp price till payment --------------  */}
        <TempPrice data={data} />
      
              <View style={MainStyle.details}>
                <TouchableOpacity style={MainStyle.button} onPress={()=>router.push("/src/screens/detail")}>
                  <Text style={{alignSelf:"center", color:Colors.background, fontSize:20}}>Details</Text>
                </TouchableOpacity>
              </View>

      </SafeArea>
    </View>
  );
};

export default Home;
