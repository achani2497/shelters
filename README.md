This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## TODOs

[x] Caja de comentarios en la pagina de cada refugio
[x] Agregar un boton para anotarse como voluntario en el refugio
[x] Agregar seccion de mascotas pérdidas
[x] Las personas tienen que poder crear un posteo sobre su perro con foto, nombre, ultimo lugar donde se lo vió / perdió y telefono de contacto
[x] Agregar un buscador para buscar por nombre de los perros
[X] En el home agregar una galeria de casos de Exito de adopcion con testimonios y alguna foto
[ ] Agregar un footer
[ ] Agregar una pantalla principal en la home
[ ] Agenda de Eventos: Crea un calendario de eventos como ferias de adopción, clínicas veterinarias móviles, campañas de vacunación, entre otros. Permite a los usuarios registrarse o confirmar su asistencia a estos eventos.
[ ] Implementar Sistema de Rescate de Animales: Permite a los usuarios reportar animales en situaciones de peligro o abuso. Implementa un formulario para registrar estos reportes y un proceso para que el refugio pueda intervenir o coordinar rescates.

Ultimos detalles
[ ] Cambiar fonts
[X] Mejorar las cards de /shelters y fixear el skeleton. Tambien cambiar el estilo del boton, reemplazar por SheltieButton
[X] Hacer que las imagenes de las DogCards tengan un objectFit: cover y agregar carga prioritaria
[x] Fixear las fotos de la seccion Missing y reemplazar por SheltieButton
[x] Fixear las fotos de ImagesCardLayout
[ ] Agregar funcionalidad al boton Lo Encontré en Missing

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
