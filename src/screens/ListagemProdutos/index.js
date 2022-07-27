/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Image, FlatList, Text, View, StatusBar, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const ListagemProdutos = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products').then((response) => {
          setProdutos(response.data);
        });
    }, []);

    const Item = ({categoria, nome, preco, descricao, img}) => (
        <View>
            <View style={styles.card}>
                <View style={styles.box}>
                    <View style={styles.imgLocal}>
                        <Image
                        resizeMode="stretch"
                        source={{uri: img}}
                        style={styles.img}
                        />
                    </View>
                    <View style={styles.boxText}>
                        <View style={styles.titleOrganizado}>
                            <Text style={styles.title}>Categoria: </Text>
                            <Text style={styles.title2}>{categoria}</Text>
                        </View>
                        <View style={styles.titleOrganizado}>
                            <Text style={styles.title}>Preço: </Text>
                            <Text style={styles.title2}>R$ {preco}</Text>
                        </View>
                        <View style={styles.titleOrganizado}>
                            <Text style={styles.title}>Nome: </Text>
                            <Text style={styles.title2}>{nome}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.titleOrganizado}>
                    <Text style={styles.descText}>Descrição: </Text>
                    <Text style={styles.descText2}>{descricao.substring(0, 80)}...</Text>
                </View>
            </View>
        </View>
    );

    const ItemRenderizado = ({ item }) => (
        <Item
            categoria={item.category}
            nome={item.title}
            preco={item.price}
            descricao={item.description}
            img={item.image}
        />
    );

    return (
        <LinearGradient colors={['#DDA0DD', '#EE82EE', '#DA70D6']} style={styles.gradiente}>
            <StatusBar hidden = {false} backgroundColor = "#DDA0DD" />
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.titulo}>Lista de Produtos</Text>
                </View>
                <FlatList
                    data={produtos}
                    renderItem={ItemRenderizado}
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradiente: {
        width: '100%',
        height: '100%',
    },
    container: {
      height: '100%',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8B008B',
        marginVertical: 7,
        marginHorizontal: 10,
    },
    imgLocal: {
        justifyContent: 'center',
        marginTop: 10,
    },
    img: {
        width: 90,
        height: 90,
    },
    card: {
        borderColor: '#A020F0',
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'white',
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginStart: 20,
    },
    boxText: {
        justifyContent: 'center',
    },
    titleOrganizado: {
        flexDirection: 'row',
    },
    title: {
        marginStart: 30,
        fontWeight: 'bold',
        color: '#8B008B',
    },
    title2: {
        marginEnd: 180,
    },
    descText: {
        marginStart: 20,
        marginVertical: 10,
        fontWeight: 'bold',
        color: '#8B008B',
    },
    descText2: {
        marginVertical: 10,
        marginEnd: 100,
    },
    top: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
});

export default ListagemProdutos;
