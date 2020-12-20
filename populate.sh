# curl -H "Content-Type: application/rdf" "localhost:8080/mutate?commitNow=true" -XPOST -d $'
# {
#   set {
#    _:luke <name> "Luke Skywalker" .
#    _:luke <dgraph.type> "Person" .
#    _:leia <name> "Princess Leia" .
#    _:leia <dgraph.type> "Person" .
#    _:han <name> "Han Solo" .
#    _:han <dgraph.type> "Person" .
#    _:lucas <name> "George Lucas" .
#    _:lucas <dgraph.type> "Person" .
#    _:irvin <name> "Irvin Kernshner" .
#    _:irvin <dgraph.type> "Person" .
#    _:richard <name> "Richard Marquand" .
#    _:richard <dgraph.type> "Person" .

#    _:sw1 <name> "Star Wars: Episode IV - A New Hope" .
#    _:sw1 <release_date> "1977-05-25" .
#    _:sw1 <revenue> "775000000" .
#    _:sw1 <running_time> "121" .
#    _:sw1 <starring> _:luke .
#    _:sw1 <starring> _:leia .
#    _:sw1 <starring> _:han .
#    _:sw1 <director> _:lucas .
#    _:sw1 <dgraph.type> "Film" .

#    _:sw2 <name> "Star Wars: Episode V - The Empire Strikes Back" .
#    _:sw2 <release_date> "1980-05-21" .
#    _:sw2 <revenue> "534000000" .
#    _:sw2 <running_time> "124" .
#    _:sw2 <starring> _:luke .
#    _:sw2 <starring> _:leia .
#    _:sw2 <starring> _:han .
#    _:sw2 <director> _:irvin .
#    _:sw2 <dgraph.type> "Film" .

#    _:sw3 <name> "Star Wars: Episode VI - Return of the Jedi" .
#    _:sw3 <release_date> "1983-05-25" .
#    _:sw3 <revenue> "572000000" .
#    _:sw3 <running_time> "131" .
#    _:sw3 <starring> _:luke .
#    _:sw3 <starring> _:leia .
#    _:sw3 <starring> _:han .
#    _:sw3 <director> _:richard .
#    _:sw3 <dgraph.type> "Film" .

#    _:st1 <name> "Star Trek: The Motion Picture" .
#    _:st1 <release_date> "1979-12-07" .
#    _:st1 <revenue> "139000000" .
#    _:st1 <running_time> "132" .
#    _:st1 <dgraph.type> "Film" .
#   }
# }
# ' 

# TODO figure out how to set location such that it shows up in Ratel. This does not work.
# curl -H "Content-Type: application/rdf" "localhost:8080/mutate?commitNow=true" -X POST -d $'
# {
#   set {
#    _:alcyone <Person.name> "Alcyone" .
#    _:alcyone <dgraph.type> "Person" .
#    _:alcyone <Person.location> "{\'type\':\'Point\',\'coordinates\':[-122.4220186,37.772318]}"^^<geo:geojson> .
   
#    _:asterope <Person.name> "Asterope" .
#    _:asterope <dgraph.type> "Person" .
#    _:asterope <Person.related> _:alcyone .

#    _:book2 <Story.title> "The Storm Sister" .
#    _:book2 <dgraph.type> "Story" .
#   }
# }
# ' 

curl -H "Content-Type: application/rdf" "localhost:8080/mutate?commitNow=true" -X POST -d $'
{
  set {
   _:book1 <Story.title> "The Seven Sisters" .
   _:book1 <dgraph.type> "Story" .

   _:book2 <Story.title> "The Storm Sister" .
   _:book2 <dgraph.type> "Story" .

   _:maia <Person.name> "Maia" .
   _:maia <dgraph.type> "Person" .
   _:maia <Person.story> _:book1 .

   _:alcyone <Person.name> "Alcyone" .
   _:alcyone <Person.nickNames> "Ally" .
   _:alcyone <Person.nickNames> "Storm" .
   _:alcyone <dgraph.type> "Person" .
   _:alcyone <Person.story> _:book2 .
   
   _:asterope <Person.name> "Asterope" .
   _:asterope <Person.nickNames> "Star" .
   _:asterope <Person.nickNames> "Shadow" .
   _:asterope <dgraph.type> "Person" .

   _:pasalt <Person.name> "Pa Salt" .
   _:pasalt <dgraph.type> "Person" .
   _:pasalt <Person.related> _:maia .
   _:pasalt <Person.related> _:alcyone .
   _:pasalt <Person.related> _:asterope .
  }
}
' 

# https://dgraph.io/docs/mutations/json-mutation-format/#json-syntax-using-raw-http-or-ratel-ui
# https://dgraph.io/docs/mutations/json-mutation-format/
# https://dgraph.io/docs/tutorial-2/#adding-an-edge-between-existing-nodes

# Setting a related link in JSON does not seem to work, unless using the resolved UID (see below)
# curl -H "Content-Type: application/json" "localhost:8080/mutate?commitNow=true" -X POST -d $'
# {
#   "set": [
#     {
#       "Person.uid": "_:maia",
#       "Person.name": "Maia",
#       "dgraph.type": "Person"
#     },
#     {
#       "Person.uid": "_:alcyone",
#       "Person.name": "Alcyone",
#       "dgraph.type": "Person",
#       "Person.related": { 
#         "uid": "_:maia" 
#       }
#     },  
#     {
#       "Story.title": "The Storm Sister",
#       "dgraph.type": "Story"
#     },
#     {
#       "Story.title": "The Seven Sisters",
#       "dgraph.type": "Story"
#     }
#   ]
# }
# ' 

# curl -H "Content-Type: application/json" "localhost:8080/mutate?commitNow=true" -X POST -d $'
# {
#   "set": [
#     {
#       "uid": "0x9",
#       "Person.related": [{"uid": "0xa"}]
#     }
#   ]
# }
# ' 