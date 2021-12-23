export function formatDate(date: any) {
  const fecha = new Date(date);
  return [
    fecha.getDate(),
    (fecha.getMonth() + 1).toString().length < 2
      ? "0" + (fecha.getMonth() + 1)
      : fecha.getMonth() + 1,
    fecha.getFullYear(),
  ].join("/");
}
export function formatDateForRoute(date: any) {
  const fecha = new Date(date);
  return [
    fecha.getFullYear(),
    (fecha.getMonth() + 1).toString().length < 2
    ? "0" + (fecha.getMonth() + 1)
    : fecha.getMonth() + 1,
    fecha.getDate(),
  ].join("-");
}
export function formatDateHour(date: any) {
  const fecha = new Date(date);
  return ''.concat(fecha.getHours().toString().length<2?'0'+fecha.getHours().toString():fecha.getHours().toString(),':',fecha.getMinutes().toString().length<2?'0'+fecha.getMinutes().toString():fecha.getMinutes().toString(),'   ',[
    fecha.getDate(),
    (fecha.getMonth() + 1).toString().length < 2
      ? "0" + (fecha.getMonth() + 1)
      : fecha.getMonth() + 1,
    fecha.getFullYear(),
  ].join("/"))
}