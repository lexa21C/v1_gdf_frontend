/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Competences from "views/Competences/List";
import Projects from "views/Projects/List.js";
import PublicProjects from "views/Projects/PublicProjects/ListProjects.js";
import LearningResults from "views/Learning_Results/List.js";
import Records from "views/Records/List.js";
import FormationPrograms from "views/program_formation/List.js"
import Artiffacts from "views/Artiffacts/panel_control.js"
import Users from "views/users/ListUser.js"
import Category from "views/Categories/CrudCategory.js"
import ErroPage from './components/ErrorPage/AnimationErrorPage.js'

var routes = [
  {
    path: "/index",
    name: "Tablero",
    icon: "ni ni-tv-2 text-dark",
    element: <Index />,
    layout: "/admin",
    Auth: "true",
    sidebar:true,
    permission:  {p1:"Administrador", p2:"Instructor Lider",p3:"Instructor",}
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    element: <Icons />,
    Auth: "true",
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    Auth: "true",
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    element: <Profile />,
    layout: "/admin",
    Auth: false,
    sidebar:false,
    permission:  {p1:"Administrador", p2:"Instructor Lider",p3:"Instructor"}
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    element: <Tables />,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    element: <Login />,
    layout: "/auth",
    sidebar: false,
    Auth: false
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    element: <Register />,
    layout: "/auth",
    Auth: "false",
    sidebar: false
  },
  {
    path: "/competences",
    name: "Competencias",
    icon: "ni ni-user-run text-blue",
    element: <Competences />,
    layout: "/admin",
    Auth: "false",
    permission: {p1:"Administrador", p2:"Instructor Lider"}
  },

  {
    path: "/projects/=/:recordid/&/:number_record",
    name: "Proyectos",
    icon: "ni ni-bulb-61 text-yellow",
    element: <Projects />,
    layout: "/admin",
    sidebar:false,
    Auth:"true",
    permission:  {p1:"Administrador", p2:"Instructor Lider",p3:"Instructor"}
  },
  {
    path:"/learning_results/=/:competenceid/&/:nameCompetence",
    name: "Resultados de aprendizaje",
    icon:"fa-solid fa-person-chalkboard fa-lg text-info",
    element:<LearningResults/>,
    layout:"/admin",
    Auth:"true",
    sidebar:false,
    permission:  {p1:"Administrador", p2:"Instructor Lider"}
  },
  {
    path:"/records/=/:program_id/&/:nameprogram",
    name: "Fichas",
    icon:"ni ni-hat-3 text-info",
    element:<Records/>,
    layout:"/admin",
    Auth:"true",
    sidebar:false,
    permission:  {p1:"Administrador", p2:"Instructor Lider",p3:"Instructor"}
  },
 
  {
    path: "/learning_results/=/:competenceid/&/:nameCompetence",
    name: "Resultados de aprendizaje",
    icon: "fa-solid fa-person-chalkboard fa-lg text-info",
    element: <LearningResults />,
    layout: "/admin",
    Auth: "true",
    sidebar: false,
    permission:  {p1:"Administrador", p2:"Instructor Lider"}
  },
  {
    path: "/records/=/:program_id/&/:nameprogram",
    name: "Records",
    icon: "ni ni-hat-3 text-info",
    element: <Records />,
    layout: "/admin",
    Auth: "true",
    sidebar: false,
    permission:  {p1:"Administrador", p2:"Instructor Lider",p3:"Instructor"}
  },
  {
    path: "/formation_programs",
    name: "Programas  formación",
    icon: "fa-solid fa-person-chalkboard fa-lg text-info",
    element: <FormationPrograms/>,
    layout: "/admin",
    Auth: "true",
    permission:  {p1:"Administrador",p2:"Instructor Lider", p3:"Instructor" }
  },

  {
    path: "/categories",
    name: "Categorias",
    icon: "ni ni-archive-2 text-red",
    element: <Category/>,
    layout: "/admin",
    Auth: "true",
    permission: {p1:"Administrador",p2:"Instructor Lider"}
  },

  {
    path: "/artiffactspanel/=/:formation_program/&/:program",
    name: "Artefactos",
    element: <Artiffacts />,
    icon: "ni ni-tv-2  fa-lg text-info",
    layout: "/admin",
    sidebar: false,
    permission:  {p1:"Administrador", p2:"Instructor Lider"}
  }
  ,
  {
    path: "/users",
    name: "Usuarios",
    icon: "ni ni-single-02 text-yellow",
    element: <Users />,
    layout: "/admin",
    Auth: "true",
    permission:  {p1:"Administrador", p2:"Instructor Lider"}

  },
  
  
  {
    path: "/*",
    name: "Error",
    element: <ErroPage />,
    layout: "/admin",
    Auth: false,
    sidebar: false
  },
  // {
  //   path: "/PublicProjects",
  //   name: "PublicProjects",
  //   icon: "ni ni-bulb-61 text-yellow",
  //   element: <PublicProjects />,
  //   layout: "/auth",
  //   Auth: "false",
  //   sidebar: true
  // },
 
  {
    path: "/projects",
    name: "Projectos",
    icon: "ni ni-bulb-61 text-yellow",
    element: <PublicProjects />,
    layout: "/invitado",
    Auth: "false",
    sidebar:true,
    permission:  { p1:"Invitado"}
  },
  {
    path: "/projects",
    name: "Projectos",
    icon: "ni ni-bulb-61 text-yellow",
    element: <PublicProjects/>,
    layout: "/admin",
    Auth: "true",
    permission:  {p1:"Administrador",p2:"Instructor Lider", p3:"Instructor" }
  },
  
  // {
  //   path: "/home",
  //   name: "Home",
  //   element: <Home />,
  //   Auth: "false",
  //   sidebar: false
  // }

];
export default routes;
