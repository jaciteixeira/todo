import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { PaperProvider, Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ItemTarefa } from '../../components/ItemTarefa';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Tarefas = () => {
  const [tarefas, setTarefas] = React.useState([]);
  const [tarefa, setTarefa] = React.useState({ tarefa: '', isConcluido: false });
  const [visible, setVisible] = React.useState(false);
  const [indiceAtual, setIndiceAtual] = React.useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('useEffect rodando')
    getTarefas();
  }, []);

  useFocusEffect(() => {
    getTarefas();
  })


  const getTarefas = async () => {
    try {
      const tarefas = await AsyncStorage.getItem('tarefas');
      if (tarefas !== null) {
        const tarefasConvertidas = JSON.parse(tarefas);
        setTarefas(tarefasConvertidas);
      }
    } catch (error) {
      console.log('Erro ao recuperar as tarefas');
    }
  }

  useEffect(() => {
    const getTarefa = async () => {
      try {
        const tarefa = await AsyncStorage.getItem('tarefa');
        if (tarefa !== null) {
          const tarefaConvertida = JSON.parse(tarefa);
          setTarefa(tarefaConvertida);
        }
      } catch (error) {
        console.log('Erro ao recuperar a tarefa');
      }
    }

    getTarefa();

  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, flex: 0.5, margin: 32 };

  const adicionarOuEditarTarefa = async () => {
    if (tarefa.tarefa.trim() === '') {
      alert('Digite uma tarefa');
      return;
    }

    const novasTarefas = [...tarefas];
    if (indiceAtual !== null) {
      novasTarefas[indiceAtual] = tarefa;
    } else {
      novasTarefas.push(tarefa);
    }


    // salvar no AsyncStorage
    await AsyncStorage.setItem('tarefas', JSON.stringify(novasTarefas));

    // colocar no estado
    setTarefas(novasTarefas);

    setTarefa({ tarefa: '', isConcluido: false });

    setIndiceAtual(null);
    hideModal();
  };

  const deletarTarefa = (indice) => {
    setTarefas(tarefas.filter((_, index) => index !== indice));
  };

  const marcarTarefa = (indice) => {
    const novasTarefas = [...tarefas];
    novasTarefas[indice].isConcluido = !novasTarefas[indice].isConcluido;
    setTarefas(novasTarefas);
  };

  const editarTarefa = (indice) => {
    setIndiceAtual(indice);
    setTarefa(tarefas[indice]);
    showModal();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tarefas}
        renderItem={({ item, index }) => (
          <ItemTarefa
            item={item}
            indice={index}
            delTarefa={deletarTarefa}
            marcarTarefa={marcarTarefa}
            editarTarefa={editarTarefa}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa"
          value={tarefa.tarefa}
          onChangeText={async (texto) => {
            setTarefa({ ...tarefa, tarefa: texto })
            await AsyncStorage.setItem('tarefa', JSON.stringify(tarefa));
          }}
        />
        <TouchableOpacity onPress={adicionarOuEditarTarefa} style={styles.addBtn}>
          <Ionicons name="add" size={30} color="#C0C0C0" />
        </TouchableOpacity>
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <TextInput
            label="Tarefa"
            value={tarefa.tarefa}
            onChangeText={(text) => setTarefa({ ...tarefa, tarefa: text })}
            style={{ marginBottom: 20, color: 'black' }}
          />
          <Button mode="contained" onPress={adicionarOuEditarTarefa}>
            OK
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderColor: 'gray',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    flex: 1,
    color: 'black',
  },
  addBtn: {
    marginLeft: 10,
    marginTop: 4,
    borderRadius: 50,
    padding: 5,
    backgroundColor: 'white',
  },
});

export default Tarefas; 