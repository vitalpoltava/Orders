var fs = require('fs');
var express = require('express');
var app = module.exports = express();
var obj = {};
var arr = [];

var food = ['Pizza', 'Burger','Asiatisch', 'Sushi', 'Indisch', 'Mediterran',
'Orientalisch', 'Gourmet', 'International'];

function rand_range(from, to, mantissa) {
	mantissa = mantissa || 0;
	return (Math.random()*(to-from+1)+from).toFixed(mantissa);
}

var winner = rand_range(0, food.length-1);

function get_food_index() {
    if (Math.random() > 0.3) {
        return rand_range(0, food.length-1);
    }
    else 
    	return winner;
}

var i = 0, timer;
function generateOrders() {
    clearTimeout(timer);
    var name = food[get_food_index()],
        geo_lat = rand_range(45, 52, 5), geo_long = rand_range(5, 30, 5),
        price = rand_range(1, 100);
    obj = { id: i, name: name, geo_lat: geo_lat, geo_long: geo_long, price: price };
    arr.push(obj);
    i++;
    timer = setTimeout(generateOrders, 2000);
};

// start generating orders
generateOrders();

// config stuff
app.use(express.compress())
app.use(express.favicon())
app.use(express.cookieParser())
app.use(express.bodyParser())
app.use(app.router) // prioritize routes over public folder
app.use(express.static(__dirname + '/orders'));

app.get('/api/list.json', function(req, res){
    res.send(JSON.stringify(arr));
});

console.log('Listening at 3000...')
app.listen(3000);