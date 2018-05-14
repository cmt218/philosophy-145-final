// Setup boiler plate
var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
var renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
renderer.setClearColor (0xa8a3a5, 1);
document.body.appendChild(renderer.domElement);

// Reference navigation panes and hide them initially
var preloader = document.getElementById('preloader');
var spinnertext = document.getElementById('spinner_text');
var spinnertexture = document.getElementById('spinner_texture');
var welcomenav = document.getElementById('welcome');
var pluginnav = document.getElementById('plugin');
var notpluginnav = document.getElementById('notplugin');
hideNavs();

// Camera controls and loaders
var controls = new THREE.OrbitControls( camera );
var objmanager = new THREE.LoadingManager();
var texmanager = new THREE.LoadingManager();
var objectLoader = new THREE.ObjectLoader(objmanager);
var textureLoader = new THREE.TextureLoader(texmanager);

// Setup light
var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 0, 1 );
scene.add( light );

// Object reference variables
var brain = null;
var question = null;

var rotationSpeed = 0;

welcome();
animate();

// Animation function
function animate() { 
	requestAnimationFrame( animate ); 

	if(brain) {
		brain.rotation.y += rotationSpeed;
	}
	if(question){
		question.rotation.y += rotationSpeed;
	}
	
	controls.update();

	renderer.render( scene, camera ); 
} 



// Intro scene
function welcome() {

	// Reset camera
	camera.position.set(0, 0, 1.5);
	
	// Show welcome nav
	hideNavs();
	welcomenav.style.display = "block";

	// Clear objects from previous scene
	hideObjs();
	
	// Load in brain model
	if(!brain){
		objectLoader.load("assets/brain.json", function ( obj ) {
			brain = obj;
			brain.scale.set(5,5,5);
			brain.position.y = -0.5;
			scene.add(brain);
		});
	}

	// Load in question mark model
	if(!question) {
		objectLoader.load("assets/questionmark.json", function ( obj ) {
			question = obj;
			question.scale.set(0.3, 0.3, 0.3);
			question.position.y = 0.1;
			scene.add(question);
		});
	}

	// Set rotation speed
	rotationSpeed = 0.015;
}

// Choose to enter machine scene
function enterMachine() {

	// Reset camera
	camera.position.set(0, 0, 1.5);

	// Show enter machine nav
	hideNavs();
	pluginnav.style.display = "block";

	// Clear objects from previous scene
	hideObjs();
	
	// Load in brain model
	if(!brain){
		// Load a texture and obj
		var texture = textureLoader.load( "assets/emtexture3.jpg" );
		objectLoader.load("assets/brain.json", function ( obj ) {
			brain = obj;
			brain.scale.set(5,5,5);
			brain.position.y = -0.5;
			// Set texture for appropriate child of brain
			brain.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.map = texture;
				}
			});
			scene.add(brain);
		});
	}

	// Set rotation speed
	rotationSpeed = 0.015;
}

// Choose not to enter scene
function dontEnter() {

	// Reset camera
	camera.position.set(0, 0, 1.5);

	// Show not enter machine nav
	hideNavs();
	notpluginnav.style.display = "block";

	// Clear objects from previous scene
	hideObjs();
	
	// Load in brain model
	if(!brain){
		// Load a texture and obj
		var texture = textureLoader.load( "assets/braintexture.jpg" );
		objectLoader.load("assets/brain.json", function ( obj ) {
			brain = obj;
			brain.scale.set(5,5,5);
			brain.position.y = -0.5;
			// Set texture for appropriate child of brain
			brain.traverse( function ( child ) {
				if ( child instanceof THREE.Mesh ) {
					child.material.map = texture;
				}
			});
			scene.add(brain);
		});
	}

	// Set rotation speed
	rotationSpeed = 0.015;
}

function hideNavs() {
	welcomenav.style.display = "none";
	pluginnav.style.display = "none";
	notpluginnav.style.display = "none";
}

function hideObjs() {
	scene.remove(brain);
	scene.remove(question);

	brain = null;
	question = null;
}


// Object loading progress
objmanager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	preloader.style.display = "block";
	spinnertext.textContent = 'Started loading object: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.';
};

objmanager.onLoad = function ( ) {
	preloader.style.display = "none";
	console.log( 'Loading complete!');
};

objmanager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	preloader.style.display = "block";
	spinnertext.textContent = 'Loading object: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.';
};

objmanager.onError = function ( url ) {
	preloader.style.display = "none";
	console.log( 'There was an error loading ' + url );
};

// Texture loading progress
texmanager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	preloader.style.display = "block";
	spinnertexture.textContent = 'Started loading texture: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.';
};

texmanager.onLoad = function ( ) {
	console.log( 'Loading complete!');
};

texmanager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	preloader.style.display = "block";
	spinnertexture.textContent = 'Loading texture: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.';
};

texmanager.onError = function ( url ) {
	preloader.style.display = "none";
	console.log( 'There was an error loading ' + url );
};