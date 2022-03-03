import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Select = ({data:items,selectedItem,setSelectedItem}) => {
  const [modalVisible, setModalVisible] = useState(false);
  

  const searchSelect=()=>{

  }
  return (
    <View style={{}}>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          
            <View style={{flexDirection:"row",alignItems:"center",height:46,paddingHorizontal:10,backgroundColor: "#888",}}>
              <Pressable onPress={()=>setModalVisible(!modalVisible)} style={{height:46,width:46,justifyContent:"center",alignItems:"center"}}>
                <Ionicons name="arrow-back" size={25} color="white" />
              </Pressable>
              <Text style={[styles.title]}>
                Select the currency
              </Text>
            </View>
            {/* <TextInput style={styles.search} placeholder="Search for item ..."></TextInput> */}
            <FlatList
                data={items}
                style={{flex:1}}
                getItemLayout={(item, index)=>{
                  return {length: styles.selectItem.height, offset: styles.selectItem.height * index, index}
                }}
                initialScrollIndex={selectedItem}
                renderItem={({item})=>{
                    return(
                            <Pressable
                                style={styles.selectItem}
                                onPress={() =>  {
                                                    setModalVisible(!modalVisible)
                                                    setSelectedItem(item.value)
                                                }
                                        }
                            >
                                <Text style={[styles.selectName,]}>{item.name}</Text>
                                {selectedItem===item.value? <AntDesign name="check" size={20} color="#777" /> :<></>}
                            </Pressable>
                    )
                }}
                keyExtractor={item=>item.value}
            />
        </View>
      </Modal>

      <Pressable
        style={styles.selectInput}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectInputText}>{items[selectedItem].name}</Text>
        <AntDesign name="caretdown" size={15} color="#9B9B9B" />
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
    selectInput: {
        backgroundColor:"#fff",
        borderWidth:1,
        borderColor:"#DDD",
        borderRadius:5,
        height:40,
        width:"100%",
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-around",
        shadowColor: "#555",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    selectInputText: {
        color:"#9B9B9B",
        fontWeight:"bold",
    },
    title:{
        color:"white",
    },
    search:{
        width:"100%", 
        borderBottomColor:"#ddd",
        borderBottomWidth:1, 
        backgroundColor:"#fff",
        height:40, 
        padding:10, 
        color:"#777",
        shadowColor: "#555",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginBottom:7,
  },
    selectItem:{
        backgroundColor:"#fff",
        borderBottomWidth:1,
        borderBottomColor:"#eee",
        height:50,
        paddingVertical:15,
        paddingHorizontal:10,
        width:"100%",
        flexDirection: "row",
        justifyContent:"space-between",
        paddingHorizontal:20
    },
    selectName:{
        color: "#777"
    },
    modal: {
        flex: 1,
        paddingTop:22,
        backgroundColor: "#fff",

    },

  centeredView: {
      paddingTop:22,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -15,
      height:15
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5
  }
});

export default Select;