// ============================================================
//  MÚSCULOS: qué se ve en el modelo y qué trabaja en cada elemento.
//  Niveles: 3 = principal (rojo), 2 = secundario (naranja), 1 = estabilizador (amarillo)
// ============================================================
const MUS={dorsal:"Dorsal ancho",trapecio:"Trapecio y romboides",deltoideAnt:"Deltoides anterior",deltoidePost:"Deltoides posterior",pectoral:"Pectoral mayor",serrato:"Serrato anterior",biceps:"Bíceps",triceps:"Tríceps",antebrazo:"Antebrazo",recto:"Recto abdominal",oblicuos:"Oblicuos",lumbar:"Lumbares",gluteo:"Glúteos",cuadriceps:"Cuádriceps",isquios:"Isquiotibiales",gemelos:"Gemelos"};
// [músculo, segmento, posición 0–1, medio largo, desplazamiento al frente, desplazamiento lateral, radio frente-atrás, radio ancho]
const ESPEC=[
 ["trapecio","torso",.88,.12,-.095,.1,.035,.11],["trapecio","torso",.72,.11,-.1,.06,.03,.09],
 ["dorsal","torso",.5,.24,-.09,.13,.04,.075],["lumbar","torso",.2,.12,-.085,.04,.035,.04],
 ["pectoral","torso",.8,.09,.09,.09,.035,.1],["recto","torso",.38,.16,.095,.035,.03,.03],
 ["oblicuos","torso",.4,.13,.01,.14,.06,.035],["serrato","torso",.6,.08,0,.16,.05,.03],
 ["gluteo","torso",.05,.07,-.09,.07,.05,.075],
 ["deltoideAnt","arm",.08,.07,.04,0,.045,.05],["deltoidePost","arm",.08,.07,-.04,0,.045,.05],
 ["biceps","arm",.3,.1,.04,0,.03,.035],["triceps","arm",.3,.1,-.04,0,.035,.038],["antebrazo","arm",.75,.1,0,0,.04,.04],
 ["cuadriceps","thigh",.5,.17,.045,0,.05,.06],["isquios","thigh",.5,.17,-.045,0,.045,.055],["gemelos","shin",.3,.12,-.04,0,.04,.045]
];
const ACT={
 "front-lever":{dorsal:[3,"jala la barra hacia las caderas y sostiene el cuerpo horizontal."],recto:[3,"mantiene el tronco rígido para que la cadera no caiga."],
  trapecio:[2,"deprime y retrae las escápulas para no encoger los hombros."],deltoidePost:[2,"ayuda a extender el hombro."],triceps:[2,"su cabeza larga ayuda a extender el hombro."],
  biceps:[2,"trabaja en isométrico para proteger el codo."],antebrazo:[2,"sostienen el agarre en la barra."],gluteo:[2,"mantiene la cadera extendida."],
  oblicuos:[2,"evitan que el cuerpo rote."],pectoral:[1,"estabiliza el hombro."],cuadriceps:[1,"mantienen las piernas estiradas."]},
 "back-lever":{dorsal:[3,"tira de la barra para mantener el cuerpo horizontal."],biceps:[3,"soporta el codo y el hombro en extensión."],
  pectoral:[2,"controla el hombro en extensión."],deltoideAnt:[2,"se estira y estabiliza la articulación del hombro."],recto:[2,"evita que la cadera caiga."],
  lumbar:[2,"mantienen la espalda alineada."],gluteo:[2,"mantiene la cadera extendida."],trapecio:[2,"estabiliza las escápulas."],antebrazo:[2,"sostienen el agarre."],
  triceps:[1,"mantiene el codo estirado."],oblicuos:[1,"evitan que el cuerpo rote."]},
 "planche":{deltoideAnt:[3,"empuja el cuerpo y sostiene la inclinación hacia adelante."],pectoral:[3,"aporta fuerza de empuje con el tronco inclinado."],
  serrato:[3,"mantiene los omóplatos abiertos (protracción)."],recto:[3,"mantiene la pelvis y el cuerpo rectos."],triceps:[2,"mantiene los codos estirados bajo carga."],
  biceps:[2,"estabiliza el codo y el hombro."],antebrazo:[2,"soportan las muñecas."],gluteo:[2,"mantiene la cadera extendida."],
  cuadriceps:[1,"mantienen las piernas estiradas."],oblicuos:[1,"evitan que el cuerpo rote."],trapecio:[1,"estabiliza las escápulas."],lumbar:[1,"mantienen el tronco alineado."]},
 "handstand":{deltoideAnt:[3,"sostiene el hombro con el brazo por encima de la cabeza."],triceps:[3,"mantiene los codos bloqueados."],
  trapecio:[3,"eleva y rota las escápulas hacia arriba."],serrato:[3,"empuja el suelo y estabiliza el omóplato."],antebrazo:[3,"corrigen el equilibrio con la muñeca y los dedos."],
  recto:[2,"mantiene las costillas cerradas."],gluteo:[2,"mantiene la cadera extendida."],lumbar:[2,"evitan que la espalda se arquee."],
  pectoral:[1,"estabiliza el hombro."],oblicuos:[1,"mantienen el cuerpo alineado."],cuadriceps:[1,"mantienen las piernas estiradas y juntas."]}
};
