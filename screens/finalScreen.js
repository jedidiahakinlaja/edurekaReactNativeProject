import * as React from 'react';
import {StyleSheet, ScrollView,View,StatusBar, SafeAreaView, Text, Button, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


function FinalScreen({route}) {
  const  {itemIds} = route.params;
  const navigation =useNavigation();
  const [users,setUsers]=React.useState([]);

 
    async function fectchUsers() { 
  
        const url = `http://10.44.23.33:5500/getDetails/${itemIds}`

        console.log('this is', itemIds)
        axios
        .get(url)

        .then(function (response) {
            setUsers(response.data.movieId[0]);
        })
        .catch(function (error) {
            console.error(error);
        });
          
  }



   React.useEffect(()=>{
    fectchUsers();
    
   },[])
    return (
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text  style={{
            width:100,
            height:50,
            fontSize:20,
            fontWeight:"bold",
            backgroundColor: "#fff",
            borderRadius: 6,
            paddingVertical: 10,
            marginVertical: 20,
            justifyContent:"center",
            alignItems: "center",
            shadowColor: "#000",
            flex:1,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,  
          }}>Result</Text>

          <View style={styles.contain}>
             
                  <Text 
                    style={{color:'black', fontSize:23, marginBottom:10 }}>
                    Title: {users.title}</Text>
                  
                      <Image
                      source={{ uri: users.img }}
                      style={{ width: 393, height: 200 }}
                    />

                    <Text 
                    style={{color:'black', fontSize:23, marginBottom:10 }}>
                    Time: {users.timeChosen}</Text>

                    <Text 
                    style={{color:'black', fontSize:23, marginBottom:10 }}>
                    Total Price: {users.totalPrice}</Text>
                    
          </View>

        <Button title="Home" onPress={() => navigation.navigate('Booking Site')} />
      </View>

      </ScrollView>

      </SafeAreaView>
    );
  }
  export default FinalScreen

  const styles = StyleSheet.create({
    container:{
      flex:1,
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center',
      
      // paddingTop: StatusBar.currentHeight,
    },
    listWrapper:{
      // flex:1,
      flexGrow:1,
      paddingVertical: 16,
  
  },
    text:{
        fontSize:20,
        fontWeight:"bold",
        height:30,
        color:'black',
        marginBottom:10
    },
    top: {
      flex: 0.3,
      backgroundColor: 'white',
      height:10,
      borderWidth: 5,
      color:'black',
      width:90+'%',
      // flex: 1, flexDirection: 'row',
    },
    contain: {
      flex: 0.3,
      backgroundColor: 'white',
      borderWidth: 5,
      margin: 2,
      height:400,
      color:'white',
      width:90+'%',
      // flex: 1, flexDirection: 'row',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    
    
   
  })