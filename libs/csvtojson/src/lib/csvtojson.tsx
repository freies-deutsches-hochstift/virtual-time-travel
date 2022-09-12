//bla bla bla typescript bla its almost 12 and I wanna sleep...
// eslint-disable-next-line @typescript-eslint/ban-types
export function csvtojson(csv: any, mapper: Function) {
  for (let i = 0; i < csv.length; i++) {
    csv[i] = mapper(csv[i]);
  }
  return csv;
}
export default csvtojson;
