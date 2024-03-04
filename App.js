import React from 'react';
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";

import EditarTarefa from './app/screens/Editar';
import Tarefas from './app/screens/Tarefas';

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tarefas">
          <Stack.Screen
            name="Tarefas"
            component={Tarefas}
            options={{ headerShown: true, title: 'Tarefas do dia', headerTitleAlign: 'center' }}
            
          />
          <Stack.Screen
            name="EditarTarefa"
            component={EditarTarefa}
            options={{ headerShown: true, title: 'Editar tarefa' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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