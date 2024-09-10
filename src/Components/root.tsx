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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
            #bg {
              background-color: #c8c8c8;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23f9f3f3' fill-opacity='1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
            }
        </style>
    </head>
    <body class="min-h-screen bg-gray-300 p-4" id="bg">
      ${children}
    </body>
  </html>
`;

export default Root;