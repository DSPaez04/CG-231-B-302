

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
camera.position.z = 4.5;
camera.position.x = -5.2;
camera.position.y = 2;

camera.rotation.set(0, -0.5, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);





const light = new THREE.DirectionalLight(0xffffff, 1); //Luz 
light.position.set(-1, 2, 4);
scene.add(light);

const size = 150;
const divisions = 160;
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

function crearPoliedro(numCaras, tamaño) {
  // Calcular el ángulo central de cada cara
  const anguloCentral = (2 * Math.PI) / numCaras;

  // Calcular la longitud del lado del polígono regular inscrito
  const lado = 2 * tamaño * Math.tan(Math.PI / numCaras);

  // Calcular el radio del círculo circunscrito
  const radio = tamaño / Math.sin(Math.PI / numCaras);

  // Crear los vértices del poliedro
  const vertices = [];
  for (let i = 0; i < numCaras; i++) {
    const x = radio * Math.cos(i * anguloCentral);
    const y = radio * Math.sin(i * anguloCentral);
    vertices.push(x, y, 0);
  }

  // Crear los índices de las caras
  const indices = [];
  for (let i = 1; i < numCaras - 1; i++) {
    indices.push(0, i, i + 1);
  }

  // Crear la geometría usando BufferGeometry
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometria.setIndex(indices);

  // Crear el material
  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
  });

  // Crear la malla y devolverla
  const poliedro = new THREE.Mesh(geometria, material);
  scene.add(poliedro)
}





const ncaras = 12;
const tamaño = 1
crearPoliedro(ncaras,tamaño);



  // Agregar los vértices y las caras a la geometría
  /*geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));

  // Calcular las normales de la geometría para suavizar las caras
  geometry.computeVertexNormals();

  // Crear una malla utilizando la geometría y un material

const color= new THREE.Color("rgb(0, 0, 0)"); //color
const material2 = new THREE.MeshBasicMaterial({ color, wireframe: true });
const mesh = new THREE.Mesh(geometry, material2);

// Agregar la malla a la escena
scene.add(mesh);*/


//Renderizado de la animación
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();


