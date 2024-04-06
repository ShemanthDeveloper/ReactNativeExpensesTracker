import{View,StyleSheet,Text} from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'


function ExpensesOutput({expenses,expensesPeriod,fallabackText}){
     let content = <Text style={style.infoText}>{fallabackText}</Text>
     if(expenses.length>0){
        content =<ExpensesList expenses={expenses}/>
     }
     return <View style={style.container}>
        
        <ExpensesSummary expenses={expenses}
         periodName={expensesPeriod}/>
        {content}
     </View>
}

export default ExpensesOutput


const style=StyleSheet.create({
    container:{
        paddingHorizontal:24,
        paddingTop:24,
        paddingBottom:0,
        flex:1,
        backgroundColor:GlobalStyles.colors.primary700
    },
    infoText:{
        color:'white',
        fontSize:16,
        textAlign:'center',
        marginTop:32
    }
})