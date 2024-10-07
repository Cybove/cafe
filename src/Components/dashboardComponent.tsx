import * as elements from "typed-html";

export const Dashboard = () => {
  return (

    <div>
      <div id="orders-container">
        <div hx-ext="ws" ws-connect="/ws"></div>
        <div hx-get="/api/orders" hx-swap="innerHTML" hx-trigger=" update from:window"></div>
      </div>
      <script>
        {`
          document.addEventListener('htmx:wsAfterMessage', function (event) {
            htmx.trigger(document.getElementById('orders-container'), 'update');
          });
        `}
      </script>
    </div>
  );
};
