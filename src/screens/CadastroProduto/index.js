/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

const CadastroProduto = () => {
  const [categorias, setCategorias] = useState([]);
  const [textName, setTextName] = useState(null);
  const [textPrice, setTextPrice] = useState(null);
  const [textImage, setTextImage] = useState(null);
  const [textCategory, setTextCategory] = useState(null);
  const [textDesc, setTextDesc] = useState(null);
  const navigation = useNavigation();

  const postProdutos = () => {
    const data = {
      title: textName,
      price: textPrice,
      image: textImage,
      category: textCategory,
      description: textDesc,
    };
    axios.post('https://fakestoreapi.com/products', data).then(response => {
      console.log(response.data);
      Alert.alert('Produto cadastrado com sucesso!');
      navigation.goBack();
    });
  };

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories').then(response => {
      setCategorias(response.data);
    });
  }, []);

  return (
    <LinearGradient
      colors={['#DDA0DD', '#EE82EE', '#DA70D6']}
      style={styles.gradiente}>
      <View style={styles.container}>
        <StatusBar hidden={false} backgroundColor="#DDA0DD" />
        <View style={styles.top}>
          <Text style={styles.titulo}>Cadastro de Produtos</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={textName}
            onChangeText={setTextName}
            placeholder="Digite o Nome"
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={textPrice}
            onChangeText={setTextPrice}
            placeholder="Digite o Preço"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={textImage}
            onChangeText={setTextImage}
            placeholder="Link da Imagem"
          />
        </View>
        <View>
          <SelectDropdown
            data={categorias}
            defaultButtonText={'Selecione uma categoria'}
            buttonStyle={styles.drop}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setTextCategory(selectedItem);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem;
            }}
            rowTextForSelection={item => {
              return item;
            }}
          />
        </View>
        <View style={styles.textInputDesc}>
          <TextInput
            maxLength={500}
            multiline={true}
            numberOfLines={10}
            value={textDesc}
            onChangeText={setTextDesc}
            placeholder="Digite a Descrição"
          />
        </View>
        <TouchableOpacity onPress={() => postProdutos()}>
          <Text style={styles.button}>Cadastrar</Text>
        </TouchableOpacity>
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
    marginVertical: 15,
    marginHorizontal: 10,
  },
  top: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 30,
    marginTop: 10,
  },
  button: {
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B008B',
    borderColor: '#A020F0',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  textInputDesc: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 30,
    marginTop: 10,
    height: 150,
  },
  drop: {
    borderRadius: 5,
    width: 332,
    marginHorizontal: 30,
    marginTop: 10,
    backgroundColor: 'white',
  },
});

export default CadastroProduto;
