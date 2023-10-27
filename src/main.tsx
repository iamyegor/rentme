import "@radix-ui/themes/styles.css";
import { createRoot } from "react-dom/client";
import "./api/server.ts";
import App from "./components/App.tsx";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(<App />);