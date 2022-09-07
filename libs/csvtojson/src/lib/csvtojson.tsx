export function csvtojson(csv: any, template: object) {
  for (let i = 0; i < csv.length; i++) {
    const element = csv[i];
    for (let j = 0; j < Object.keys(element).length; j++) {
      const prop = Object.keys(element)[j];
    }
  }

  return [];
}

export default csvtojson;
