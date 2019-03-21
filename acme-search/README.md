Alice is about to head into a meeting with Acme Co.. She visits https://foo.com which has a search box
where she types "Acme Co." and gets content from various data sources (listed below) relevant to the
upcoming meeting.

Data sources (see attached `.json` file for schema/data):
- Contacts
- Dropbox file
- Slack message/thread
- Calendar entry
- Twitter


Each item has a `matching_terms` field, you could treat that as the set of query terms which will retrieve that item (so you don't have to bother with actually searching content).

Feel free to edit the schema, add or remove entries etc. The attached files are just a starting point. For example, if you'd like to add more random tweets to demonstrate scrolling updates, feel free to generate random ones. The ordering of search results is unspecified, feel free to do whatever you feel like. Do share any thoughts you have about ranking though.

# UI aspects to consider

Some questions to seed your thoughts with. These are not a set of required features, just something to get you started thinking.

- How are results from varied sources displayed?
- How are dynamically updating data sources like Twitter/Slack handled?
- Can Alice interact with the search results? (e.g., dismissing data sources/pinning results/attaching tags etc.)
- Are search results displayed instantly as you type or delayed?
- How would we track and log user engagement?