import * as elements from "typed-html";
import { Loader } from "lucide-static";

export const Dashboard = () => {
  return (
    <div class="min-h-screen"
      style="font-family: 'Domine', sans-serif;"
    >
      <div id="orders-container" class="container mx-auto py-6">
        <div class="bg-white rounded-lg border shadow-sm w-full mb-6">
          <div class="text-white rounded-t-lg p-6 text-center bg-slate-600">
            <h3 class="text-4xl font-bold tracking-tight">Dashboard</h3>
          </div>
          <div class="p-6 pt-6">
            <div class="relative">
              <div hx-ext="ws" ws-connect="/ws"></div>
              <div
                hx-get="/api/orders"
                hx-swap="innerHTML"
                hx-trigger="update from:window"
              >
                <div class="flex justify-center items-center w-full">
                  <div class="animate-spin text-gray-700">
                    {Loader}
                  </div>
                </div>
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
