import { TextInput, View ,Text,StyleSheet} from "react-native"
import { GlobalStyles } from "../../constants/styles"

function Input({label,textInputConfig,style,invalid}){
    let inputStyles=[styles.input];
    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline)
    }
    return(
        <View style={[styles.inputContainer,style]}>
           <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text> 
           <TextInput style={[inputStyles, invalid && styles.invalidInputs]} {...textInputConfig}/>
        </View>
    )
}

export default Input

const styles=StyleSheet.create({
    inputContainer:{
        marginHorizontal:22,
        marginVertical:8,
    }
,
label:{
    fontSize:12,
    color:GlobalStyles.colors.primary100,
    marginBottom:4
},
input:{
    backgroundColor:GlobalStyles.colors.primary100,
    padding:6,
    borderRadius:6,
    fontSize:18,
    color:GlobalStyles.colors.primary700
},
inputMultiline:{
    minHeight:100,
    textAlignVertical:'top'
},
invalidLabel:{
    color:GlobalStyles.colors.error500
},
invalidInputs:{
    backgroundColor:GlobalStyles.colors.error50
}
})