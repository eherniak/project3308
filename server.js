const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');
const qs = require('query-string');

// database configuration
const dbConfig = {
  host: 'db',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then(obj => {
    console.log('Database connection successful'); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('ERROR:', error.message || error);
  });


app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(
  session({
    secret: 'XASDASDA',
    saveUninitialized: true,
    resave: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) =>{
  res.render('./pages/main.ejs');
});

app.get('/home', (req, res) =>{
  res.render('./pages/main.ejs');
});


app.post('/get_feed', async function(req, res) {
  var artist =  req.body.artist;

  if(artist)
       // var url = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;

              var artistInfo = await axios({
                                           url: `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`,
                                             method: 'GET',
                                             dataType:'json',
                                           })
                                                     var name = artistInfo.data.artists[0].strArtist;
var image = artistInfo.data.artists[0].strArtistThumb;
var year = artistInfo.data.artists[0].intFormedYear;
var genre = artistInfo.data.artists[0].strGenre;
var bio = artistInfo.data.artists[0].strBiographyEN;
                                                    res.render('pages/discover', {
                                                      name: name,
                                                      image:image,
                                                      year:year,
                                                      genre:genre,
                                                      bio:bio,
                                                    });


              //await console.log(artistInfo.data.artists[0].strArtist);
             // var name = artistInfo.data.artists[0].strArtist;
             // console.log(name);




});


app.post('/get_review', function(req, res) {
  var review =  req.body.review;

  var post_query = "INSERT INTO reviews (review, time, artist) VALUES ($1, $2, $3);";

  if(review) {
          res.render('./pages/reviews.ejs', {
            title: "Reviews",
            items,
            error: false,
            message: ''
          })
      }
      )
      .catch(error => {
        console.log(error);
      });

});






app.listen(3000)
console.log('listening on port 3000')
