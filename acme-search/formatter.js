const contacts = require('./contacts.json').contacts;
const slack = require('./slack.json').slack;
const calendar = require('./calendar.json').calendar;
const dropbox = require('./dropbox.json').dropbox;
const tweet = require('./tweet.json').tweet;

const dateToIso = date => new Date(date).toISOString();

const TWITTER = 'TWITTER',
      DROPBOX = 'DROPBOX',
      SLACK = 'SLACK',
      CALENDAR = 'CALENDAR',
      CONTACTS = 'CONTACTS';

const DOCUMENT = 'DOCUMENT',
      EVENT = 'EVENT',
      MESSAGE = 'MESSAGE',
      PERSON = 'PERSON';

const formatter = () => {
  const artifacts = [];
  contacts.reduce((acc, el) => {
    const timestamp = dateToIso(el.last_contact);
    acc.push({
      timestamp,
      externalId: `${CONTACTS}-${el.id}`,
      terms: el.matching_terms,
      source: CONTACTS,
      category: PERSON,
  
      details: {
        contactId: el.id,
        name: el.name,
        company: el.company,
        emails: el.emails,
        phones: el.phones,
        lastContact: timestamp,
      }
    })
    return acc;
  }, artifacts)
  
  calendar.reduce((acc, el) => {
    const timestamp = dateToIso(el.date);
    const invitees = el.invitees.split(',').map(inv => inv.trim());
  
    acc.push({
      timestamp,
      externalId: `${CALENDAR}-${el.id}`,
      terms: el.matching_terms,
      source: CALENDAR,
      category: EVENT,
  
      details: {
        calendarId: el.id,
        title: el.title,
        invitees,
      }
    })
    return acc;
  }, artifacts)
  
  slack.reduce((acc, el) => {
    const timestamp = dateToIso(el.timestamp);
    acc.push({
      timestamp,
      externalId: `${SLACK}-${el.id}`,
      terms: el.matching_terms,
      source: SLACK,
      category: MESSAGE,
  
      details: {
        slackId: el.id,
        author: el.author,
        message: el.message,
        channel: el.channel,
      }
    })
    return acc;
  }, artifacts)
  
  dropbox.reduce((acc, el) => {
    const timestamp = dateToIso(el.created);
    acc.push({
      timestamp,
      externalId: `${DROPBOX}-${el.id}`,
      terms: el.matching_terms,
      source: DROPBOX,
      category: DOCUMENT,
  
      details: {
        dropboxId: el.id,
        path: el.path,
        title: el.title,
        sharedWith: el.shared_with,
      }
    })
    return acc;
  }, artifacts)
  
  tweet.reduce((acc, el) => {
    const timestamp = dateToIso(el.timestamp);
    acc.push({
      timestamp,
      externalId: `${TWITTER}-${el.id}`,
      terms: el.matching_terms,
      source: TWITTER,
      category: MESSAGE,
  
      details: {
        twitterId: el.id,
        user: el.user,
        message: el.message,
      }
    })
    return acc;
  }, artifacts)

  return artifacts;
}

module.exports = formatter;