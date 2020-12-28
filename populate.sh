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

   _:zed <Person.name> "Zed Eszu" .
   _:zed <Person.personID> "zed" .
   _:zed <Person.gender> "male" .
   _:zed <dgraph.type> "Person" .

   _:kreeg <Person.name> "Kreeg Eszu" .
   _:kreeg <Person.personID> "kreeg" .
   _:pasalt <Person.dateOfDeath> "2007" .
   _:kreeg <Person.gender> "male" .
   _:kreeg <dgraph.type> "Person" .
   _:kreeg <Person.parent> _:zed .

   _:maia <Person.name> "Maia d\'Apliése" .
   _:maia <Person.personID> "maia" .
   _:maia <Person.gender> "female" .
   _:maia <dgraph.type> "Person" .
   _:maia <Person.story> _:book1 .
   _:maia <Person.physicalRelation> _:zed .

   _:alcyone <Person.name> "Alcyone d\'Apliése" .
   _:alcyone <Person.personID> "alcyone" .
   _:alcyone <Person.gender> "female" .
   _:alcyone <Person.nickNames> "Ally" .
   _:alcyone <Person.nickNames> "Storm" .
   _:alcyone <Person.dateOfBirth> "1980" .
   _:alcyone <dgraph.type> "Person" .
   _:alcyone <Person.story> _:book2 .
   

   
   _:piphalvorsen <Person.name> "Jens Halvorsen" .
   _:piphalvorsen <Person.personID> "piphalvorsen" .
   _:piphalvorsen <Person.nickNames> "Pip" .
   _:piphalvorsen <dgraph.type> "Person" .
   _:piphalvorsen <Person.parent> _:felixmhalvorsen .

   _:asterope <Person.name> "Asterope d\'Apliése" .
   _:asterope <Person.personID> "asterope" .
   _:asterope <Person.gender> "female" .
   _:asterope <Person.nickNames> "Star" .
   _:asterope <Person.nickNames> "Shadow" .
   _:asterope <dgraph.type> "Person" .

   _:celeano <Person.name> "Celeano d\'Apliése" .
   _:celeano <Person.personID> "celeano" .
   _:celeano <Person.gender> "female" .
   _:celeano <Person.nickNames> "CeCe" .
   _:celeano <Person.nickNames> "Pearl" .
   _:celeano <dgraph.type> "Person" .

   _:taygete <Person.name> "Taygete d\'Apliése" .
   _:taygete <Person.personID> "taygete" .
   _:taygete <Person.gender> "female" .
   _:taygete <Person.nickNames> "Tiggy" .
   _:taygete <Person.nickNames> "Moon" .
   _:taygete <dgraph.type> "Person" .

   _:electra <Person.name> "Electra d\'Apliése" .
   _:electra <Person.personID> "electra" .
   _:electra <Person.gender> "female" .
   _:electra <Person.nickNames> "Sun" .
   _:electra <dgraph.type> "Person" .
   _:electra <Person.physicalRelation> _:zed .

   _:merope <Person.name> "Merope d\'Apliése" .
   _:merope <Person.personID> "merope" .
   _:merope <Person.gender> "female" .
   _:merope <Person.nickNames> "Missing" .
   _:merope <dgraph.type> "Person" .

   _:marina <Person.name> "Marina" .
   _:marina <Person.personID> "marina" .
   _:marina <Person.nickNames> "Ma" .
   _:marina <Person.gender> "female" .
   _:marina <dgraph.type> "Person" .

   _:pasalt <dgraph.type> "Person" .
   _:pasalt <Person.personID> "pasalt" .
   _:pasalt <Person.name> "Pa Salt" .
   _:pasalt <Person.dateOfDeath> "2007" .
   _:pasalt <Person.gender> "male" .
   _:pasalt <Person.nonBioParent> _:maia .
   _:pasalt <Person.nonBioParent> _:alcyone .
   _:pasalt <Person.nonBioParent> _:asterope .
   _:pasalt <Person.nonBioParent> _:celeano .
   _:pasalt <Person.nonBioParent> _:taygete .
   _:pasalt <Person.nonBioParent> _:electra .
   _:pasalt <Person.nonBioParent> _:merope .
   _:pasalt <Person.otherRelation> _:marina .
  }
}
' 


  #  _:thomfhalvorsen <Person.name> "Thom Felix Halvorsen" .
  #  _:thomfhalvorsen <Person.personID> "thomfhalvorsen" .
  #  _:thomfhalvorsen <Person.dateOfBirth> "1980" .
  #  _:thomfhalvorsen <dgraph.type> "Person" .
  #  _:thomfhalvorsen <Person.story> _:book2 .

  #  _:felixmhalvorsen <Person.name> "Felix Mendelssohn Halvorsen" .
  #  _:felixmhalvorsen <Person.personID> "felixmhalvorsen" .
  #  _:felixmhalvorsen <dgraph.type> "Person" .
  #  _:felixmhalvorsen <Person.parent> _:alcyone .
  #  _:felixmhalvorsen <Person.parent> _:thomfhalvorsen .
  #  _:felixmhalvorsen <Person.story> _:book2 .

# Can't reference an ID that is added in the same addPerson statement
# mutation {
#   addPerson(input: [
#     { personID:"thomfhalvorsen", name: "Thom Felix Halvorsen", dateOfBirth: 1980 },
#     { personID:"felixmhalvorsen", name: "Felix Mendelssohn Halvorsen", nonBioParent: [{ personID: "alcyone" },  { personID: "thomfhalvorsen" }] }
#   ]) {
#     person {
#       personID
#       name
#       nonBioParent {
#         personID
#       }
#     }
#   }
# }

# Add Thom
# mutation {
#   addPerson(input: [
#     { personID:"thomfhalvorsen", name: "Thom Felix Halvorsen", dateOfBirth: 1980 },
#   ]) {
#     person {
#       personID
#       name
#       nonBioParent {
#         personID
#       }
#     }
#   }
# }
curl 'http://localhost:8080/graphql' \
  -H 'Content-Type: application/json' \
  --data-binary '{"query":"mutation {\n  addPerson(input: [\n    { personID:\"thomfhalvorsen\", name: \"Thom Felix Halvorsen\", dateOfBirth: 1980 },\n  ]) {\n    person {\n      personID\n      name\n      nonBioParent {\n        personID\n      }\n    }\n  }\n}","variables":null}' \
  --compressed

# Add Felix
# mutation {
#   addPerson(input: [
#     { personID:"felixmhalvorsen", name: "Felix Mendelssohn Halvorsen", nonBioParent: [{ personID: "alcyone" }, { personID: "thomfhalvorsen" }] }
#   ]) {
#     person {
#       personID
#       name
#       nonBioParent {
#         personID
#       }
#     }
#   }
# }
curl 'http://localhost:8080/graphql' \
  -H 'Content-Type: application/json' \
  --data-binary '{"query":"mutation {\n  addPerson(input: [\n    { personID:\"felixmhalvorsen\", name: \"Felix Mendelssohn Halvorsen\", nonBioParent: [{ personID: \"alcyone\" }, { personID: \"thomfhalvorsen\" }] }\n  ]) {\n    person {\n      personID\n      name\n      nonBioParent {\n        personID\n      }\n    }\n  }\n}","variables":null}' \
  --compressed

# curl 'http://localhost:8080/graphql' \
#   -H 'Content-Type: application/json' \
#   --data-binary '{"query":"mutation {\n  addPerson(input: [\n    { name: \"TestPerson1\", story: { storyID: \"0xa\" } },\n    { name: \"TestPerson2\", story: { storyID: \"0xa\" } }\n  ]) {\n    person {\n      personID\n      name\n      story {\n        title\n      }\n    }\n  }\n}","variables":null}' \
#   --compressed

# Test add for inversion relationmutation 
# {
#   addPerson(input: [
#     { personID:"tp1", name: "TestPerson1", nonBioParentParent: { personID: "pasalt" } },
#     { personID:"tp2", name: "TestPerson2", nonBioParentParent: { personID: "pasalt" } }
#   ]) {
#     person {
#       personID
#       name
#       nonBioParentParent {
#         personID
#       }
#     }
#   }
# }

# Test query inverse relation
# {
#   queryPerson {
#     __typename
#     personID
#     name
#     nonBioParent {
#       name
#     }
#     nonBioParentParent {
#       name
#     }
#   }
# }

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
