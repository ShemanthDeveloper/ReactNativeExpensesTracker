import { useLayoutEffect,useContext ,useState} from 'react';
import{View,StyleSheet,TextInput} from 'react-native'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
function ManageExpense({route,navigation}){
    const[isSubmitting,setIsSubmitting]=useState(false)
    const[error,setError]=useState();
    const expenseCtx=useContext(ExpensesContext)
    const editedExpenseId=route.params?.expenseId;
    const isEditing = !! editedExpenseId;

    const selectedExpense= expenseCtx.expenses.find(expenses=>expenses.id===editedExpenseId)



    useLayoutEffect(()=>{
        navigation.setOptions({
            title:isEditing? 'Edit Expense' : 'Add Expense',
        })
    },[navigation,isEditing])

    async function deleteExpenseHndler(){
        setIsSubmitting(true)
        try{
            await deleteExpense(editedExpenseId)
        }catch(error){
            setIsSubmitting('Could not delete expense - please try again later!')
        }
        
        setIsSubmitting(false)
        expenseCtx.deleteExpense(editedExpenseId)
        navigation.goBack()
        
    }
    

    if(error && !isSubmitting){
        return <ErrorOverlay message={error} />
    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(expenseData){
        setIsSubmitting(true)
        try{
            if(isEditing){
                expenseCtx.updateExpense(
                   editedExpenseId,expenseData);
                   await updateExpense(editedExpenseId,expenseData)
           }else{
               const id= await storeExpense(expenseData)
               expenseCtx.addExpense({...expenseData,id:id})
           }
           navigation.goBack()
        }catch(error){
             setError('Could not save data - please try again later!')
        }
        
        
}
   if(isSubmitting){
    return <LoadingOverlay/>
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