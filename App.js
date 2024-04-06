import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import ManageExpense from './screens/ManageExpense';
import { GlobalStyles } from './constants/styles';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
const Stack=createNativeStackNavigator();
const BottomTabs=createBottomTabNavigator()

function ExpensesOverview(){
  return <BottomTabs.Navigator screenOptions={({navigation})=>({
    headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
    headerTintColor:'white',
    tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
    tabBarActiveTintColor:GlobalStyles.colors.accent500,
    headerRight:({tintColor})=><IconButton icon="add" onPress={()=>{
      navigation.navigate('ManageExpense');
    }} color={tintColor} size={24}/>
    

  })}>
    <BottomTabs.Screen name="RecentExpenses"
    options={{
      title:'Recent Expenses',
      tabBarLabel:'Recent',
      tabBarIcon:({color,size})=>(
        <FontAwesome6 name="hourglass-start" size={size} color={color} />

      )
    }}
     component={RecentExpenses}/>
    <BottomTabs.Screen name="AllExpenses"
    options={{
      title:'All Expenses',
      tabBarLabel:'All Expenses',
      tabBarIcon:({color,size})=>(
        <AntDesign name="calendar" size={size} color={color} />
      )
    }}
     component={AllExpenses}/>
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
    <StatusBar style="light"/>
    <ExpensesContextProvider>
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
        headerTintColor:'white'
      }}>
      <Stack.Screen name="ExpensesOverview"
      options={{headerShown:false}}
       component={ExpensesOverview}/>
        <Stack.Screen name="ManageExpense" component={ManageExpense}
        options={{presentation:'modal'}}/>
        
      </Stack.Navigator>

    </NavigationContainer>
    </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
