# Redis

String
Store plain string or number
GET, SET, APPEND

List
List of strings
LINDEX, LLEN, LINSERT

Hash
Collection of key value pairs
HGET, HSET, HDEL

Set
Set of strings (each string is unique)
SADD, SCARD, SDIFF

SET key value [ NX | XX] [GET] [ EX seconds | PX milliseconds | EXAT unix-time-seconds | PXAT unix-time-milliseconds | KEEPTTL]
SET key value: Capitalized words are keywords
[ NX | XX] [ EX seconds | PX milliseconds | EXAT unix-time-seconds | PXAT unix-time-milliseconds | KEEPTTL]: '|' mean 'or'
[] every things inside this is optional

SET color red ==> ok
SET color green GET ==> red

                            app server

command set asd 'HI there' xx | | response null
| |
Redis
xx Option: only run the Set if the key already exists
nx Option: only run the SET if the key does not exist

Design consideration

1. What type of data are we storing --> String
2. Should we be concerned about the size of data --> Yes! only cache certain pages
3. Do we nned to expire this data --> Yes
4. What will the key naming policy be for this data -->
5. Any business logic concerns --> Nope

## Key naming methodology

-   Keys should be unique
-   Other engineers should understand what a key is for
-   Tip - use functions to generate your key names so you never make a type
-   Extremelu common practice is to use a ':' to separate different parts of the key (users:45, items:19, users:posts:901)

#### small twist on common practice

we are going to use a # before unique ID's to make implementing search easier
(users#45, items#19, users:posts#901)

pagecache#/about --> <html></html>
pagecache#/privacy --> <html></html>
pagecache#/auth/signin --> <html></html>
pagecache#/auth/signup --> <html></html>

HSET
create a hash and store nested key-value pairs

Reasons to store as Hash
+ The record has many attributes
+ A collection of these records have to be sorted many different ways
+ Often need to access a single record at a time

Don't use hashes when
+ The record is only for counting or ecforcing uniqueness
+ Record stores only one or two attributes
+ Used only for creating relations between different records
+ The record is only used for time series data

two note here
- First note
hset recreate object
- Second note
set command

Serialize
Gets an object ready to go into redis as a hash
removes IDTurns dates into queryable format

Deserialize
Formats data coming out of redis
add in id
Parse string numbers into plain numbers

## Feature Pipeline  (special feature)
- mean take a bunch of different commands and dump them all into one single command
Auto-Pipelining
Node Redis will automatically pipeline requests that are made during the same "tick".

client.set('Tm9kZSBSZWRpcw==', 'users:1');
client.sAdd('users:1:tokens', 'Tm9kZSBSZWRpcw==');
Of course, if you don't do something with your Promises you're certain to get unhandled Promise exceptions. To take advantage of auto-pipelining and handle your Promises, use Promise.all().

await Promise.all([
  client.set('Tm9kZSBSZWRpcw==', 'users:1'),
  client.sAdd('users:1:tokens', 'Tm9kZSBSZWRpcw==')
]);
