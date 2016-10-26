const name = process.argv[2];

const client = require('./db')

client.connect(function connectionSuccessful(err, result) {
  if (err) {
    throw err;
  }
   client.query(`SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name = '${name}' OR last_name = '${name}';`, (err, result) => {
    if (err) {
      throw err;
    }
    console.log("Searching...")
    console.log("Found " + result.rows.length + " person(s) by the name '" + name + "':");
    result.rows.forEach(function(person) {
      console.log("- " + person.id + ": " + person.first_name + " " + person.last_name + ", born '" + new Date(person.birthdate).toDateString() + "'")
    })
    client.end();
  });
});
//   client.query("SELECT name")
// })