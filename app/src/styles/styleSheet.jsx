import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export const MainStyle = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:"center",
        backgroundColor:Colors.primary,
        paddingHorizontal:5
    },
    add:{
        height:"50%",
        backgroundColor:Colors.background,
        borderWidth:1.5,
        borderColor:Colors.accent,
        borderRadius:10,
        marginBottom:30,
    },
    inputText:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 12,
        width: 250,
        marginBottom: 1,
        fontSize: 18,
        marginTop:15,
    },
    button:{
        backgroundColor: Colors.accent,
        paddingVertical: 12,
        paddingHorizontal: 40,
        width:"60%",
        alignItems:"center",
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center'
    },
    details:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:"10%"
    }
});


export const PriceStyle = StyleSheet.create({
    main:{
        height:"10%",
        width:"90%",
        display:"flex",
        flexDirection:"row",
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        paddingVertical:10,
        backgroundColor:Colors.background,
        borderWidth:1.5,
        borderColor:Colors.accent
    },
    left:{
        width:"48%",
        height:"98%",
        justifyContent:"top",
        alignItems:"center",
    },
    right:{
        width:"48%",
        height:"98%",
        justifyContent:"top",
        alignItems:"center",
    }
});

export const DetailStyle = StyleSheet.create({
    main:{
        height:"70%",
        width:"90%",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        marginTop:30,
        backgroundColor:Colors.background,
        borderWidth:1.5,
        borderColor:Colors.accent,
        borderRadius:10
    },
    scrollView:{
        height:"auto",
        width:"100%",
        borderRadius:10,
        paddingHorizontal:10,
        paddingVertical:10,
    },
    
})