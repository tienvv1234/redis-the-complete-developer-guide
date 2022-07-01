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
