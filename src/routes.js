import BaseLayout from "./layouts/BaseLayout";
import HomeView from "./views/HomeView";
import {LoginView} from "./views/LoginView";
import NoLayout from "./layouts/NoLayout";

/**
 *  Route list for the application. Returns all routes as an array.
 *
 *
 *  Fields of a route object:
 *      name:       Name of the routed page
 *      path:       Path of the routed page
 *      layout:     There can be same layout for the different pages. For instance, navbar and footer can be contained
 *                  by many pages. So these components are located in the {@link BaseLayout}.
 *      component:  The content of the routed page.
 *      exact:      When true; it will only route if the path matches exactly.
 *      autoLogin:  When a Jwt token is saved on local storage,  make user logged-in operation automatically.
 *      needAuth:   When true; it will only route if the user is authenticated.
 *
 *  @created    10/25/2020
 *  @author Umut Emre Bayramoglu
 */

const routes = [
    {
        name        :   "Home Page",
        path        :   "/",
        layout      :   BaseLayout,
        component   :   HomeView,
        exact       :   true,
        autoLogin   :   true,
        needAuth    :   false,
    },
    {
        name        :   "Login Page",
        path        :   "/login",
        layout      :   NoLayout,
        component   :   LoginView,
        exact       :   true,
        autoLogin   :   true,
        needAuth    :   false,
    },

]

export default routes;