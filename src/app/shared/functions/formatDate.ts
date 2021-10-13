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