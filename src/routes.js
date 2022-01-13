import Home from "./pages/Home";
import SASU from "./pages/SASU";
import EURL from "./pages/EURL";
import AutoEntrepreneur from "./pages/AutoEntrepreneur";
import Employee from "./pages/Employee";
import Portage from "./pages/Portage";


export default [
    { path: '/', component: Home },
    { path: '/sasu', component: SASU },
    { path: '/eurl', component: EURL },
    { path: '/micro', component: AutoEntrepreneur },
    { path: '/employee', component: Employee },
    { path: '/portage', component: Portage },
]