import { Promise } from 'mongoose';

export async function PostApi(url, json) {
  const myRequest = new Request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  });
  const result = await fetch(myRequest)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      console.debug('Something went wrong on api server!');
      return undefined;
    })
    .catch(error => {
      console.debug(error);
      return undefined;
    });
  return new Promise(resolve => {
    resolve(result);
  });
}
