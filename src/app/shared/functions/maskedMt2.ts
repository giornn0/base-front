export function maskedMt2(event:any){
    var valueMt2 =event.target.value;
    console.log(event.key.match(/[\D.-]]/))
    if(!valueMt2|| valueMt2==='')return  event.target.value = '0 mt²'
    if((event.keyCode>64 && event.keyCode < 91) )  return event.target.value =  valueMt2 .replace(/[^\d.,]/g,'')
  }