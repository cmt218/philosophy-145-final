var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor (0xffffff, 1);
document.body.appendChild( renderer.domElement );

var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 1, 1, 1 );
scene.add( light );

var controls = new THREE.OrbitControls( camera );
var spinner = null;
var numspinner = 100;
var spinners = [];

// var objectLoader = new THREE.ObjectLoader();
// objectLoader.load("assets/FidgetSpinner.json", function ( obj ) {
// spinner = obj;
// spinner.rotation.x += 0.5;
// spinner.castShadow = true;
// spinner.receiveShadow = false;
// scene.add( obj );
// } );

var objectLoader = new THREE.ObjectLoader();
objectLoader.load("assets/FidgetSpinner.json", function ( obj ) {
spinner = obj;
spinner.rotation.x += 0.5;
for ( var i = 0; i < numspinner; i ++ ) {
	var mesh = obj.clone();
	mesh.position.x = 400 * ( 0.5 - Math.random() );
	mesh.position.y = 400 * ( 0.5 - Math.random() ) + 25;
	mesh.position.z = 400 * ( 0.5 - Math.random() );
	mesh.rotation.y = 3.14 * ( 0.5 - Math.random() );
	mesh.rotation.x = 3.14 * ( 0.5 - Math.random() );
	mesh.matrixAutoUpdate = false;
	mesh.updateMatrix();
	spinners[i] = mesh;
	scene.add( mesh );
	//spinners.push[mesh];
	
}

scene.add( obj );
} );

camera.position.z = 5;
controls.autoRotate = true;
controls.rotateSpeed = 2.0;

function animate() {
	requestAnimationFrame( animate );
	if(spinner){
		spinner.rotation.y+=spinspeed;
	}
	
	controls.update();
	renderer.render( scene, camera );
}

animate();

var spinspeed = 0.00;

function increasespeed(){
	spinspeed += 0.05;
}

function decreasespeed(){
	spinspeed -= 0.05;
}