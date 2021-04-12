// CS 79C
const express = require('express')
const app = express()
const port = 3000
const fetch = require("node-fetch");



function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}


app.get("/", (req, res) => {
  /*
This is an example snippet - you should consider tailoring it
to your service.
*/
  async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch("https://funfact.hasura.app/v1/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": "s0h8zyygPVcFQWNYM9D21KrDdKF6ujd1HQZVsc4l9EXcXQcEEeKm2v2qdlCIjzr7"
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    });

    return await result.json();
  }

  const operationsDoc = `query MyQuery {
    Facts(where: {id: {_eq: ${getRandomInt(20)}}}) {
      fact
    }
  }`;

  function fetchMyQuery() {
    return fetchGraphQL(operationsDoc, "MyQuery", {});
  }

  async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();

    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }

    // do something great with this precious data
    console.log(data);
    res.send(data);
  }

  startFetchMyQuery();
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

