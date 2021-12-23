export function validate(object,requiredValues){
    return requiredValues.every((camp)=>{
        if(!object[camp]) return false
        return true
    })
}