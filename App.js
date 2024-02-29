import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { PaperProvider, Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Tarefas } from './Tarefas';

const App = () => {
  const [tarefas, setTarefas] = React.useState([]);
  const [tarefa, setTarefa] = React.useState({ tarefa: '', isConcluido: false });
  const [visible, setVisible] = React.useState(false);
  const [indiceAtual, setIndiceAtual] = React.useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20, flex: 0.5, margin: 32 };

  const adicionarOuEditarTarefa = () => {
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
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Tarefas do dia</Text>
        <FlatList
          data={tarefas}
          renderItem={({ item, index }) => (
            <Tarefas
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
            onChangeText={(texto) => setTarefa({ ...tarefa, tarefa: texto })}
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
              style={{ marginBottom: 20 }}
            />
            <Button mode="contained" onPress={adicionarOuEditarTarefa}>
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
    paddingTop: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    flex: 1, // Adicionado para ocupar o espaço disponível
  },
  addBtn: {
    marginLeft: 10,
    marginTop: 4,
    borderRadius: 50,
    padding: 5,
    backgroundColor: 'white',
  },
});

export default App; 