import BaseLayout from "./layouts/BaseLayout";
import HomeView from "./views/HomeView";


const routes = [
    {
        name        :   "Home Page",
        path        :   "/",
        layout      :   BaseLayout,
        component   :   HomeView,
        exact       :   true,
        needAuth    :   false,
    },

]

export default routes;