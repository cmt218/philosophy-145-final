var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
var renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
renderer.setClearColor (0xa8a3a5, 1);
document.body.appendChild(renderer.domElement);

// Reference navigation panes and hide them initially
var welcomenav = document.getElementById('welcome');
var pluginnav = document.getElementById('plugin');
var notpluginnav = document.getElementById('notplugin');
hideNavs();

var controls = new THREE.OrbitControls( camera );
var objectLoader = new THREE.ObjectLoader();

var light = null;
var brain = null;
var question = null;

var rotationSpeed = 0;

welcome();
animate();

camera.position.z = 1.5;

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



// Displays spinning brain intro
function welcome() {

	// Setup light
	if(light){
		scene.remove(light);
		light = null;
	}
	light = new THREE.PointLight( 0xffffff, 1, 100 );
	light.position.set( 0, 0, 1 );
	scene.add( light );
	
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
			brain.position.y = -0.75;
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

function enterMachine() {

	// Show enter machine nav
	hideNavs();
	pluginnav.style.display = "block";

}

function dontEnter() {

	

	// Setup light
	if(light){
		scene.remove(light);
		light = null;
	}
	light = new THREE.PointLight( 0xffffff, 1, 100 );
	light.position.set( 0, 0, 1 );
	scene.add( light );

	// Show not enter machine nav
	hideNavs();
	notpluginnav.style.display = "block";

	// Clear objects from previous scene
	hideObjs();
	
	// Load in brain model
	if(!brain){
		// Load a texture and obj
		var texture = new THREE.TextureLoader().load( "assets/braintexture.jpg" );
		objectLoader.load("assets/brain.json", function ( obj ) {
			brain = obj;
			brain.scale.set(5,5,5);
			brain.position.y = -0.75;
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

