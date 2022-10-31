var map = [], helper = false;
var l = (1+Math.sqrt(5))/2;

var controls;
/*************************************************
*		          UPDATE/DISPLAY CICLE               *
*************************************************/
var scene, renderer;

function createScene() {
  'use strict';
  scene = new THREE.Scene();
  //scene.add(new THREE.AxesHelper(30));
}

function render() {
  'use strict';
  renderer.render(scene, cameras.mainCamera);
}

function animate() {
  'use strict';
  //controls.update();
  render();
  requestAnimationFrame(animate);
}


/*************************************************
*				        RESIZE FUNCTION                  *
*************************************************/
resizeWindow = function(){
		console.log(cameras.mainCamera);
		'use strict';
		renderer.setSize(window.innerWidth, window.innerHeight);
		if(cameras.currentCamera == 1){
			if(window.innerHeight > 0 && window.innerWidth > 0)
				cameras.mainCamera.aspect = window.innerWidth / window.innerHeight;
			cameras.mainCamera.updateProjectionMatrix();
		} else {
			if(window.innerHeight > 0 && window.innerWidth > 0) {
				let newAspect = window.innerWidth / window.innerHeight;
				let changeAspect = cameras.aspectRatio / newAspect;
				let newSize = cameras.viewSizeOrt * changeAspect;
				cameras.mainCamera.left = -newAspect * newSize / 2;
				cameras.mainCamera.right = newAspect * newSize  / 2;
				cameras.mainCamera.top = newSize / 2;
				cameras.mainCamera.bottom = -newSize / 2;
				cameras.mainCamera.updateProjectionMatrix();
			}
		}
};


/*************************************************
*					           ROOM                        *
*************************************************/
var room = new function() {

	this.mainObject = new THREE.Object3D();

	this.floor = {
		geometry: new THREE.BoxGeometry(60,3,30,64,64,64),
		material: new THREE.MeshPhongMaterial({color: 0xFEC3EA, wireframe: false, side: THREE.DoubleSide}),
		position: { x: 0, y: 0, z: -5 }
	}

	this.wall = {
		geometry: new THREE.BoxGeometry(60,21,3,64,64,64),
		material: new THREE.MeshPhongMaterial({color: 0xFC99DB, wireframe: false, side:THREE.DoubleSide}),
		position: { x: 0, y: 12, z: -18.5 }
	}

	this.floorMesh = new THREE.Mesh(this.floor.geometry, this.floor.material);
	this.floorMesh.materials = [new THREE.MeshPhongMaterial( {color: 0xFEC3EA, wireframe: false, side: THREE.DoubleSide}),
	    		   new THREE.MeshLambertMaterial( {color: 0xFEC3EA, wireframe: false, side: THREE.DoubleSide}),
	    		   new THREE.MeshBasicMaterial(  {color:0xFEC3EA, wireframe: false, side: THREE.DoubleSide})];

	this.wallMesh = new THREE.Mesh(this.wall.geometry, this.wall.material);
	this.wallMesh.materials =  [new THREE.MeshPhongMaterial( {color: 0xFC99DB, wireframe: false, side: THREE.DoubleSide}),
								new THREE.MeshLambertMaterial( {color: 0xFC99DB, wireframe:false, side: THREE.DoubleSide}),
								new THREE.MeshBasicMaterial( {color: 0xFC99DB, wireframe: false, side: THREE.DoubleSide})];

	this.setup = function(){

		this.floorMesh.position.x = this.floor.position.x;
		this.floorMesh.position.y = this.floor.position.y;
		this.floorMesh.position.z = this.floor.position.z;

		this.wallMesh.position.x = this.wall.position.x;
		this.wallMesh.position.y = this.wall.position.y;
		this.wallMesh.position.z = this.wall.position.z;

		this.mainObject.add(this.floorMesh);
		this.mainObject.add(this.wallMesh);
		scene.add(this.mainObject);
	}
}


/*************************************************
*				          ILLUSION ART                   *
*************************************************/
var painting = new function() {

	this.mainObject = new THREE.Object3D();
  	this.frame = {
    	geometry: new THREE.PlaneGeometry(28.5, 13.5, 32),
    	material: new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide}),	
		position: new THREE.Vector3(10,11,-16.9)};

	this.canvas = {
		geometry: new THREE.PlaneGeometry( 27, 12, 32 ),
		material: new THREE.MeshPhongMaterial( {color: 0x000000, side: THREE.DoubleSide}),
		position: new THREE.Vector3(10,11,-16.8)};

	this.verticalRec = {
		geometry: new THREE.PlaneGeometry( 0.35, 12, 32),
		material: new THREE.MeshPhongMaterial( {color: 0x747070, side: THREE.DoubleSide}),
		position: new THREE.Vector3(0,11,-16.79),
		offset: 1.5,
		posinit: -2.75

	};

	this.horizontalRec = {
		geometry: new THREE.PlaneGeometry( 27, 0.35, 32 ),
		material: new THREE.MeshPhongMaterial({color: 0x747070, side: THREE.DoubleSide}),
		position: new THREE.Vector3(10,16,-16.79),
		offset: 1.5,
		posinit: 5.6
	};

	this.whiteBalls = {
		geometry: new THREE.CircleGeometry( 0.22, 32 ),
		material: new THREE.MeshPhongMaterial( {color: 0xffffff}),
		position: new THREE.Vector3(-2.75,5.6,-16.78),
		offset: 1.5
	};

	this.canvasMesh = new THREE.Mesh(this.canvas.geometry,this.canvas.material);
	this.canvasMesh.materials = [new THREE.MeshPhongMaterial( {color:0x000000, side:THREE.DoubleSide}),
					new THREE.MeshLambertMaterial( {color:0x000000, side: THREE.DoubleSide}), 
					new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide})];

	this.vertRmesh = new Array(18).fill().map(() => (new THREE.Mesh(this.verticalRec.geometry,this.verticalRec.material)));

	this.horzRmesh = new Array(8).fill().map(() => (new THREE.Mesh(this.horizontalRec.geometry,this.horizontalRec.material)));

	this.ballsMesh = new Array(144).fill().map(() => (new THREE.Mesh(this.whiteBalls.geometry,this.whiteBalls.material)));

	this.setup = function(){

		this.canvasMesh.position.set(this.canvas.position.x,this.canvas.position.y,this.canvas.position.z);
		this.mainObject.add(this.canvasMesh);

		for(let i=0; i < this.vertRmesh.length; i++){
			this.vertRmesh[i].position.x = i == 0 ? this.verticalRec.posinit : this.vertRmesh[i-1].position.x + this.verticalRec.offset;
			this.vertRmesh[i].position.y = this.verticalRec.position.y;
			this.vertRmesh[i].position.z = this.verticalRec.position.z;
			this.vertRmesh[i].materials = [ new THREE.MeshPhongMaterial( {color:0x747070, side:THREE.DoubleSide}),
											new THREE.MeshLambertMaterial( {color:0x747070, side: THREE.DoubleSide}), 
											new THREE.MeshBasicMaterial( {color: 0x747070, side: THREE.DoubleSide})];
			this.mainObject.add(this.vertRmesh[i]);
		}

		for(let i=0; i < this.horzRmesh.length; i++){
			this.horzRmesh[i].position.y = i == 0 ? this.horizontalRec.posinit : this.horzRmesh[i-1].position.y + this.horizontalRec.offset;
			this.horzRmesh[i].position.x = this.horizontalRec.position.x;
			this.horzRmesh[i].position.z = this.horizontalRec.position.z; 
			this.horzRmesh[i].materials = [new THREE.MeshPhongMaterial( {color:0x747070 , side:THREE.DoubleSide}),
										   new THREE.MeshLambertMaterial( {color:0x747070, side: THREE.DoubleSide}), 	
										   new THREE.MeshBasicMaterial( {color: 0x747070, side: THREE.DoubleSide} )];
			this.mainObject.add(this.horzRmesh[i]);
		}

		let index = 0;
		for(let i = 0; i < this.horzRmesh.length; i++){
			for(let x = 0; x < this.vertRmesh.length; x++){
				this.ballsMesh[index].position.x = this.whiteBalls.position.x + x * this.whiteBalls.offset;
				this.ballsMesh[index].position.y = this.whiteBalls.position.y + (i%this.horzRmesh.length) * this.whiteBalls.offset;
				this.ballsMesh[index].position.z = this.whiteBalls.position.z;
				this.ballsMesh[index].materials = [new THREE.MeshPhongMaterial( {color:0xffffff}),
												   new THREE.MeshLambertMaterial( {color:0xffffff}), 
	    										   new THREE.MeshBasicMaterial( { color: 0xffffff} )];
				this.mainObject.add(this.ballsMesh[index]);
				index++;
			}
		}
    this.frameMesh = new THREE.Mesh(this.frame.geometry, this.frame.material);
    this.frameMesh.materials = [new THREE.MeshPhongMaterial( {color:0xffffff, side:THREE.DoubleSide}),
								new THREE.MeshLambertMaterial( {color:0xffffff, side: THREE.DoubleSide}), 
								new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide})];
    this.frameMesh.position.set(this.frame.position.x, this.frame.position.y, this.frame.position.z);
    this.mainObject.add(this.frameMesh);
		scene.add(this.mainObject);
	};

};


/*************************************************
*				           SCULPTURE                     *
*************************************************/
var escultura = new function() {

	this.mainObject = new THREE.Object3D();

	this.icosaedroObject = new THREE.Object3D();

	this.pedestal = {
		geometry: new THREE.CylinderGeometry(3,3,7,64),
		material: new THREE.MeshPhongMaterial( {color: 0x545050, wireframe:false, side: THREE.DoubleSide}),
		position: { x:-15, y:3, z:-5}
	};

	this.icosaedro = {
		geometry: new THREE.Geometry(),
		material: new THREE.MeshPhongMaterial( {color: 0x5CF9C0, wireframe:false, side: THREE.DoubleSide}),
		position: { x:-15, y:10, z:-5},
		vertexList: [
					new THREE.Vector3(-1, l, 0),
					new THREE.Vector3(1, l, 0),
					new THREE.Vector3(-1, -l, 0),
					new THREE.Vector3(1, -l, 0),
					new THREE.Vector3(0,-1, l),
					new THREE.Vector3(0, 1,l),
					new THREE.Vector3(0,-1,-l),
					new THREE.Vector3(0,1,-l),
					new THREE.Vector3(l,0,-1),
					new THREE.Vector3(l,0,1),
					new THREE.Vector3(-l,0,-1),
					new THREE.Vector3(-l,0,1)
					],
		facesList: [
					new THREE.Face3(0,11,5),
					new THREE.Face3(0,5,1),
					new THREE.Face3(0,1,7),
					new THREE.Face3(0,7,10),
					new THREE.Face3(0,10,11),
					new THREE.Face3(1,5,9),
					new THREE.Face3(5,11,4),
					new THREE.Face3(11,10,2),
					new THREE.Face3(10,7,6),
					new THREE.Face3(7,1,8),
					new THREE.Face3(3,9,4),
					new THREE.Face3(3,4,2),
					new THREE.Face3(3,2,6),
					new THREE.Face3(3,6,8),
					new THREE.Face3(3,8,9),
					new THREE.Face3(4,9,5),
					new THREE.Face3(2,4,11),
					new THREE.Face3(6,2,10),
					new THREE.Face3(8,6,7),
					new THREE.Face3(9,8,1)
					]
	}

	this.pedestalMesh = new THREE.Mesh(this.pedestal.geometry, this.pedestal.material);
	this.pedestalMesh.materials = [new THREE.MeshPhongMaterial( {color: 0x545050, wireframe: false, side: THREE.DoubleSide}),
	    						   new THREE.MeshLambertMaterial({color: 0x545050, wireframe: false, side: THREE.DoubleSide}),
	    						   new THREE.MeshBasicMaterial({color: 0x545050, wireframe: false, side: THREE.DoubleSide})];

	this.icosaedroMesh = new THREE.Mesh(this.icosaedro.geometry,this.icosaedro.material);
	this.icosaedroMesh.materials = [new THREE.MeshPhongMaterial( {color: 0x5CF9C0, wireframe: false, side: THREE.DoubleSide}),
									new THREE.MeshLambertMaterial( {color: 0x5CF9C0, wireframe: false, side: THREE.DoubleSide}),
									new THREE.MeshBasicMaterial({color: 0x5CF9C0, wireframe:false,side: THREE.DoubleSide})];

	this.setup = function(){

		this.pedestalMesh.position.x = this.pedestal.position.x;
		this.pedestalMesh.position.y = this.pedestal.position.y;
		this.pedestalMesh.position.z = this.pedestal.position.z;
		this.mainObject.add(this.pedestalMesh);


		this.icosaedro.vertexList.forEach( vector => vector.setLength(vector.length()*THREE.Math.randFloat(0.75,1)));

		this.icosaedro.geometry.vertices.push(...this.icosaedro.vertexList);
		this.icosaedro.geometry.faces.push(...this.icosaedro.facesList);
		this.icosaedro.geometry.computeFaceNormals();
		this.icosaedro.geometry.computeVertexNormals();

		this.icosaedroObject.add(this.icosaedroMesh);
		this.icosaedroObject.scale.x =  this.icosaedroObject.scale.y =  this.icosaedroObject.scale.z =  2;
		this.icosaedroObject.position.x = this.icosaedro.position.x;
		this.icosaedroObject.position.y = this.icosaedro.position.y;
		this.icosaedroObject.position.z = this.icosaedro.position.z;

		this.mainObject.add(this.icosaedroObject);

		scene.add(this.mainObject);
	}
}


/*************************************************
*				          SPOTLIGHTS                     *
*************************************************/
var spotlights = new function(){
  this.spotlightObj1 = new THREE.Object3D();
  this.spotlightObj2 = new THREE.Object3D();
  this.spotlightObj3 = new THREE.Object3D();
  this.spotlightObj4 = new THREE.Object3D();

  this.lightCircleObj1 = new THREE.Object3D();
  this.lightCircleObj2 = new THREE.Object3D();
  this.lightCircleObj3 = new THREE.Object3D();
  this.lightCircleObj4 = new THREE.Object3D();

  this.spotlight1Elements = {
      geometry: new THREE.CylinderGeometry(0.5, 2, 3, 32),
      material: new THREE.MeshBasicMaterial({color: 0x666666, wireframe: false, side: THREE.DoubleSide}),
      lightGeometry: new THREE.CylinderGeometry(0.5, 1.5, 3, 32),
      lightMaterial: new THREE.MeshBasicMaterial({color: 0xfffbd6, wireframe: false, side: THREE.DoubleSide}),
	  sphereGeo: new THREE.SphereGeometry( 1, 32, 32 ),
	  sphereMaterial: new THREE.MeshBasicMaterial({color: 0x666666, wireframe: false, side: THREE.DoubleSide}),

  }

  this.spotlight2Elements = {
      geometry: new THREE.CylinderGeometry(0.5, 2, 3, 32),
      material: new THREE.MeshBasicMaterial({color: 0x666666, wireframe: false, side: THREE.DoubleSide}),
      lightGeometry: new THREE.CylinderGeometry(0.5, 1.5, 3, 32),
      lightMaterial: new THREE.MeshBasicMaterial({color: 0xfffbd6, wireframe: false, side: THREE.DoubleSide}),
	   sphereGeo: new THREE.SphereGeometry( 1, 32, 32 ),
	  sphereMaterial: new THREE.MeshBasicMaterial({color: 0x666666, wireframe: false, side: THREE.DoubleSide}),
  }

  this.spotlight3Elements = {
      geometry: new THREE.CylinderGeometry(0.5, 2, 3, 32),
      material: new THREE.MeshBasicMaterial({color: 0x666666, wireframe: false, side: THREE.DoubleSide}),
      lightGeometry: new THREE.CylinderGeometry(0.5, 1.5, 3, 32),
      lightMaterial: new THREE.MeshBasicMaterial({color: 0xfffbd6, wireframe: false, side: THREE.DoubleSide}),
	   sphereGeo: new THREE.SphereGeometry( 1, 32, 32 ),
	  sphereMaterial: new THREE.MeshBasicMaterial({color: 0x666666, wireframe: false, side: THREE.DoubleSide}),
  }

  this.spotlight4Elements = {
      geometry: new THREE.CylinderGeometry(0.5, 2, 3, 32),
      material: new THREE.MeshBasicMaterial({color: 0x666666, wireframe: false, side: THREE.DoubleSide}),
      lightGeometry: new THREE.CylinderGeometry(0.5, 1.5, 3, 32),
      lightMaterial: new THREE.MeshBasicMaterial({color: 0xfffbd6, wireframe: false, side: THREE.DoubleSide}),
	   sphereGeo: new THREE.SphereGeometry( 1, 32, 32 ),
	  sphereMaterial: new THREE.MeshBasicMaterial({color: 0x666666, wireframe: false, side: THREE.DoubleSide}),
  }
  
    this.spot1Mesh = new THREE.Mesh(this.spotlight1Elements.geometry, this.spotlight1Elements.material);
    this.circle1Mesh = new THREE.Mesh(this.spotlight1Elements.lightGeometry, this.spotlight1Elements.lightMaterial);
	this.sphere1 = new THREE.Mesh(this.spotlight1Elements.sphereGeo,this.spotlight1Elements.sphereMaterial);

    this.spot2Mesh = new THREE.Mesh(this.spotlight2Elements.geometry, this.spotlight2Elements.material);
    this.circle2Mesh = new THREE.Mesh(this.spotlight2Elements.lightGeometry, this.spotlight2Elements.lightMaterial);
	this.sphere2 = new THREE.Mesh(this.spotlight1Elements.sphereGeo,this.spotlight2Elements.sphereMaterial);
	
    this.spot3Mesh = new THREE.Mesh(this.spotlight3Elements.geometry, this.spotlight3Elements.material);
    this.circle3Mesh = new THREE.Mesh(this.spotlight3Elements.lightGeometry, this.spotlight3Elements.lightMaterial);
	this.sphere3 = new THREE.Mesh(this.spotlight3Elements.sphereGeo,this.spotlight3Elements.sphereMaterial);

    this.spot4Mesh = new THREE.Mesh(this.spotlight4Elements.geometry, this.spotlight4Elements.material);
    this.circle4Mesh = new THREE.Mesh(this.spotlight4Elements.lightGeometry, this.spotlight4Elements.lightMaterial);
	this.sphere4 = new THREE.Mesh(this.spotlight4Elements.sphereGeo,this.spotlight4Elements.sphereMaterial);
  
  this.setup = function(){
  
	
    this.lightCircleObj1.add(this.circle1Mesh);
    this.lightCircleObj1.position.set(26.95, 19.95, -15);
    this.lightCircleObj1.rotateX(-Math.PI/4);
    this.lightCircleObj1.rotateY(-Math.PI/6);
    this.lightCircleObj1.rotateZ(-Math.PI/4);
	this.sphere1.position.set(0,1,0);
	this.lightCircleObj1.add(this.sphere1);
    scene.add(this.lightCircleObj1);

    this.spotlightObj1.add(this.spot1Mesh);
    this.spotlightObj1.position.set(27, 20, -15);
    this.spotlightObj1.rotateX(-Math.PI/4);
    this.spotlightObj1.rotateY(-Math.PI/6);
    this.spotlightObj1.rotateZ(-Math.PI/4);
	
	


    this.lightCircleObj2.add(this.circle2Mesh);
    this.lightCircleObj2.position.set(-26.95, 19.95, -15);
    this.lightCircleObj2.rotateX(-Math.PI/4);
    this.lightCircleObj2.rotateY(Math.PI/6);
    this.lightCircleObj2.rotateZ(Math.PI/4);
	this.sphere2.position.set(0,1,0);
	this.lightCircleObj2.add(this.sphere2);
    scene.add(this.lightCircleObj2);

    this.spotlightObj2.add(this.spot2Mesh);
    this.spotlightObj2.position.set(-27, 20, -15);
    this.spotlightObj2.rotateX(-Math.PI/4);
    this.spotlightObj2.rotateY(Math.PI/6);
    this.spotlightObj2.rotateZ(Math.PI/4);


    this.lightCircleObj3.add(this.circle3Mesh);
    this.lightCircleObj3.position.set(26.95, 19.95, 14.95);
    this.lightCircleObj3.rotateX(Math.PI/3);
    this.lightCircleObj3.rotateY(Math.PI/6);
    this.lightCircleObj3.rotateZ(-Math.PI/4);
		this.sphere3.position.set(0,1,0);
	this.lightCircleObj3.add(this.sphere3);
    scene.add(this.lightCircleObj3);

    this.spotlightObj3.add(this.spot3Mesh);
    this.spotlightObj3.position.set(27, 20, 15);
    this.spotlightObj3.rotateX(Math.PI/3);
    this.spotlightObj3.rotateY(Math.PI/6);
    this.spotlightObj3.rotateZ(-Math.PI/4);


    this.lightCircleObj4.add(this.circle4Mesh);
    this.lightCircleObj4.position.set(-26.95, 19.95, 14.95);
    this.lightCircleObj4.rotateX(Math.PI/3);
    this.lightCircleObj4.rotateY(-Math.PI/6);
    this.lightCircleObj4.rotateZ(Math.PI/4);
		this.sphere4.position.set(0,1,0);
	this.lightCircleObj4.add(this.sphere4);
    scene.add(this.lightCircleObj4);

    this.spotlightObj4.add(this.spot4Mesh);
    this.spotlightObj4.position.set(-27, 20, 15);
    this.spotlightObj4.rotateX(Math.PI/3);
    this.spotlightObj4.rotateY(-Math.PI/6);
    this.spotlightObj4.rotateZ(Math.PI/4);

    scene.add(this.spotlightObj1);
    scene.add(this.spotlightObj2);
    scene.add(this.spotlightObj3);
    scene.add(this.spotlightObj4);
  }
}


/*************************************************
*				            lIGHTING                     *
*************************************************/
var lighting = new function(){
  this.light = new THREE.Object3D();
  this.activeSpotlights = [true,true,true,true]
  this.spotlight1 = new THREE.Object3D();
  this.spotlight2 = new THREE.Object3D();
  this.spotlight3 = new THREE.Object3D();
  this.spotlight4 = new THREE.Object3D();

  this.turnOffDirectionalLight = 0;
  this.turnOffSpotLights = [0, 0, 0, 0];

  this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  this.spotLight1 = new THREE.SpotLight(0xffffff, 1);
  this.spotLight2 = new THREE.SpotLight(0xffffff, 1);
  this.spotLight3 = new THREE.SpotLight(0xffffff, 1);
  this.spotLight4 = new THREE.SpotLight(0xffffff, 1);
  
  this.enabledisableSpotlight = function(num) {
	switch(num) {
		case 1: 
			var res = this.activeSpotlights[num-1] ? scene.remove(this.spotlight1) : scene.add(this.spotlight1);
			spotlights.lightCircleObj1.children[0].material.color.set( this.activeSpotlights[num-1] ? 0x666666 : 0xfffbd6 );
			this.activeSpotlights[num-1] = !this.activeSpotlights[num-1];
			break;
		case 2:
			var res = this.activeSpotlights[num-1] ? scene.remove(this.spotlight2) : scene.add(this.spotlight2);
			spotlights.lightCircleObj2.children[0].material.color.set( this.activeSpotlights[num-1] ? 0x666666 : 0xfffbd6 );
			this.activeSpotlights[num-1] = !this.activeSpotlights[num-1];
			break;
		case 3:
			var res = this.activeSpotlights[num-1] ? scene.remove(this.spotlight3) : scene.add(this.spotlight3);
			spotlights.lightCircleObj3.children[0].material.color.set( this.activeSpotlights[num-1] ? 0x666666 : 0xfffbd6 );
			this.activeSpotlights[num-1] = !this.activeSpotlights[num-1];
			break;
		case 4:
			var res = this.activeSpotlights[num-1] ? scene.remove(this.spotlight4) : scene.add(this.spotlight4);
			spotlights.lightCircleObj4.children[0].material.color.set( this.activeSpotlights[num-1] ? 0x666666 : 0xfffbd6 );
			this.activeSpotlights[num-1] = !this.activeSpotlights[num-1];
			break;
	}
  }

	
  this.setup = function(){
    this.light.add(this.directionalLight);
    this.light.position.set(0, 7, 20);
    this.light.target = room.floorMesh;

    this.spotLight1.castShadow = true;
    this.spotLight1.angle = 0.5;
    this.spotlight1.add(this.spotLight1);
    this.spotlight1.position.set(26, 18, -14.5);

    this.spotLight2.castShadow = true;
    this.spotLight2.angle = 0.5;
    this.spotlight2.add(this.spotLight2);
    this.spotlight2.position.set(-26, 18, -14.5);

    this.spotLight3.castShadow = true;
    this.spotLight3.angle = 0.5;
    this.spotlight3.add(this.spotLight3);
    this.spotlight3.position.set(26, 18, 14.5);

    this.spotLight4.castShadow = true;
    this.spotLight4.angle = 0.5;
    this.spotlight4.add(this.spotLight4);
    this.spotlight4.position.set(-25, 17, 15);

    scene.add(this.light);
    scene.add(this.spotlight1);
    scene.add(this.spotlight2);
    scene.add(this.spotlight3);
    scene.add(this.spotlight4);
  }

}


/*************************************************
*			        ONKEYDOWN/ONKEYUP                  *
*************************************************/
onkeydown = onkeyup = function(e) {
  'use strict';
  e = e || event;
  map[e.keyCode] = e.type == 'keydown';
  switch (e.keyCode) {
	  case 49:	//1 Key
	    lighting.enabledisableSpotlight(2);
		break;
	  case 50:	//2 Key
		lighting.enabledisableSpotlight(1);
	    break;
	  case 51:	//3 Key
		lighting.enabledisableSpotlight(4);
	    break;
	  case 52:	//4 Key
		lighting.enabledisableSpotlight(3);
	    break;
    case 53:  //5 Key
      cameras.mainCamera = cameras.currentCameras.camera1;
      cameras.currentCamera = 1;
      cameras.mainCamera.lookAt(scene.position);
      break;
    case 54:  //6 Key
      cameras.mainCamera = cameras.currentCameras.camera2;
      cameras.currentCamera = 2;
      //CHANGE THE VECTOR TO LOOK AT PICTURE
      cameras.mainCamera.lookAt(painting.canvas.position);
      break;

    case 69:  //e, E key
      scene.traverse(function (node) {
        if (node instanceof THREE.Mesh){
          if(node.material instanceof THREE.MeshPhongMaterial){
          	node.material = node.materials[1];
          }
          else if(node.material instanceof THREE.MeshLambertMaterial){
          	node.material = node.materials[0];
          }
        }
      });
      break;

    case 81:  //q, Q Key
      if(lighting.turnOffDirectionalLight){//Lighting was turned off, we want to turn on
        scene.add(lighting.light);
        lighting.turnOffDirectionalLight = 0;
      }
      else{//Lighting was turned on, we want to turn off
        scene.remove(lighting.light);
        lighting.turnOffDirectionalLight = 1;
      }
      break;

    case 87:  //w, W Key
      scene.traverse(function (node){
      	if(node instanceof THREE.Mesh){
      		if(node.material instanceof THREE.MeshPhongMaterial){
      			node.material = node.materials[2];
      			node.previousMesh = "Phong";
      		}
      		else if(node.material instanceof THREE.MeshLambertMaterial){
      			node.material =  node.materials[2];
      			node.previousMesh = "Lambert";
      		}
      		else if(node.material instanceof THREE.MeshBasicMaterial){
      			if(node.previousMesh == "Phong"){
      				node.material = node.materials[0];
      			}
      			else if(node.previousMesh == "Lambert"){
      				node.material = node.materials[1];
      			}
      		}
      	}
      });
      break;

	 }
}


/*************************************************
*					          CAMERAS                      *
*************************************************/
var cameras = new function() {

	this.mainCamera = null;

	this.currentCamera = null;

	this.sceneHeight = 720*(1/8);

	this.sceneWidth = 1380*(1/8);

	this.viewSizeOrt = 18;

	this.aspectRatio = window.innerWidth / window.innerHeight;

	this.currentCameras = {
		camera1: new THREE.PerspectiveCamera(45, this.sceneWidth/this.sceneHeight, 1, 1000),
		camera2: new THREE.OrthographicCamera(- this.viewSizeOrt*this.aspectRatio / 2, this.viewSizeOrt*this.aspectRatio / 2, this.viewSizeOrt / 2, - this.viewSizeOrt / 2, -1000, 1000)
	};

	this.setup = function(){
		this.currentCameras.camera1.position.set(0,20,60);
		this.currentCameras.camera1.lookAt(scene.position);

		this.currentCameras.camera2.position.set(painting.canvas.position.x,painting.canvas.position.y,20);
		this.currentCameras.camera2.lookAt(painting.canvas.position.x,painting.canvas.position.y,painting.canvas.position.z);

		this.mainCamera = this.currentCameras.camera1;
		this.currentCamera = 1;

	};
}


/*************************************************
*				              INIT                       *
*************************************************/
function init() {
  'use strict';
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  createScene();
  room.setup();
  painting.setup();
  escultura.setup();
  cameras.setup();
  lighting.setup();
  spotlights.setup();
  //controls = new THREE.OrbitControls (cameras.mainCamera, renderer.domElement);
  render();
  window.addEventListener("keydown", onkeydown);
  window.addEventListener("resize", resizeWindow);
}
