## Minimum steps to under 5 hours
* Need a search input
* Need to return valid artifacts in some order
* Display results

## General
* I am a person searching - who I am should be important here. Can we flip agents in this demo?

* Why am I searching?
  * I want to make sure I am prepared for this meeting. Did I miss anything?
  * I am looking for a specific document (or conversation, or tweet, etc).
  * 

* What are the things to include in my search besides what I type?
  * Who am I
  * When am I searching


* Should we show the items that we are including to feed our algorithm? That way I can cross out invalid stuff.

* How to approach ranking?
  * proximity of entry
    * time
    * how many chats removed - even if it's old it may be the most relevant if it's the first answer

* Pull in new data continuously to show a "most relevant" entry
  * Can I use graphql plus subscription to simulate this?

* Search result interaction
  * pinning
  * dismiss
  * attach tags

* Track/log user engagement

* With dates and "touch-points" can we display those in an interesting way?
  * You can also have future dates
  * Some datasources only have past dates - if they have future we wouldn't see those in the simulation

* What about typos/spell-check?

* Show how results would change over time - have some sort of UI element to drive that

* Ways to distinguish sources:
  * They could each have their own dedicated search result section
    * Pros:
      * Low cognitive load
      * Clear UX
      * Drill down to the source you are looking for
      * More natual to turn off a channel
    * Cons:
      * Lose temporal meaning (even if you bubble a section up, viewing a document next to a calendar event may have temporal value)
      * Dynamically updating datasources become odd to display (how to you convey an update if the user is looking at a different section)
  * Displayed based on ranking inline
    * Pros:
      * More power in ranking
    * Cons:
      * May get lost in the results when there are so many
      * Harder to execute (ranking is more important)
      * You have to be smart about channel spam (ie, if my query returns tons of data from Twitter but I'm really just looking for a document)

A standard search results query isn't the way. A categorized search results also isn't the way.

For this type of search, there is value in the timing. Also, not all things will have equal footing (e.g., if my query hits 1k+ Twitter results but I'm looking for a document).


### contacts.json
* likely doesn't update often - and isn't dynamic
* containts a `last_contact`
* 

### calendar.json
* will have future events
* 

### slack.json
* Find `matching_terms`, could then show contextual data as needed (like expand conversation) based on `channel`.

### dropbox.json
* files on a timeline
* 



## Looking at dates
(Upcoming)
calendar: acme: "date": "2019-03-03 11:00:00" (dave, john, bob, alice)

(Today: 2019-03-02)

(Past)
twitter: acme: "2019-02-28" (acme, hiring, boston)

twitter: acme: "2019-02-27" (acme, hiring, timbuktu)

slack: acme: "2019-02-26 12:01:30" (alice, customer-chatter, acme)
slack: acme: "2019-02-26 12:01:00" (alice, customer-chatter, acme)
slack: acme: "2019-02-26 12:00:00" (alice, customer-chatter, acme)

contacts: acme: "last_contact": "2019-02-26" (john)
contacts: acme: "last_contact": "2019-02-26" (bob)

dropbox: acme: "2019-02-04" (meeting notes)

dropbox: acme: "2019-02-01" (proposal, mou)

dropbox: acme: "2019-01-19" (invoice)

calendar: acme: "date": "2019-01-10 10:00:00" (dave, jobhn, bob, carol)

