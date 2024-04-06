import { useLayoutEffect,useContext } from 'react';
import{View,StyleSheet,TextInput} from 'react-native'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
function ManageExpense({route,navigation}){
    const expenseCtx=useContext(ExpensesContext)
    const editedExpenseId=route.params?.expenseId;
    const isEditing = !! editedExpenseId;

    const selectedExpense= expenseCtx.expenses.find(expenses=>expenses.id===editedExpenseId)



    useLayoutEffect(()=>{
        navigation.setOptions({
            title:isEditing? 'Edit Expense' : 'Add Expense',
        })
    },[navigation,isEditing])

    function deleteExpenseHndler(){
        expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
        
    }

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(expenseData){
        if(isEditing){
            expenseCtx.updateExpense(
                editedExpenseId,expenseData);
        }else{
            expenseCtx.addExpense(expenseData)
        }
    
        navigation.goBack()
}
    

    return <View style={styles.container}>
            <ExpenseForm onSubmit={confirmHandler}
            defaultValues={selectedExpense}
             submitButtonLabel={isEditing ? 'Update' : 'Add'} onCancel={cancelHandler}/>
        {/*<View style={styles.buttons}>
            <Button mode="flat" onPress={cancelHandler}>Cancel</Button>
            <Button onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
</View>*/}
        { isEditing &&<View style={styles.deleteContainer}>
        {isEditing && <IconButton icon='trash' onPress={deleteExpenseHndler}
        size={36}
         color={GlobalStyles.colors.error500}/>}
         </View>}
    </View>
}

export default ManageExpense


const styles= StyleSheet.create({
    container:{
        flex:1,
        paddding:24,
        backgroundColor:GlobalStyles.colors.primary800,
        paddingTop:24,
    },
    deleteContainer:{
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:'center'
    },
    
})