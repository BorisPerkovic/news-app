import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import BottomNav from "./Components/Header/BottomNav/BottomNav";
import TopNav from "./Components/Header/TopNav/TopNav";
import MainPage from "./Components/Pages/MainPage";
import RegisterForm from "./Components/Pages/RegisterForm/RegisterForm";
import LoginForm from "./Components/Pages/LoginForm/LoginForm"
import AddNews from "./Components/Pages/News/AddNews/AddNews";
import NewsByCategory from "./Components/Pages/News/NewsByCategory/NewsByCategory";
import SingleNews from "./Components/Pages/News/SingleNews/SingleNews";
import SideBar from "./Components/Pages/SideBar/SideBar";
import Footer from "./Components/Footer/Footer";
import Logs from "./Components/Pages/Logs/Logs";
import Comments from "./Components/Comments/Comments";
import EditNews from "./Components/Pages/News/EditNews/EditNews";
import RemoveNews from "./Components/Pages/News/RemoveNews/RemoveNews";

function App() {
  return (
    <Fragment>
      <TopNav />
      <BottomNav />
      <main className="main">
        <section className="main-section">
          <Switch>
            <Route exact path="/news-app" component={MainPage} />
            <Route exact path="/news-app/add-news" component={AddNews} />
            <Route exact path="/news-app/registration" component={RegisterForm} />
            <Route exact path="/news-app/category/:category" component={NewsByCategory} />
            <Route exact path="/news-app/single-news/:id" component={SingleNews} />
            <Route exact path="/news-app/edit-news" component={EditNews} />
            <Route exact path="/news-app/remove-news" component={RemoveNews} />
            <Route exact path="/news-app/comments" component={Comments} />
            <Route exact path="/news-app/logs" component={Logs} />
            <Route exact path="/news-app/login" component={LoginForm} />
          </Switch>
        </section>
        <aside className="main-aside">
          <SideBar />
        </aside>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
