/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListagemProdutos from '../screens/ListagemProdutos';
import CadastroProduto from '../screens/CadastroProduto';
import {Image, StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();

const Rotas = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#DDA0DD',
          borderTopColor: 'transparent',
        },
        headerShown: false,
        tabBarActiveTintColor: '#8B008B',
      }}>
      <Tab.Screen
        name="Listar"
        component={ListagemProdutos}
        options={{
          tabBarIcon: () => (
            <View>
              <Image source={require('./../../assets/list.png')} style={styles.img} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cadastrar"
        component={CadastroProduto}
        options={{
          tabBarIcon: () => (
            <View>
              <Image source={require('./../../assets/add.png')} style={styles.img} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
  },
});

export default Rotas;
