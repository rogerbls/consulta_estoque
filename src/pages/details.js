import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

export default class Details extends Component {
    static navigationOptions = {
        title: "Detalhes",
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1,
            
        },
    };

    render(){
        const { params } = this.props.navigation.state;
        const item = params.item; 
        console.log(item);
        return(
            <View style={styles.productContainer}>
                <Text style={styles.productDescription}>{ item.descricao }</Text>
                <Text style = {styles.productStock} >Data Última Compra: { item.ultima_compra }</Text>
                <Text style = {styles.productStock} >Observações { item.obs }</Text>
            </View>
        ) 
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#fafafa'
    },
    productContainer:{
        //backgroundColor: '#fff',
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

    }

});