import { FlatList,Text ,Styles} from "react-native"
import ExpensesItem from "./ExpensesItem"

function renderExpenseItem(itemData){
    return <ExpensesItem {...itemData.item}/>

}


function ExpensesList({expenses}){
    
    return<FlatList data={expenses}
    keyExtractor={(item)=>item.id}
     renderItem={renderExpenseItem}/>
}

export default ExpensesList