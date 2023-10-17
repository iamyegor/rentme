import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import "./api/server.ts";

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
