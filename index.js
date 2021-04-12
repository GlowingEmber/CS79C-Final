// CS 79C
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}


app.post("/", (req, res) => {
  /*
This is an example snippet - you should consider tailoring it
to your service.
*/
  const name = req.body.name;

  async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch("http://localhost:8080/v1/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    });

    return await result.json();
  }

  const operationsDoc = `query MyQuery {
    Facts(where: {id: {_eq: ${getRandomInt(2)}}}) {
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

