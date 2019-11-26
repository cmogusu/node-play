const { graphql, buildSchema } = require('graphql')
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = { hello: () => 'hello world' }

graphql(schema, '{ hello }', root).then(response => {
  console.log(response, 'response')
})
