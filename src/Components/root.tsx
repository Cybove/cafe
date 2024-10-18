import * as elements from "typed-html";

const Root = ({ children }: elements.Children) =>
  /*html*/ ` 
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cafe</title>
        <script src="https://unpkg.com/htmx.org@2.0.3"></script>
        <script src="https://unpkg.com/htmx-ext-sse@2.2.2/sse.js"></script>
        <script src="https://unpkg.com/htmx-ext-ws@2.0.1/ws.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <link rel="stylesheet" href="../../public/customStyles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Domine:wght@400..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Teko:wght@300..700&display=swap" rel="stylesheet">
    </head>
    <body class="min-h-screen bg-gray-300 p-4" id="bg">
      ${children}
    </body>
  </html>
`;

export default Root;
