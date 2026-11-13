// ============================================================
//  EDITA AQUÍ: textos, metas, claves y errores de cada progresión.
//  La pose 3D de cada una está en poses.js
// ============================================================
const ELEMENTOS = [
  {
    id: "front-lever", grupo: "jalon", nombre: "Front lever",
    resumen: "Cuerpo horizontal colgado de la barra, boca arriba. Trabaja dorsales, core y retractores escapulares.",
    progresiones: [
      { nombre: "Tuck front lever", objetivo: "3 series de 10–15 s",
        descripcion: "Rodillas pegadas al pecho, espalda redonda y cadera a la altura de los hombros.",
        claves: ["Brazos estirados, hombros deprimidos", "Cadera a la altura de la barra", "Mirada hacia adelante"],
        errores: ["Doblar los codos", "Cadera caída", "Encoger los hombros hacia las orejas"] },
      { nombre: "Advanced tuck", objetivo: "3 series de 8–12 s",
        descripcion: "Espalda plana y rodillas separadas del pecho, ángulo de cadera de 90°.",
        claves: ["Espalda recta y paralela al suelo", "Empuja la barra hacia abajo", "Glúteos apretados"],
        errores: ["Espalda arqueada", "Perder la retracción escapular"] },
      { nombre: "One leg front lever", objetivo: "3 series de 6–10 s por pierna",
        descripcion: "Una pierna extendida y la otra en tuck. Alterna el lado en cada serie.",
        claves: ["Pierna extendida en línea con el tronco", "Pelvis neutra", "Respira sin soltar la tensión"],
        errores: ["Rotar el cuerpo", "Bajar la pierna extendida"] },
      { nombre: "Straddle front lever", objetivo: "3 series de 5–10 s",
        descripcion: "Piernas abiertas y extendidas. Cuanto más abiertas, más fácil.",
        claves: ["Piernas totalmente estiradas", "Cuerpo recto de hombros a pies", "Punta de pies estirada"],
        errores: ["Cerrar la apertura demasiado rápido", "Flexionar rodillas"] },
      { nombre: "Full front lever", objetivo: "3 series de 3–8 s",
        descripcion: "Cuerpo completo recto y horizontal, piernas juntas.",
        claves: ["Línea recta de hombros a talones", "Core y glúteos activos", "Jala la barra hacia las caderas"],
        errores: ["Pelvis caída", "Hombros adelantados"] }
    ]
  },
  {
    id: "back-lever", grupo: "jalon", nombre: "Back lever",
    resumen: "Cuerpo horizontal colgado de la barra, boca abajo. Exige hombros móviles y fuertes.",
    progresiones: [
      { nombre: "Skin the cat", objetivo: "5–8 repeticiones lentas",
        descripcion: "Pasa de colgado a la posición invertida y vuelve. Prepara el hombro para el back lever.",
        claves: ["Movimiento lento y controlado", "Brazos estirados", "No vayas más allá de tu rango cómodo"],
        errores: ["Caer de golpe", "Forzar el rango de hombro"] },
      { nombre: "Tuck back lever", objetivo: "3 series de 10–15 s",
        descripcion: "Rodillas al pecho, cuerpo horizontal boca abajo.",
        claves: ["Hombros activos", "Cadera alineada con los hombros", "Brazos estirados"],
        errores: ["Dejar caer los hombros", "Doblar los codos"] },
      { nombre: "Advanced tuck back lever", objetivo: "3 series de 8–12 s",
        descripcion: "Espalda plana, rodillas separadas del pecho.",
        claves: ["Cadera elevada", "Glúteos apretados", "Mirada neutra"],
        errores: ["Espalda hundida", "Lumbar muy arqueada"] },
      { nombre: "Straddle back lever", objetivo: "3 series de 5–10 s",
        descripcion: "Piernas abiertas y estiradas en línea con el tronco.",
        claves: ["Piernas estiradas", "Cuerpo recto", "Tensión en toda la cadena posterior"],
        errores: ["Arquear la zona lumbar", "Bajar las piernas"] },
      { nombre: "Full back lever", objetivo: "3 series de 3–8 s",
        descripcion: "Cuerpo recto y horizontal, piernas juntas.",
        claves: ["Línea recta de cabeza a pies", "Core y glúteos activos", "Hombros protegidos"],
        errores: ["Perder la alineación", "Soltar la tensión de hombros"] }
    ]
  },
  {
    id: "planche", grupo: "empuje", nombre: "Planche",
    resumen: "Cuerpo horizontal sostenido solo con las manos. Trabaja hombro anterior, core y muñecas.",
    progresiones: [
      { nombre: "Planche lean", objetivo: "3 series de 15–30 s",
        descripcion: "Posición de plancha con los hombros por delante de las manos.",
        claves: ["Brazos estirados", "Protracción escapular", "Inclina el cuerpo hacia adelante de forma gradual"],
        errores: ["Doblar los codos", "Hundir los hombros entre los brazos"] },
      { nombre: "Tuck planche", objetivo: "3 series de 8–15 s",
        descripcion: "Rodillas al pecho, pies despegados del suelo, espalda redondeada.",
        claves: ["Espalda redonda", "Hombros por delante de las manos", "Mirada hacia las manos"],
        errores: ["Cadera demasiado alta", "Codos flexionados"] },
      { nombre: "Advanced tuck planche", objetivo: "3 series de 6–12 s",
        descripcion: "Espalda plana, rodillas siguen dobladas.",
        claves: ["Espalda paralela al suelo", "Protracción máxima", "Glúteos apretados"],
        errores: ["Espalda arqueada", "Perder la protracción"] },
      { nombre: "Straddle planche", objetivo: "3 series de 4–8 s",
        descripcion: "Piernas abiertas y estiradas, cuerpo horizontal.",
        claves: ["Piernas estiradas", "Pelvis en retroversión", "Muñecas calentadas"],
        errores: ["Cadera alta", "Saltarse el calentamiento de muñeca"] },
      { nombre: "Full planche", objetivo: "3 series de 2–5 s",
        descripcion: "Cuerpo completo recto y horizontal, piernas juntas.",
        claves: ["Línea recta de hombros a pies", "Protracción y core al máximo", "Empuja el suelo lejos"],
        errores: ["Banana (cadera caída)", "Codos doblados"] }
    ]
  },
  {
    id: "handstand", grupo: "empuje", nombre: "Parada de manos",
    resumen: "Equilibrio invertido sobre las manos. Base de muchos otros elementos de empuje.",
    progresiones: [
      { nombre: "Pike en pared", objetivo: "3 series de 20–30 s",
        descripcion: "Pies en la pared, cadera elevada, brazos estirados. Aprende a empujar el suelo.",
        claves: ["Empuja el suelo con los hombros", "Brazos y espalda rectos", "Cabeza neutra"], errores: ["Hundir el pecho", "Encoger los hombros"] },
      { nombre: "Pecho a la pared", objetivo: "3 series de 20–40 s",
        descripcion: "Sube por la pared hasta quedar con el pecho mirando a ella.",
        claves: ["Cuerpo recto", "Dedos activos para frenar la caída", "Hombros abiertos"], errores: ["Arco lumbar", "Manos muy lejos de la pared"] },
      { nombre: "Espalda a la pared", objetivo: "3 series de 20–30 s",
        descripcion: "Entra con patada y sostén apoyando solo talones en la pared.",
        claves: ["Costillas cerradas", "Glúteos apretados", "Alinea muñecas, hombros y cadera"], errores: ["Colgarte de la pared", "Banana"] },
      { nombre: "Patada libre y equilibrio", objetivo: "10 intentos por sesión",
        descripcion: "Practica la entrada y busca los primeros segundos sin la pared.",
        claves: ["Patada controlada", "Corrige con los dedos y la palma", "Mirada entre las manos"], errores: ["Patear demasiado fuerte", "Doblar los codos"] },
      { nombre: "Parada de manos libre", objetivo: "3 series de 30–60 s",
        descripcion: "Parada de manos estable en el centro de la sala.",
        claves: ["Cuerpo recto y apilado", "Respiración tranquila", "Pequeñas correcciones con las manos"], errores: ["Arquear la espalda", "Contener la respiración"] }
    ]
  }
];
