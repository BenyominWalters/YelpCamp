const express = require('express');
const app = express();
const port = 3000;

const campgrounds = [
	{
		name: 'Salmon Creek',
		image: 'https://pixabay.com/get/57e1d3404e53a514f6da8c7dda793f7f1636dfe2564c704c732c79d59245c65f_340.jpg'
	},
	{
		name: 'Granite Hill',
		image: 'https://pixabay.com/get/55e4d5454b51ab14f6da8c7dda793f7f1636dfe2564c704c732c79d59245c65f_340.jpg'
	},
	{
		name: "Mountain Goat's Rest",
		image: 'https://pixabay.com/get/54e5d4414356a814f6da8c7dda793f7f1636dfe2564c704c732c79d59245c65f_340.jpg'
	}
];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('landing');
});

app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', { campgrounds: campgrounds });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.
