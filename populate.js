const csv = require("csv-parser");
const fs = require("fs");
const results = [];

const OUTPUT_FILE_NAME = "populate.sh";

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

const createRelationField = (name, v) =>
  v &&
  `, ${name}: [${v
    .split(",")
    .map((n) => `{ personID: "${n}" }`)
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
    ${createField("dateOfBirth", person.dateOfBirth)}
    ${createField("dateOfDeath", person.dateOfDeath)}
    ${createRelationField("children", person.children)}
    ${createRelationField("nonBioChildren", person.nonBioChildren)}
    ${createRelationField("parents", person.parents)}
    ${createRelationField("nonBioParents", person.nonBioParents)}
    ${createRelationField("physicalRelation", person.physicalRelation)}
    ${createRelationField("otherRelation", person.otherRelation)}
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
    } catch (err) {
      console.log("error emptying: " + err);
    }

    const stream = fs.createWriteStream(OUTPUT_FILE_NAME, { flags: "a" });
    curlStrings.forEach((str) => {
      stream.write(str + "\n\n\n");
    });
    stream.write("echo ;");
    stream.write("echo 🎉 Finished curl scripts with graphql mutate statements");
    stream.end();
    console.log(`Wrote ${OUTPUT_FILE_NAME}`);
  });
