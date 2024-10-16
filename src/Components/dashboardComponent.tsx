import * as elements from "typed-html";

export const Dashboard = () => {
  return (

    <div>
      <div id="orders-container">
        <div class="container mx-auto">
          <div class="rounded-lg border bg-white shadow-sm w-full mb-6">
            <div class="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <h3 class="text-center whitespace-nowrap tracking-tight text-4xl font-bold">Dashboard</h3>
              <p class="text-center text-md text-gray-100">Manage Orders</p>
            </div>
            <div class="p-6 pt-6">
              <div class="w-full md:w-auto">
                <div class="h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-3">
                  {/* Tabs */}
                </div>
              </div>
              <div>
                <div hx-ext="ws" ws-connect="/ws"></div>
                <div hx-get="/api/orders" hx-swap="innerHTML" hx-trigger=" update from:window"></div>
              </div>
            </div>
          </div>
        </div>

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
