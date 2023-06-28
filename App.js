	//Question -2


	SELECT c.customerId, c.name, GROUP_CONCAT(s.subjectName ORDER BY s.subjectName ASC SEPARATOR ', ') AS subjects
	FROM customers AS c
	JOIN subject_student_mapping AS m ON c.customerId = m.customerId
	JOIN subjects AS s ON m.subjectId = s.subjectId
	GROUP BY c.customerId, c.name;

	//question-3

	const sqlite3 = require('sqlite3');

	const customers = [
	  {
		email: 'anurag11@yopmail.com',
		name: 'anurag'
	  },
	  {
		email: 'sameer11@yopmail.com',
		name: 'sameer'
	  },
	  {
		email: 'ravi11@yopmail.com',
		name: 'ravi'
	  },
	  {
		email: 'akash11@yopmail.com',
		name: 'akash'
	  },
	  {
		email: 'anjali11@yopmail.com',
		name: 'anjali'
	  },
	  {
		email: 'santosh11@yopmail.com',
		name: 'santosh'
	  }
	];

	// Create SQLite database connection
	const db = new sqlite3.Database(':memory:');

	// Function to insert customers
	const insertCustomers = () => {
	  db.serialize(() => {
		// Create customers table if it doesn't exist
		db.run(`
		  CREATE TABLE IF NOT EXISTS customers (
			customerId INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			email TEXT UNIQUE
		  )
		`);

		// Prepare insert statement
		const insertStmt = db.prepare('INSERT OR REPLACE INTO customers (name, email) VALUES (?, ?)');

		// Insert customers into the table
		for (const customer of customers) {
		  insertStmt.run(customer.name, customer.email);
		}

		// Finalize the insert statement
		insertStmt.finalize();

		// Retrieve and print the inserted data
		db.all('SELECT customerId, name, email FROM customers', (err, rows) => {
		  if (err) {
			console.error('Error retrieving data:', err);
		  } else {
			console.log('customerId  name       email');
			console.log('-------------------------------');
			for (const row of rows) {
			  console.log(`${row.customerId}          ${row.name}    ${row.email}`);
			}
		  }
		});
	  });
	};

	// Call the function to insert customers
	insertCustomers();


	//question-4

	const person = {
	  id: 2,
	  gender: 'male'
	};

	const student = {
	  name: "ravi",
	  email: "ravi11@yopmail.com"
	};

	const combinedObject = {
	  ...person,
	  ...student
	};

	console.log(combinedObject);

	//Question -5
	const request = require('request');
	const util = require('util');

	// Promisify the getGoogleHomePage function
	const getGoogleHomePagePromise = util.promisify(getGoogleHomePage);

	function getGoogleHomePage() {
	  return new Promise((resolve, reject) => {
		request('http://www.google.com', function (error, response, body) {
		  if (error) {
			console.error('error:', error);
			reject(error);
		  } else {
			console.log('statusCode:', response && response.statusCode);
			console.log('body:', body);
			resolve(body);
		  }
		});
	  });
	}

	// Call the promisified function like a Promise
	getGoogleHomePagePromise()
	  .then(result => {
		console.log("RESULT==>", result);
	  })
	  .catch(error => {
		console.error("ERROR==>", error);
	  });

	  //question -6 

	  const request = require('request');
	const util = require('util');

	// Promisify the getGoogleHomePage function
	const getGoogleHomePagePromise = util.promisify(getGoogleHomePage);

	function getGoogleHomePage() {
	  return new Promise((resolve, reject) => {
		request('http://www.google.com', function (error, response, body) {
		  if (error) {
			console.error('error:', error);
			reject(error);
		  } else {
			console.log('statusCode:', response && response.statusCode);
			console.log('body:', body);
			resolve(body);
		  }
		});
	  });
	}

	// Call the promisified function like a Promise
	getGoogleHomePagePromise()
	  .then(result => {
		console.log("RESULT==>", result);
	  })
	  .catch(error => {
		console.error("ERROR==>", error);
	  });