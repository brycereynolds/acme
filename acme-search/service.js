const api = require('./api');

function upsertRecords(artifacts){
  // Create all our terms first - this avoids a double processing of the 
  // artifact create/update calls b/c we are using graphcool resolvers instead
  // of the custom resolver you'd have for this type of endpoint.
  createTerms(artifacts);

  // We are using a raw API against graphcool - didn't dig into how to avoid caching here
  // and I'm seeing that happen occasionally.
  setTimeout(() => {
    artifacts.map(artifact => {
      upsertRecord(artifact).then(console.log).catch(console.error);
    })
  }, 1000);

}

async function upsertRecord(artifact){
  const existingTerms = await hashOfExistingTerms();

  return api.findArtifact({ externalId: artifact.externalId })
    .then(({ Artifacts:existing }) => {
      const { termsIds } = matchTerms(existingTerms, artifact.terms);
      delete artifact.terms;

      const create = artifact;

      const update = {
        ...artifact,
        id: existing ? existing.id : 'will-not-update',
      }

      if(termsIds.length > 0){
        update.termsIds = termsIds;
        create.termsIds = termsIds;
      }

      return api.updateOrCreateArtifacts({ update, create });
    })
}

async function createTerms(artifacts){
  const existingTerms = await hashOfExistingTerms();

  const newTerms = artifacts.reduce((acc, a) => {
    a.terms.map(term => {
      if(!existingTerms[term]) acc[term] = term
    });
    return acc;
  }, {});

  Object.keys(newTerms).map(term => {
    api.createTerm({ term }).then(console.info).catch(console.error);
  })
}

function matchTerms(existingTerms, newTerms){
  return (
    newTerms.reduce((acc, newTerm) => {
      if(existingTerms[newTerm]){
        acc.termsIds.push(existingTerms[newTerm])
      }else{
        acc.terms.push({ term: newTerm })
      }
      return acc;
    }, {
      termsIds: [],
      terms: [],
    })
  )
}

async function hashOfExistingTerms(){
  let existingTerms = await api.allTerms();
  existingTerms = existingTerms.allTerms.reduce((acc, {term, id}) => {
    acc[term] = id;
    return acc;
  }, {});
  return existingTerms;
}

module.exports = {
  upsertRecords,
}