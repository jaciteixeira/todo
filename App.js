import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { PaperProvider, Modal, Portal, Text, Button, TextInput } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import { Tarefas } from './Tarefas';

const App = () => {

  const [tarefas, setTarefas] = React.useState([]);
  const [tarefa, setTarefa] = React.useState(null);
  const [isEditar, setIsEditar] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, flex: 0.5, margin: 32 };



  function adicionarTarefa() {

    if (tarefa === '') {
      return alert('Digite uma tarefa');
    }

    const novaTarefa = {
      tarefa: tarefa,
      isConcluido: false
    }

    setTarefas([...tarefas, novaTarefa]);
    setTarefa(null);
  }

  function deletarTarefa(indice) {
    // copia do array
    const copiaTarefas = [...tarefas];

    // atualizar item
    const arrayAtualizado = copiaTarefas.filter((_, index) => index !== indice);

    // atualizar estado
    setTarefas(arrayAtualizado);
  }

  function marcarTarefa(indice) {
    // copia do array
    const copiaTarefas = [...tarefas];

    // atualizar item
    copiaTarefas[indice].isConcluido = !copiaTarefas[indice].isConcluido;

    // atualizar estado
    setTarefas(copiaTarefas);
  }

  function editarTarefa(indice) {

    showModal();

    console.log('indice: ', indice)

  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Tarefas do dia</Text>

        <FlatList
          data={tarefas}
          renderItem={({ item, index }) => (
            <Tarefas item={item}
              indice={index}
              delTarefa={deletarTarefa}
              marcarTarefa={marcarTarefa}
              editarTarefa={editarTarefa} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma tarefa"
            value={tarefa}
            onChangeText={(texto) => setTarefa(texto)}
          />
          <TouchableOpacity onPress={() => adicionarTarefa()} style={styles.addBtn}>
            <Ionicons name="add" size={30} color="#C0C0C0" />
          </TouchableOpacity>
        </View>



        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <TextInput
              label="Tarefa"
              value={tarefa}
              onChangeText={text => setTarefa(text)}
              style={{ marginBottom: 20 }}
            />
            <Button mode="contained" onPress={() => console.log('Pressed')}>
              OK
            </Button>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 90
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row', //eixo horizontal
    justifyContent: 'center', // alinhamento horizontal
    alignItems: 'center', // alinhamento vertical
    padding: 30,
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderColor: 'gray',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: '100%'
  },
  addBtn: {
    marginLeft: 10,
    marginTop: 4,
    borderRadius: 50,
    padding: 5,
    backgroundColor: 'white',
  }
});


export default App;