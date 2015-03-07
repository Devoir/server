var sqlFixtures = require('sql-fixtures');

var dbConfig = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'test',
    password: 't3stm3',
    database: 'devoirtest',
    port: 5432
  }
};

var dateString = '2015/01/01';

var dataSpec = {

	users: [
		{
			email: 'testa@email.com',
			display_name: 'A Test'
		},
		{
			email: 'testb@email.com',
			display_name: 'Bert Test'
		}
	],

	courses: [
		{
			name: 'CS 428',
			color: '#cccccc',
			visible: true,
			ical_feed_url: "http://ical.com",
			user_id: 'users:0'
		},
		{
			name: 'CS 498R',
			color: '#cccccc',
			visible: false,
			ical_feed_url: "http://ical.com",
			user_id: 'users:0'
		},
		{
			name: 'CS 5000',
			color: '#cccccc',
			visible: false,
			ical_feed_url: "http://ical.com",
			user_id: 'users:1'
		}
	],

	tasks: [
		{
			name: 'homework1',
			description: 'boring stuff',
			start_date: dateString,
			end_date: dateString,
			complete: false,
			visible: false,
			user_last_updated: dateString,
			ical_last_updated: dateString,
			course_id: 'courses:0'
		},
		{
			name: 'homework2',
			description: 'boring stuff',
			start_date: dateString,
			end_date: dateString,
			complete: true,
			visible: true,
			user_last_updated: dateString,
			ical_last_updated: dateString,
			course_id: 'courses:1'
		},
		{
			name: 'homework3',
			description: 'boring stuff',
			start_date: dateString,
			end_date: dateString,
			complete: true,
			visible: false,
			user_last_updated: dateString,
			ical_last_updated: dateString,
			course_id: 'courses:2'
		}
	]
};

sqlFixtures.create(dbConfig, dataSpec, function(err, result) {
	//Do nothing
});