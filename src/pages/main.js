import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput  } from 'react-native';
import api from '../services/api'; 

export default class Main extends Component {

    constructor(props) {
        super(props);
        //setting default state
        this.state = { isLoading: true, text: '' };
        this.products = [];
      }

    static navigationOptions = {
        title: "Listagem de Estoque",
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        },
    };

//    state = {
  //      products: []
//    };
    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async () => {
        try {
            const response = await api.get('/produtos.php'); 
            const { products } = response.data;
            console.log(response.data);
            //this.setState({ products });
            this.setState(
                {
                  isLoading: false,
                  dataSource: products
                },
                function() {
                  this.products = products;
                }
              );
        } catch (error) {
            console.log(error.response);
        }
    };
    SearchFilterFunction(text) {
        const newData = this.products.filter(function(item) {
        const itemData = item.descricao ? item.descricao.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataSource: newData,
            text: text,
          });
      }
   

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productDescription}>{ item.descricao }</Text>
            <Text style = {styles.productStock} >Qtde Estoque: { item.estoque }</Text>
            <Text style = {styles.productStock} >R$ { item.valor }</Text>

            <TouchableOpacity 
                style={styles.productButton} 
                onPress={ () =>{
                    this.props.navigation.navigate('Details', {item});
                }}
            >
                <Text style={styles.productButtonText}>Detalhes</Text>
            </TouchableOpacity>
        </View>
    )
    render(){
        return(
            <View style={styles.container}>
               <TextInput
                style={styles.textInputStyleSearch}
                onChangeText={text => this.SearchFilterFunction(text)}
                value={this.state.text}
                underlineColorAndroid="transparent"
                placeholder="Pesquise o produto"
                />
               <FlatList
                contentContainerStyle={styles.list}
                data={this.state.dataSource}
                keyExtractor={item =>item.id}
                renderItem={this.renderItem}
               />
            </View>
        ) 
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
     list:{
         padding: 20
     },
      productContainer:{
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#DDD',
          borderRadius: 5,
          padding: 20,
          marginBottom: 20,
      },

      productDescription:{
          fontSize: 16,
          fontWeight: 'bold', 
          color: '#333'
      },

      productStock:{
          fontSize: 14,
          color: '#999',
          marginTop: 3,
          lineHeight: 24

      },
      productButton:{
          height: 42,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: '#882288',
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10
      },
      productButtonText:{
          fontSize: 14,
          color: '#882288',
          fontWeight: 'bold'
      },
      textInputStyleSearch: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },
});