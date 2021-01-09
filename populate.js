const csv = require("csv-parser");
const fs = require("fs");
const results = [];

const OUTPUT_FILE_NAME = "populate.sh";

const staticMutations = `
curl -H "Content-Type: application/rdf" "http://localhost:8080/mutate?commitNow=true" -X POST -d $'
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
' `;

// Bash escape single quote
const escape = (str) => str.replace(/'/g, "'\\''");

const escapeMutationStr = (str) =>
  str.replace(/"/g, '\\"').replace(/\n|\s{2}/g, " ");

const createNickNamesField = (v) =>
  v &&
  `, nickNames: [${v
    .split(",")
    .map((n) => `"${n}"`)
    .join(", ")}]`;

const createStrField = (name, v) => v && `, ${name}: "${v}"`;
const createField = (name, v) => v && `, ${name}: ${v}`;

const createRelationField = (name, key, val) =>
  val &&
  `, ${name}: { ${key}: "${val}" }`;

const createRelationsField = (name, key, val) =>
  val &&
  `, ${name}: [${val
    .split(",")
    .map((n) => `{ ${key}: "${n}" }`)
    .join(", ")}]`;

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
    , name: "${escape(person.name)}"
    ${createNickNamesField(person.nickNames)}
    ${createStrField("gender", person.gender)}
    ${createStrField("dateOfBirth", person.dateOfBirth)}
    ${createStrField("dateOfDeath", person.dateOfDeath)}
    ${createRelationsField("children", "personID", person.children)}
    ${createRelationsField("nonBioChildren", "personID", person.nonBioChildren)}
    ${createRelationsField("parents", "personID", person.parents)}
    ${createRelationsField("nonBioParents", "personID", person.nonBioParents)}
    ${createRelationsField("physicalRelation", "personID", person.physicalRelation)}
    ${createRelationsField("otherRelation", "personID", person.otherRelation)}
    ${createRelationField("story", "storyID", person.story)}
    ${createField("cx", person.cx)}
    ${createField("cy", person.cy)}
}]) {
    person {
    personID
    name
    nickNames
    gender
    dateOfBirth
    dateOfDeath
    children {
        personID
    }
    nonBioChildren {
        personID
    }
    parents {
        personID
    }
    nonBioParents {
        personID
    }
    physicalRelation {
        personID
    }
    otherRelation {
        personID
    }
    story {
        storyID
    }
    cx
    cy
    }
}
}`;
      console.log(mutationStr);
      return `curl 'http://localhost:8080/graphql' -H 'Content-Type: application/json' --compressed --data-binary '{"query":"${escapeMutationStr(
        mutationStr
      )}","variables":null}'`;
    });
    // console.log(curlStrings);

    try {
      fs.writeFileSync(OUTPUT_FILE_NAME, "");
      console.log(`emptied ${OUTPUT_FILE_NAME}`);
      fs.writeFileSync(OUTPUT_FILE_NAME, staticMutations + "\n\n\n");
    } catch (err) {
      console.log("error emptying: " + err);
    }

    const stream = fs.createWriteStream(OUTPUT_FILE_NAME, { flags: "a" });
    curlStrings.forEach((str) => {
      stream.write(str + "\n");
    });
    stream.write("echo ;");
    stream.write("echo 🎉 Finished curl scripts with graphql mutate statements");
    stream.end();
    console.log(`Wrote ${OUTPUT_FILE_NAME}`);
  });
