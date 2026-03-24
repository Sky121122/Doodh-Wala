import { StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export const IndexStyle = StyleSheet.create({
    top:{
        backgroundColor:Colors.accent,
        flex:1,
        width:"100%",
        height:"20%",
        justifyContent:"center",
        alignItems:"center",
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    logo:{
        fontSize:60,
        fontWeight:600,
        color:Colors.card,
        marginBottom:10,
    },
    slogan:{
        fontSize:18,
        color:Colors.primary
    },
    bottom:{
        flex:1,
        backgroundColor:Colors.card,
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
    },
    button:{
        height:"auto",
        width:"70%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        paddingVertical:10,
        backgroundColor:Colors.accent,
        marginTop:20
    }
})