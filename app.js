const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Schema Setup

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'Granite Hill',
// 		image: 'https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137__340.jpg',
// 		description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
// 	},
// 	function(err, campground) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log(campground);
// 		}
// 	}
// );

//  Hard-coded test Data before db setup
// const campgrounds = [
// 	{
// 		name: 'Salmon Creek',
// 		image: 'https://cdn.pixabay.com/photo/2015/07/09/01/59/picnic-table-837221__340.jpg'
// 	},
// 	{
// 		name: 'Granite Hill',
// 		image: 'https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137__340.jpg'
// 	},
// 	{
// 		name: "Mountain Goat's Rest",
// 		image: 'https://cdn.pixabay.com/photo/2018/10/28/16/58/lake-3779280__340.jpg'
// 	}
// ];

app.get('/', (req, res) => {
	res.render('landing');
});

// INDEX - show all campgrounds
app.get('/campgrounds', (req, res) => {
	// res.render('campgrounds', { campgrounds: campgrounds }); // test using hard-coded data
	// Get all campgrounds from database
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { campgrounds: allCampgrounds });
		}
	});
});

// CREATE - add new campground to DB
app.post('/campgrounds', (req, res) => {
	// get date from form and add to campground array
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let newCampground = { name: name, image: image, description: desc };
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});
	// campgrounds.push(newCampground); // push to array for test with dummy data
});

// NEW - show form to create new campground
app.get('/campgrounds/new', (req, res) => {
	res.render('new');
});

// The id route needs to come after the "new" route. Otherwise, it will treat "new" as an id
// SHOW - shows more info abotu one campground
app.get('/campgrounds/:id', (req, res) => {
	// find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground) {
		if (err) {
			console.log(err);
		} else {
			//  render show template with that campground
			res.render('show', { campground: foundCampground });
		}
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.
