const express = require("express");
const expressGraphQL = require("express-graphql");
const server = express();
const port = 4000;
const peopleSchema = require("./schema");

server.use(
  "/salutGraphQL",
  expressGraphQL({
    graphiql: true,
    schema: peopleSchema
  })
);

server.listen(port, () => console.log(`App listening on port ${port}!`));
