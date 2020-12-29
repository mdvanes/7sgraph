
curl -H "Content-Type: application/rdf" "localhost:8080/mutate?commitNow=true" -X POST -d $'
{
  set {
   _:book1 <Story.title> "The Seven Sisters" .
   _:book1 <Story.storyID> "book1" .
   _:book1 <dgraph.type> "Story" .

   _:book2 <Story.title> "The Storm Sister" .
   _:book2 <Story.storyID> "book2" .
   _:book2 <dgraph.type> "Story" .

   _:book3 <Story.title> "The Shadow Sister" .
   _:book3 <Story.storyID> "book3" .
   _:book3 <dgraph.type> "Story" .

   _:book4 <Story.title> "The Pearl Sister" .
   _:book4 <Story.storyID> "book4" .
   _:book4 <dgraph.type> "Story" .

   _:book5 <Story.title> "The Moon Sister" .
   _:book5 <Story.storyID> "book5" .
   _:book5 <dgraph.type> "Story" .

   _:book6 <Story.title> "The Sun Sister" .
   _:book6 <Story.storyID> "book6" .
   _:book6 <dgraph.type> "Story" .
  }
}
' 


curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"mutation { addPerson(input: [   { personID:\"zedjr\"   , name: \"Zed Jr.\"      , gender: \"male\"   , dateOfBirth: 1995                        , story: { storyID: \"book1\" } }]) {   person {   personID   name   nickNames   gender   dateOfBirth   dateOfDeath   children {     personID   }   nonBioChildren {     personID   }   parents {     personID   }   nonBioParents {     personID   }   physicalRelation {     personID   }   otherRelation {     personID   }   story {     storyID   }   } } }","variables":null}'


curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"mutation { addPerson(input: [   { personID:\"zed\"   , name: \"Zed Eszu\"      , gender: \"male\"         , children: [{ personID: \"zedjr\" }]                   }]) {   person {   personID   name   nickNames   gender   dateOfBirth   dateOfDeath   children {     personID   }   nonBioChildren {     personID   }   parents {     personID   }   nonBioParents {     personID   }   physicalRelation {     personID   }   otherRelation {     personID   }   story {     storyID   }   } } }","variables":null}'


curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"mutation { addPerson(input: [   { personID:\"kreeg\"   , name: \"Kreeg Eszu\"      , gender: \"male\"      , dateOfDeath: 2007   , children: [{ personID: \"zed\" }]                   }]) {   person {   personID   name   nickNames   gender   dateOfBirth   dateOfDeath   children {     personID   }   nonBioChildren {     personID   }   parents {     personID   }   nonBioParents {     personID   }   physicalRelation {     personID   }   otherRelation {     personID   }   story {     storyID   }   } } }","variables":null}'


curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"mutation { addPerson(input: [   { personID:\"maia\"   , name: \"Maia d'\''Apliése\"      , gender: \"female\"         , children: [{ personID: \"zedjr\" }]            , physicalRelation: [{ personID: \"zed\" }]      , story: { storyID: \"book1\" } }]) {   person {   personID   name   nickNames   gender   dateOfBirth   dateOfDeath   children {     personID   }   nonBioChildren {     personID   }   parents {     personID   }   nonBioParents {     personID   }   physicalRelation {     personID   }   otherRelation {     personID   }   story {     storyID   }   } } }","variables":null}'


curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"mutation { addPerson(input: [   { personID:\"alcyone\"   , name: \"Alcyone d'\''Apliése\"   , nickNames: [\"Ally\", \"Storm\"]   , gender: \"female\"   , dateOfBirth: 1980                        , story: { storyID: \"book2\" } }]) {   person {   personID   name   nickNames   gender   dateOfBirth   dateOfDeath   children {     personID   }   nonBioChildren {     personID   }   parents {     personID   }   nonBioParents {     personID   }   physicalRelation {     personID   }   otherRelation {     personID   }   story {     storyID   }   } } }","variables":null}'


curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"mutation { addPerson(input: [   { personID:\"thomfhalvorsen\"   , name: \"Thom Felix Halvorsen\"      , gender: \"male\"   , dateOfBirth: 1980                        , story: { storyID: \"book2\" } }]) {   person {   personID   name   nickNames   gender   dateOfBirth   dateOfDeath   children {     personID   }   nonBioChildren {     personID   }   parents {     personID   }   nonBioParents {     personID   }   physicalRelation {     personID   }   otherRelation {     personID   }   story {     storyID   }   } } }","variables":null}'


curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"mutation { addPerson(input: [   { personID:\"felixmhalvorsen\"   , name: \"Felix Mendelssohn Halvorsen\"      , gender: \"male\"         , children: [{ personID: \"alcyone\" }, { personID: \"thomfhalvorsen\" }]                  , story: { storyID: \"book2\" } }]) {   person {   personID   name   nickNames   gender   dateOfBirth   dateOfDeath   children {     personID   }   nonBioChildren {     personID   }   parents {     personID   }   nonBioParents {     personID   }   physicalRelation {     personID   }   otherRelation {     personID   }   story {     storyID   }   } } }","variables":null}'


curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"mutation { addPerson(input: [   { personID:\"electra\"   , name: \"Electra d'\''Apliése\"   , nickNames: [\"Sun\"]   , gender: \"female\"                     , physicalRelation: [{ personID: \"zed\" }]      , story: { storyID: \"book6\" } }]) {   person {   personID   name   nickNames   gender   dateOfBirth   dateOfDeath   children {     personID   }   nonBioChildren {     personID   }   parents {     personID   }   nonBioParents {     personID   }   physicalRelation {     personID   }   otherRelation {     personID   }   story {     storyID   }   } } }","variables":null}'


curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"mutation { addPerson(input: [   { personID:\"marina\"   , name: \"Marina\"   , nickNames: [\"Ma\"]   , gender: \"female\"                            }]) {   person {   personID   name   nickNames   gender   dateOfBirth   dateOfDeath   children {     personID   }   nonBioChildren {     personID   }   parents {     personID   }   nonBioParents {     personID   }   physicalRelation {     personID   }   otherRelation {     personID   }   story {     storyID   }   } } }","variables":null}'


curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"mutation { addPerson(input: [   { personID:\"pasalt\"   , name: \"Pa Salt\"      , gender: \"male\"      , dateOfDeath: 2007      , nonBioChildren: [{ personID: \"maia\" }, { personID: \"alcyone\" }, { personID: \"electra\" }]            , otherRelation: [{ personID: \"marina\" }]    }]) {   person {   personID   name   nickNames   gender   dateOfBirth   dateOfDeath   children {     personID   }   nonBioChildren {     personID   }   parents {     personID   }   nonBioParents {     personID   }   physicalRelation {     personID   }   otherRelation {     personID   }   story {     storyID   }   } } }","variables":null}'


echo ;echo 🎉 Finished curl scripts with graphql mutate statements