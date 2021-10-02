function client(endpoint, customConfig = {}) {
  // 🐨 create the config you'll pass to window.fetch
  //    make the method default to "GET"
  const config = {
    method: 'GET',
    ...customConfig,
  }

  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(response => response.json())
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
