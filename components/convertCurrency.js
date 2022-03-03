 //***************************************** Import ******************************************* */
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useState, useEffect } from 'react';

import Select from '../components/select';

export default function ConvertCurrency() {
  //***************************************** variables and declarations ***************************** */
  const [items, setItems] = useState([
    {name: 'USD', value: 0, rate: 0.89},
    {name: 'EUR', value: 1, rate: 1},
    {name: 'DZ', value: 2, rate: 158.58},
    {name: 'YEN', value: 3, rate: 129.29},
    {name: 'RUB', value: 4, rate: 110.09}
  ]);
  const [rate,setRate] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedItem2, setSelectedItem2] = useState(1);
  const [prevSelectedItem, setPrevSelectedItem] = useState(0);
  const [prevSelectedItem2, setPrevSelectedItem2] = useState(1);
  const [amount,setAmount]=useState("");

  //***************************************** Functions ******************************************* */

  const rateCalculation = ()=>{
    var value = items[selectedItem2].rate/items[selectedItem].rate;
    setRate(value);
  }

  const getData = ()=>{
    //const oldUrl = "http://api.exchangeratesapi.io/v1/latest?access_key=67f55c30e732763fd025bccdc34eb6a4&format=1";
    const newUrl = "https://freecurrencyapi.net/api/v2/latest?apikey=7b0b5c60-9a58-11ec-953b-dbf08c7b01d4&base_currency=USD";
      fetch(newUrl)
      .then((response)=>{console.log(response.ok+" "+response.status); if(!response.ok) throw new Error('Something went wrong'); return response.json()})
      .then((json)=>{
          //console.log(json)
          json["data"]["USD"]=1;
          setItems(dictFormating(json["data"]));
          return json
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const dictFormating = (data)=>{
    var keys = [], len, list=[], index=0, key;
  
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    keys.sort();
    len = keys.length;
    for (index = 0; index < len; index++) {
      key = keys[index];
      list.push({name:key,rate:data[key],value:index})
    }
    
    return list
  }

  const invalidInputNumeric=(input)=>{
    if(input[0]=="," || input[0]=="." )
      return false
    var value = input.replace(/,/g, '.')
    var count = (value.match(/\./g) || []).length
    if (count>1)
      return false
    var counterStrike = value.length
    //Alert.alert(""+counterStrike)
    while(counterStrike--){
      if (isNaN(value[counterStrike]) && value[counterStrike]!=".")
        return false
    }
    return value
  }

  //***************************************** triggers ******************************************* */
  useEffect(()=>{
    getData();
  },[])

  useEffect(()=>{
    rateCalculation();
  },[selectedItem,selectedItem2])

  useEffect(()=>{
    if (selectedItem==selectedItem2){
      setSelectedItem2(prevSelectedItem)
    }
    setPrevSelectedItem(selectedItem)
  },[selectedItem])

  useEffect(()=>{
    if (selectedItem==selectedItem2){
      setSelectedItem(prevSelectedItem2)
    }
    setPrevSelectedItem2(selectedItem2)
  },[selectedItem2])

  //***************************************** JSX code ******************************************* */
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.body} 
        contentContainerStyle={{width:"100%"}}
      >
        <Text style={styles.Title} >Exchange Rate</Text>
        <Text style={styles.Result} >{amount?(amount*rate).toFixed(2):"0"} {items[selectedItem2].name}</Text>
        <View style={styles.inputRow}>
          <Text style={styles.Inputlabel} >Amount</Text>
          <TextInput 
            style={styles.input}
            value={amount}
            placeholder="0"
            keyboardType='decimal-pad'
            onChangeText={(amount)=>{
              var check = invalidInputNumeric(amount)
              if(check!==false)
                setAmount(check)
              }} 
          />
        </View>

        <View style={[styles.selectrow,{height:60,width:"100%"}]}>
          <View style={styles.select} >
            <Select data={items} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          </View>
          <TouchableOpacity 
            style={{width:50,height:50,justifyContent:'center',alignItems:"center"}}
            onPress={()=>{var temp = selectedItem;setSelectedItem(selectedItem2);setSelectedItem2(temp)}}
          >
            <AntDesign name="swap" size={30} color="#9B9B9B" />
          </TouchableOpacity>
          <View style={styles.select} >
            <Select data={items} selectedItem={selectedItem2} setSelectedItem={setSelectedItem2} />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

//***************************************** Styling ******************************************* */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:20
  },
  blueBar: {
    height: 15,
    width: "100%",
    backgroundColor: "#1BADFF"
  },
  body: {
    flex: 1,
    paddingHorizontal:20
  },
  Title: {
    fontSize:20,
    fontWeight: "bold",
    color: "#9B9B9B",
    textAlign: 'center',
    marginTop: 19
  },
  Result: {
    fontSize:22,
    color: "#555",
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25
  },
  inputRow: {
    minWidth: "90%",
    marginVertical: 20,
  },
  Inputlabel: {
    color: "#9B9B9B",
    fontSize: 15
  },
  input: {
    color:"#777",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 4,
    marginVertical: 5
  },
  selectrow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center'
  },
  select: {
    flex:1,
    height:"100%",
    paddingVertical: 10,
  }
});
