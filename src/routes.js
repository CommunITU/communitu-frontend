import BaseLayout from "./layouts/BaseLayout";
import HomeView from "./views/home/HomeView";
import NoLayout from "./layouts/NoLayout";
import LoginView from "./views/login/LoginView";
import CreateNewClubView from "./views/club/CreateNewClubView";
import CreateNewEventView from "./views/event/CreateNewEventView";
import LogoutView from "./views/login/LogoutView";
import RegisterView from "./views/login/RegisterView";
import EventPageView from "./views/event/EventPageView";
import UpdateEventView from "./views/event/UpdateEventView";
import MyClubsView from "./views/club/MyClubsView";

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
    {
        name        :   "Register Page",
        path        :   "/register",
        layout      :   NoLayout,
        component   :   RegisterView,
        exact       :   true,
        autoLogin   :   true,
        needAuth    :   false,
    },
    {
        name        :   "Logout",
        path        :   "/logout",
        layout      :   NoLayout,
        component   :   LogoutView,
        exact       :   true,
        autoLogin   :   false,
        needAuth    :   true,
    },
    {
        name        :   "Create New Event Page",
        path        :   "/events/create",
        layout      :   BaseLayout,
        component   :   CreateNewEventView,
        exact       :   true,
        autoLogin   :   true,
        needAuth    :   true,
    },
    {
        name        :   "Update Page",
        path        :   "/events/:eventId/update",
        layout      :   BaseLayout,
        component   :   UpdateEventView,
        exact       :   true,
        autoLogin   :   true,
        needAuth    :   true,
    },
    {
        name        :   "Create New Club Page",
        path        :   "/clubs/create",
        layout      :   BaseLayout,
        component   :   CreateNewClubView,
        exact       :   true,
        autoLogin   :   true,
        needAuth    :   true,
    },
    {
        name        :   "Event Page",
        path        :   "/events/:eventId",
        layout      :   BaseLayout,
        component   :   EventPageView,
        exact       :   true,
        autoLogin   :   true,
        needAuth    :   false,
    },
    {
        name        :   "My Clubs Page",
        path        :   "/users/:userId/my_clubs",
        layout      :   BaseLayout,
        component   :   MyClubsView,
        exact       :   true,
        autoLogin   :   true,
        needAuth    :   true,
    },


]

export default routes;