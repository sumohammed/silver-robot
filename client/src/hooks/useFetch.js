export const useFetch = (method = "POST", url, data = null) => {
  return fetch(url, {
    method: method,
    body: data,
    credentials: "include"
  })
    .then(res => {
      if (!res.ok) throw res.statusText;
      return res.json();
    })
    .then(res => {
      if (res.status != 1 && res.message !== null) {
        Alert(res.message);
      }
      return res.data;
    })
    .catch(err => console.error(`Fetch failed ${err}`));
};
