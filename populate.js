const csv = require("csv-parser");
const fs = require("fs");
const results = [];

fs.createReadStream("persons.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    console.log(results);
    // TODO write here to "raw" JSON

    const curlStrings = results.map((person) => {
      const mutationStr = `mutation {
            addPerson(input: [
              { personID:"${person.personID}"
              , name: "${person.name}"
              , nickNames: [${person.nickNames
                .split(",")
                .map((n) => `"${n}"`)
                .join(", ")}]
              , dateOfBirth: ${person.dateOfBirth} },
              , children: [${person.children
                .split(",")
                .map((n) => `{ personID: "${n}" }`)
                .join(", ")}]
            ]) {
              person {
                personID
                name
                nickNames
                dateOfBirth
                children {
                  personID
                }
                nonBioChildren {
                  personID
                }
              }
            }
          }`;
      //   return mutationStr;
      return `curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --data-binary '{"query":"${mutationStr}","variables":null}' --compressed`;
    });
    // console.log(curlStrings);

    try {
      fs.writeFileSync("populate2.sh", "");
      console.log("emptied populate2.sh");
    } catch (err) {
        console.log("error emptying: " + err);
    }

    const stream = fs.createWriteStream("populate2.sh", { flags: "a" });
    curlStrings.forEach((str) => {
      stream.write(str + "\n\n\n");
    });
    console.log("wrote populate2.sh");
    stream.end();
  });

//   _:maia <Person.name> "Maia d\'Apliése" .
//   _:maia <Person.personID> "maia" .
//   _:maia <Person.gender> "female" .
//   _:maia <dgraph.type> "Person" .
//   _:maia <Person.story> _:book1 .
//   _:maia <Person.physicalRelation> _:zed .

//   curl 'http://localhost:8080/graphql' \
//   -H 'Content-Type: application/json' \
//   --data-binary '{"query":"mutation {\n  addPerson(input: [\n    { personID:\"thomfhalvorsen\", name: \"Thom Felix Halvorsen\", dateOfBirth: 1980 },\n  ]) {\n    person {\n      personID\n      name\n      children {\n        personID\n      }\n    }\n  }\n}","variables":null}' \
//   --compressed
