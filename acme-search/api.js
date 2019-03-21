const GraphQLClient = require('graphql-request').GraphQLClient

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cjtglgyzg4k6j0105kssa533g', {
  headers: {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTMwNDkyOTEsImNsaWVudElkIjoiY2o1aDR4b3l2MTBwNzAxMjI1d2J2amN3diJ9.F8v_353rOwmGGYdY63MPep2Ysw7TyAz2-Z-ik4Q66Sk',
  },
});

const createTerm = variables => client.request(CREATE_TERM, variables);
const updateOrCreateArtifacts = variables => client.request(UPDATE_OR_CREATE, variables);
const findArtifact = variables => client.request(GET_ARTIFACT, variables);
const allTerms = () => client.request(ALL_TERMS);

const CREATE_TERM = `
mutation CreateTerm(
  $term:String!
){
  createTerm(
    term:$term
  ){
    id
  }
}`;

const ALL_TERMS = `
{
  allTerms{
    id
    term
  }
}`;

const GET_ARTIFACT = `
query GetArtifact(
  $externalId:String!
){
  Artifacts(
    externalId:$externalId
  ){
    id
  }
}`;

const UPDATE_OR_CREATE = `
mutation UpdateOrCreateArtifacts(
  $update: UpdateArtifacts!
  $create: CreateArtifacts!
){
  updateOrCreateArtifacts(
    update: $update
    create: $create
  ){
    id
  }
}
`;

module.exports = {
  createTerm,
  updateOrCreateArtifacts,
  findArtifact,
  allTerms,
}
