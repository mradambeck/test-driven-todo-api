// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

var idAssignment = 4;

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */

 var q = req.query.q;
 var response = [];
 console.log(q);
 todos.forEach(function (el, i, arr){
  //  var td = todos[i];
   if (q === el.task){
     response.push(el);
   }
 });
  res.send({todos: response});
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
 res.send({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
 var newTodoBody = req.body;
 var newTodoID = idAssignment;

 todos[newTodoID] = {
   _id: newTodoID,
   task: newTodoBody.task,
   description: newTodoBody.description
 };

 res.send(todos[newTodoID]);
 idAssignment ++;
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
 var id = req.params.id;
 var response;
 todos.forEach(function (el, i, arr){
     if (parseInt(id) === el._id){
       response = el;
     }
   });
 res.send(response);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */

   var todoBody = req.body;
   var todoID = parseInt(req.params.id);

   todos[todoID] = {
     _id: todoID,
     task: todoBody.task,
     description: todoBody.description
   };

   res.send(todos[todoID]);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
 var id = req.params.id;
 var response;
 todos.forEach(function (el, i, arr){
     if (parseInt(id) === el._id){
       response = el;
       todos.splice(i, 1);
     }
   });

 res.json(response);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
