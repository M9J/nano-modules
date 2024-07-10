import NanoModules from "./app/NanoModules";
import AppContainer from "./components/AppContainer";
import "./nano-modules.css";

const app = new AppContainer();
document.body.appendChild(app);
NanoModules();
