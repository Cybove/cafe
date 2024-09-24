import * as elements from 'typed-html';

const Root = ({ children }: elements.Children) => /*html*/ ` 
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cafe</title>
        <script src="https://unpkg.com/htmx.org@2.0.2"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <link rel="stylesheet" href="../../public/customStyles.css" />
    </head>
    <body class="min-h-screen bg-gray-300 p-4" id="bg">
      ${children}
    </body>
  </html>
`;

export default Root;