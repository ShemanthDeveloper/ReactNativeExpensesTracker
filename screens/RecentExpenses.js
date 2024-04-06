import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
function RecentExpenses(){
    const expensesCtx=useContext(ExpensesContext);
    const recentExpenses=expensesCtx.expenses.filter((expense)=>{
        const today=new Date();
        const date7DaysAgo= getDateMinusDays(today,7);
        return (expense.date > date7DaysAgo) && (expense.date <= today );
    })
     return <ExpensesOutput 
     fallabackText="No expenses registred for the last 7 days."
     expenses={recentExpenses} expensesPeriod="last 7 days"/>
}

export default RecentExpenses