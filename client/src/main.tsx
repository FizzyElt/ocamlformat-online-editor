import { createRoot } from "react-dom/client";

import { Provider } from "@/components/ui/provider.tsx";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <Provider forcedTheme="light">
        <App />
    </Provider>,
);
