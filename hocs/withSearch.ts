import gql from 'graphql-tag'
// import {
//   graphql,
//   ChildDataProps,
// } from 'react-apollo';

export const WITH_SEARCH_QUERY = gql`
  query Search(
      $filter: ArtifactsFilter
      $orderBy: ArtifactsOrderBy
      $skip: Int
      $after: String
      $before: String
      $first: Int
      $last: Int
  ){
    allArtifactses(
      filter: $filter
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ){
      id
      category
      source
      details
      externalId
      owner
      terms {
        term
      }
      timestamp
    }
  }
`;

// Note: Could use this to leverage more of a HOC approach - for now just keeping the query close to the component

// type InputProps = { pipelineId?: string } & any;
// type Variables = { term?: string };
// type Response = {
//   allArtifactses?: any
// }

// type ChildProps = Partial<ChildDataProps<InputProps, Response, Variables>>;

// export const withSearch = graphql<InputProps, Response, Variables, ChildProps>(WITH_SEARCH_QUERY, {
//   options: () => ({
//     // errorPolicy: 'all',
//     // fetchPolicy: 'cache-and-network',
//     // context: {
//     //   noBatch: true
//     // }
//   }),
//   props: ({ data = null }) => {
//     if(!data){
//       return {};
//     }

//     if(data.error && data.allArtifactses){
//       console.error(data.error);
//     }

//     return {
//       ...data,
//       searchResults : data.allArtifactses,
//     }
//   }
// });

// // exports
// export default withSearch;
