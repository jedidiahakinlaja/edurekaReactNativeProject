import * as React from 'react';
import {StyleSheet, ScrollView,View,StatusBar, SafeAreaView, Text, TextInput, Button, Image} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

function DetailsScreen({route}) {
  const  {itemId} = route.params;
  const navigation =useNavigation();
  const [users,setUsers]=React.useState([]);
  const [opt,setOption]=React.useState([]);
  const [col,setCol]=React.useState([]);
  const [time,setTime]=React.useState([])
  const [number, onChangeNumber] = React.useState('');
  const [current, setCurrent] = React.useState("01-07-22 12:00pm");
  React.useEffect(()=>{
    fectchUsers();
   },[])
 
  React.useLayoutEffect(()=>{
    navigation.setOptions({
      headerLargeTitle:true,
      headerSearchBarOptions:{
        placeHolder:"Search",
        onChangeText:(event)=>handleFilter(event.nativeEvent.text),
      }
    })
  },[navigation])

  function handleFilter(searchTerm){
    setUsers(users.filter((user)=>
    user.item.toUpperCase().includes(searchTerm.toUpperCase())
  ));
  }

 

    async function fectchUsers() { 
        const url = `http://10.44.23.33:5500/movies/${itemId}`

  
        axios
        .get(url)

        .then(function (response) {
            setUsers(response.data.movieId[0]);
        })
        .catch(function (error) {
            console.error(error);
        });
          
  }

  async function fectchUsers2() { 
  
     const url = `http://10.44.23.33:5500/movies/${itemId}`


     axios
     .get(url)

     .then(function (response) {
         setOption(response.data.movieId[0].timing);
     })
  
     .catch(function (error) {
         console.error(error);
     });
       
}

    function getCurYear ()  {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      setTime(date);
    };

        const booking= async()=>{
          const calprice = users.price * number

         const urls = `http://10.44.23.33:5500/postDetails`

         axios.post(urls,{
          sendId:users._id,
          totalPrice:calprice,
          title:users.name,
          img:users.imageUrl,
          QR:users.qr,
          timeChosen:current
         })
  
        .then(response=>{navigation.navigate('finalPage',{
          itemIds: response.data.Details._id})
        })
        
        .catch((err => console.log(err)))
        }


   React.useEffect(()=>{
    
    fectchUsers();
    fectchUsers2();
    getCurYear();
    
   },[itemId])
    return (
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text  style={{
            width:85,
            height:50,
            fontSize:20,
            fontWeight:"bold",
            backgroundColor: "#fff",
            borderRadius: 6,
            borderWidth:4,
            paddingLeft: 10,
            paddingTop: 5,
            marginVertical: 20,
            //  justifyContent:"center",
            alignItems: "center",
            shadowColor: "#000",
            flex:1,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,  
          }}>Details</Text>

          <View style={styles.contain}>
             
                  <Text style={styles.text}>Title: {users.name}</Text>
                  
                      <Image
                      source={{ uri: users.imageUrl }}
                      style={{ width: 373, height: 250, marginBottom:20 }}
                    />

        <Text style={{fontSize:20,}}>PRICE: {users.price}</Text>  
            {
              opt.map((data, idx)=>{
              
               return <>
                 
            <View key={idx} style={{ marginTop: 50 }}>
          <RadioButtonGroup  key={idx}
            containerStyle={{ marginBottom: 10 }}
            selected={current}
            onSelected={(value) => setCurrent(value)}
            radioBackground="green"
          >
            <RadioButtonItem  key={idx}
             value={data.option1}
             label={
            <Text style={{ color: "blue",fontSize:20, }}>{data.option1}</Text>
            }
             />
            <RadioButtonItem  key={idx}
              value={data.option2}
              label={
            <Text style={{ color: "blue", fontSize:20, }}>{data.option1}</Text>
              }
            />
          </RadioButtonGroup>

            <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Number of Ticket"
          keyboardType="numeric"
        />
            <Button 
               style={number.length === 0
                                ? styles.disabledButton : styles.enabledButton}
                            disabled={number.length === 0}
            
            title="Book" onPress={() => booking()}/>

        </View>
               </>
                  
                
              })

              
            }
            
                
          </View>

        <Button title="BACK" onPress={() => navigation.goBack()} />
      </View>

      </ScrollView>

      </SafeAreaView>
    );
  }


  
  export default DetailsScreen

  const styles = StyleSheet.create({
    container:{
      flex:1,
      
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
      height:700,
      color:'white',
      width:90+'%',
      padding: 10,
      borderRadius:10,
      // flex: 1, flexDirection: 'row',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
   
      disabledButton: {
          backgroundColor: 'gray',
          color: 'white',
          cursor: 'not-allowed',
          margin: 10,
          padding: 15,
          borderRadius: "8px",
          border: "none",
          boxShadow: "0px 0px 10px 0px grey",
      },
      enabledButton: {
          backgroundColor: 'green',
          color: 'white',
          cursor: 'pointer',
          margin: 10,
          padding: 15,
          borderRadius: "8px",
          border: "none",
          boxShadow: "0px 0px 10px 0px grey",
      }, 
      img:{
        margin: 10,
      }
    
   
  })