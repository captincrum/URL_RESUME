// Variables
var
COLS      = 30, // Columns
ROWS      = 30, // Rows
EMPTY     = 0,  // Empty Cell
SNAKE     = 1,  // Snake
FOOD      = 2,  // Food
LEFT      = 0,  // Left key
UP        = 1,  // Up key
RIGHT     = 2,  // Right key
DOWN      = 3,  // Down key
KEY_LEFT  = 37, // Key codes
KEY_UP    = 38, // Key codes
KEY_RIGHT = 39, // Key codes
KEY_DOWN  = 40, // Key codes
// Objects
canvas,	        // Canvas
ctx,	        // Canvas render
keyCode,        // Key inputs
frames,         // Frames per second
score;	        // Player score

// Create game area
grid = {
	width: null,  // Columns
	height: null, // Rows
	_grid: null,  // Array

	// Initiation with direction(d), columns(c) and rows(r)
	init: function(d, c, r) {
		this.width = c;  // Columns width
		this.height = r; // Row height
        this._grid = []; // Empty array containing the grid

        // Create x grid
		for (var x=0; x < c; x++) {
			this._grid.push([]); // Push snake into empty grid

            // Create y grid
            for (var y=0; y < r; y++) {
                this._grid[x].push(d);
            }
		}
	},

    // Set coordinates for x and y position
	set: function(val, x, y) {
		this._grid[x][y] = val;

	},

    // Get x and y coordinates
	get: function(x, y) {
		return this._grid[x][y];

	}

}

// Create snake
snake = {
	direction: null,        // Snake direction
	last: null,		        // Last element in queue
	_queue: null,	        // Queue array

    // Set snake start position
	init: function(d, x, y) {
		this.direction = d; // Direction set to d
		this._queue = [];   // Empty array for grid
		this.insert(x, y);  // Insert x and y position
	},

    // Adds queue using x and y position
	insert: function(x, y) {
		this._queue.unshift({x:x, y:y}); // Insert in beginning of array
		this.last = this._queue[0];
	},

    // Remove and return element to queue
	remove: function() {
		return this._queue.pop(); // Returns last element of array

	}
};

// Create and place food
function setFood() {
	var empty = []; // All empty places in the grid

	// Find all empty cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			if (grid.get(x, y) === EMPTY) {
				empty.push({x:x, y:y});
			}
		}
	}

	var randpos = empty[Math.round(Math.random()*(empty.length - 1))]; // Pick random empty cell
	grid.set(FOOD, randpos.x, randpos.y);                              // Create food
}

// Call all functions used
function main() {
	canvas = document.createElement("canvas");  // Create canvas
	canvas.width = COLS*20;                     // Canvas width
	canvas.height = ROWS*20;                    // Canvas height
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);          // Adds canvas element to body of document
	ctx.font = "16px sans-serif";               // Font style
	frames   = 0;
	keyCode  = {};

    // Key down action
	document.addEventListener("keydown", function(e) {
	    e.preventDefault();
		keyCode[e.keyCode] = true;

	});

	// Key up action
	document.addEventListener("keyup", function(e) {
		delete keyCode[e.keyCode];

	});

	init(); // Initiate game
	loop(); // Start game
}

// Reset/initiate game objects
function init() {
	score = 0;
	grid.init(EMPTY, COLS, ROWS);

	var sp = {x:Math.floor(COLS/2), y:ROWS-1}; // Snake start position
	snake.init(UP, sp.x, sp.y);                // Snake start direction
	setFood();
}

// Game loop
function loop() {
    update();
	draw();
	window.requestAnimationFrame(loop, canvas); // Canvas will call loop function when it needs to redraw
}

// Update game area
function update() {
	frames++;

	// Keyboard input
	if (keyCode[KEY_LEFT] && snake.direction !== RIGHT) {snake.direction = LEFT;}
	if (keyCode[KEY_UP] && snake.direction !== DOWN) {snake.direction = UP;}
	if (keyCode[KEY_RIGHT] && snake.direction !== LEFT) {snake.direction = RIGHT;}
	if (keyCode[KEY_DOWN] && snake.direction !== UP) {snake.direction = DOWN;}

	// Update game every 5 frames
	if (frames%5 === 0) {

		// Snakes last coordinates from queue
		var nx = snake.last.x;
		var ny = snake.last.y;

		// Update snake position using current direction
		switch (snake.direction) {
			case LEFT:
				nx--;
				break;
			case UP:
				ny--;
				break;
			case RIGHT:
				nx++;
				break;
			case DOWN:
				ny++;
				break;
		}

		// Check for game over
		if (0 > nx || nx > grid.width-1  ||  0 > ny || ny > grid.height-1 ||  grid.get(nx, ny) === SNAKE) {
		    return init();

		}

		// Checks new position of snake == food
		if (grid.get(nx, ny) === FOOD) {
			score++;                         // Increase score
			setFood();                       // Reset food
		} else {
			var tail = snake.remove();       // Removes tail (first item)
			grid.set(EMPTY, tail.x, tail.y); // Removes identifier grid
		}

		// Snake identifier created at new position and queued
		grid.set(SNAKE, nx, ny);
		snake.insert(nx, ny);
	}

}

// Render grid to canvas
function draw() {
	var tw = canvas.width/grid.width;    // Calculate width set from style.css
	var th = canvas.height/grid.height;  // Calculate height set from style.css

    // Loop through entire grid to draw cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			// Depending on the identifier of each cell sets certain fillstyle defined below.
			switch (grid.get(x, y)) {
				case EMPTY:
					ctx.fillStyle = "black";
					break;
				case SNAKE:
					ctx.fillStyle = "green";
					break;
				case FOOD:
					ctx.fillStyle = "red";
					break;
			}
			ctx.fillRect(x*tw, y*th, tw, th);
		}
	}

	ctx.fillStyle = "white"; ctx.fillText("SCORE: " + score, 10, canvas.height-10); // Text and text color
}

// Start game
main();