export function maskedMoney (event:any){
    var valueMoney = event.target.value;
    if(!valueMoney || valueMoney==='')return  event.target.value = '$0'
    if(event.key ==='Backspace')return
    if(event.key.match(/[a-zA-Z]/)) return event.target.value = valueMoney.slice(0,-1)
    if(valueMoney.match(/^\$0[0-9]{1,9}$/))return event.target.value = '$'+valueMoney[2]
    if (valueMoney.match(/^\$[0-9]{1,10}$/) !== null)  return  event.target.value = valueMoney
    if (valueMoney.match(/^[0-9]{1,10}$/) !== null)  return  event.target.value ='$'+valueMoney 
  }