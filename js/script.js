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

welcome();
animate();

camera.position.z = 1;

// Animation function
function animate() { 
	requestAnimationFrame( animate ); 

	if(brain) {
		brain.rotation.y += 0.02;
	}
	
	controls.update();

	renderer.render( scene, camera ); 
} 



// Displays spinning brain intro
function welcome() {

	// Setup light
	if(!light){
		light = new THREE.PointLight( 0xce4886, 1, 100 );
		light.position.set( 0, 0, 1 );
		scene.add( light );
	}
	
	// Show welcome nav
	hideNavs();
	welcomenav.style.display = "block";
	
	// Load in brain model
	if(!brain){
		objectLoader.load("assets/brain.json", function ( obj ) {
			brain = obj;
			brain.scale.set(3,3,3);
			brain.position.y = -0.25;
			scene.add(brain);
		});
	}
}

function enterMachine() {

	// Show enter machine nav
	hideNavs();
	pluginnav.style.display = "block";

}

function dontEnter() {

	// Show not enter machine nav
	hideNavs();
	notpluginnav.style.display = "block";
}

function hideNavs() {
	welcomenav.style.display = "none";
	pluginnav.style.display = "none";
	notpluginnav.style.display = "none";
}

