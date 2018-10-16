const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'keys.env'})
const { ApolloServer, gql } = require('apollo-server-express');

require('./db.js')

const Cat = require('./models/resolutions.js')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
type Query {
  allCats: String 
}

type Cat {
  name: String
}

type Mutation {
  createCats(name: String): String 
}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    async allCats() {
      return 'hello' 
    }
  },

  Mutation: {
    async createCats(obj, { name },__ ) {
      return 'kitty'
    }
  }
};


const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:7777' 
  })
);
// Returns middleware that only parses json
app.use(bodyParser.json());
//This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.

//A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bodyParser.urlencoded({extended: true}));


app.use(
  session({
    name: "qid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

var count = 0

app.use(
  (req, _, next) => {
    req.session.counter = count
    console.log(req.session);
    count += 1

    return next();
  });


const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
