var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
var renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
renderer.setClearColor (0xffffff, 1);
document.body.appendChild(renderer.domElement);
var info = document.getElementById('info');

var controls = new THREE.OrbitControls( camera );
var objectLoader = new THREE.ObjectLoader();

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
	
	// Colors
	var color = 0xa8a3a5;
	var htmlcolor = "#a8a3a5";

	// Setup BG color and light
	renderer.setClearColor (color, 1);
	var light = new THREE.PointLight( 0xce4886, 1, 100 );
	light.position.set( 0, 0, 1 );
	scene.add( light );

	// Load in brain model
	objectLoader.load("assets/brain.json", function ( obj ) {
		brain = obj;
		brain.scale.set(3,3,3);
		brain.position.y = -0.25;
		scene.add(brain);
	});
}