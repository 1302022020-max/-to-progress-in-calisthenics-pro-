# Estáticos · Calistenia (con modelo 3D)

Web estática (HTML + JS, sin build). Progresiones de jalón (front lever, back lever) y empuje (planche, parada de manos).
Cada progresión muestra un **modelo 3D** que adopta la posición (arrastra para girarlo) y puede explicarla con voz.

## App instalable (PWA)
Al abrir la web en el celular se puede instalar y abre como una app, también sin internet (después de la primera visita con conexión).
- **Android (Chrome):** menú ⋮ → "Instalar app" o "Agregar a la pantalla de inicio".
- **iPhone (Safari):** botón Compartir → "Agregar a pantalla de inicio".
- Si cambias archivos, sube el número de `VERSION` en `sw.js` (por ejemplo `estaticos-v2`) para que los celulares se actualicen.

## Archivos
- `index.html` – la app (diseño, visor 3D, cronómetro).
- `data.js` – textos, metas, claves y errores de cada progresión.
- `persona.bin`, `persona.json` – tu escaneo 3D (`Dima_body_scan.obj`, 382 mil vértices) reducido a ~62 mil vértices, con esqueleto, músculos y las 20 poses ya calculadas.
- `muscles.js` – músculos del modelo y qué trabaja en cada elemento.
- `poses.js` – la pose 3D de cada progresión (ángulos editables).
- `config.js` – **tus datos de entrenador** (nombre y WhatsApp/Telegram) para recibir las fotos.
- `fotos.js` – subir foto de cada progresión, historial en el celular y envío al entrenador.
- `manifest.webmanifest`, `sw.js`, `icons/` – lo que hace la app instalable.

## Fotos y asesoría por chat
En cada progresión el alumno ve **"Enviar foto a …"**: toma o elige una foto, anota el tiempo y una nota, y se abre el menú de compartir del celular con la foto y un mensaje ya escrito (elige WhatsApp o Telegram). Tú le respondes en ese chat.
1. Abre `config.js` y escribe tu nombre y tu WhatsApp con código de país (Perú: `51987654321`).
2. Las fotos quedan guardadas solo en el celular del alumno (historial por progresión, con opción de reenviar o borrar); no se suben a ningún servidor.
3. Si el navegador no permite adjuntar la foto, la app la ofrece para descargar y abre tu chat de WhatsApp.

## Ajustar una pose 3D
En `poses.js` cada pose tiene ángulos en grados (explicados al inicio del archivo).
Cambia los números, recarga la página y mira el resultado.

## Probar en tu PC
Abre una terminal en la carpeta y ejecuta `python -m http.server 8000`; luego entra a http://localhost:8000.
(El visor 3D carga three.js desde internet, así que necesitas conexión.)

## Subir a GitHub
```bash
git init
git add .
git commit -m "App de estáticos 3D"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/calistenia-estaticos.git
git push -u origin main
```

## Desplegar en Render
1. En render.com: **New → Static Site** y conecta el repositorio.
2. Build Command: vacío. Publish Directory: `.`
3. **Create Static Site**. Cada `git push` vuelve a desplegar.
