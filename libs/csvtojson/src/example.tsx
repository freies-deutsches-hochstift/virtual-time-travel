import { parse } from 'csv-parse/browser/esm/sync';
import { JSONTree } from 'react-json-tree';
import csvtojson from './lib/csvtojson';
/* eslint-disable-next-line */
export interface csvToJSONExampleProps {}

export function CsvToJSONExample(props: csvToJSONExampleProps) {
  const text = `id,name.first,name.last,geolocation,address.city,address.country,address.code
  100,Ira,Germann,"[ 13.2157, 14.3706 ]",Berlin,Malta,MK
  101,Maridel,Berl,"[ 13.2157, 14.3706 ]",Luxembourg (city),Thailand,TW
  102,Cristine,Lamoree,"[ 13.2157, 14.3706 ]",Harbin,Solomon Islands,HR
  103,Giustina,Croix,"[ 13.2157, 14.3706 ]",Tashkent,Italy,TK
  104,Jenilee,Alexandr,"[ 13.2157, 14.3706 ]",Charlottetown,Cuba,AZ
  105,Annora,Wiener,"[ 13.2157, 14.3706 ]",Seville,Cayman Islands,BF
  106,Roz,Anastatius,"[ 13.2157, 14.3706 ]",Changchun,Åland Islands,MY
  107,Imojean,Thornburg,"[ 13.2157, 14.3706 ]",Leipzig,Ukraine,LA
  108,Kylynn,Martsen,"[ 13.2157, 14.3706 ]",Manchester,Congo,MP
  109,Ariela,Bebe,"[ 13.2157, 14.3706 ]",Beijing,Romania,AU`;

  const mapper = (data: any) => {
    console.log('in mapper with data: ', data);

    return {
      id: data.id,
      name: { first: data['name.first'], last: data['name.last'] },
      geolocation: JSON.parse(data.geolocation),
      address: {
        city: data['address.city'],
        country: data['address.country'],
        code: data['address.code'],
      },
    };
  };

  const csv = parse(text, { columns: true });
  // console.table('CSV : ', csv);

  const json = csvtojson(csv, mapper);

  return (
    <>
      <h1>csvToJSON Demo</h1>
      <fieldset>
        <legend>CSV Data</legend>
        <div>{text}</div>
      </fieldset>
      <fieldset>
        <legend>JSON Template Data</legend>
        <code>{mapper.toString()}</code>
      </fieldset>
      <fieldset>
        <legend>Rebuilt Data</legend>
        <JSONTree data={json} />
      </fieldset>
    </>
  );
}
