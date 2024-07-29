import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { View, StyleSheet,ScrollView,Text,Button, SafeAreaView, FlatList,TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';

import DetailsScreen from './screens/detailScreen';
import FinalScreen from './screens/finalScreen'

 function HomeScreen() {
  const navigation =useNavigation();
  const [users,setUsers]=React.useState([]);

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
      // link needs to be changed based on the ip expo gives
      const link =  axios.create({baseURL:'http://10.44.23.33:5500'});
   
            link.get('/movies')
           .then((response) => {
            setUsers(response.data.movies); 
        })  
      
}

  return (

    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text  style={{
            backgroundColor: "#fff",
            borderRadius: 6,
            padding: 12,
            marginVertical: 10,
            borderWidth: 3,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,  
          }}>BOOKING SITES</Text>
            
                    {
                    users.map((user, idx)=><View style={styles.top} key={idx}><Text style={styles.text}>
                      Title:{user.name}
                      {'\n'}
                      {'\n'}
                      <Button
                    title="Book"
                    onPress={() => navigation.navigate('details',{
                      itemId: user.id
                    })
                    
                    }/>
                    </Text>
                    
                  
                    </View>)
                  }        
     
    </View>

    </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Booking Site" component={HomeScreen} />
        <Stack.Screen name="details" component={DetailsScreen} />
        <Stack.Screen name="finalPage" component={FinalScreen} />
      </Stack.Navigator>
     </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: StatusBar.currentHeight,
  },
  listWrapper:{
    // flex:1,
    flexGrow:1,
    paddingVertical: 16,

},
  text:{
      fontSize:20,
      fontWeight:"bold",
      height:200,
      color:'black',
      padding:3
  },
  top: {
    flex: 0.3,
    backgroundColor: 'white',
    borderWidth: 3,
    margin: 10,
    height:100,
    color:'white',
    width:90+'%',
    borderRadius:10
  },
 
})