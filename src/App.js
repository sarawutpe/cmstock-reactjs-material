import React from "react";
import { Button, Container } from "@material-ui/core";
import Header from "./components/fragments/Header";
import Menu from "./components/fragments/Menu";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Stock from "./components/pages/Stock";
import StockCreate from "./components/pages/StockCreate";
import StockEdit from "./components/pages/StockEdit";

import { useSelector, useDispatch } from "react-redux";
import Report from "./components/pages/Report";
import AboutUs from "./components/pages/AboutUs";
import * as loginActions from "./actions/login.action";

const drawerWidth = 290;
// https://material-ui.com/customization/theming/
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#135ab8",
    },
    secondary: {
      main: "#e85f5f",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Redirect to="/stock" />
      ) : (
        <Login {...props} />
      )
    }
  />
);

export default function App() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("App created");
    dispatch(loginActions.reLogin());
  }, [dispatch]);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(!openDrawer);
  };

  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          {loginReducer.result && !loginReducer.error && (
            <Header handleDrawerOpen={handleDrawerOpen} open={openDrawer} />
          )}
          {loginReducer.result && !loginReducer.error && (
            <Menu open={openDrawer} handleDrawerClose={handleDrawerClose} />
          )}

          <div className={classes.drawerHeader} />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]:
                openDrawer && loginReducer.result && !loginReducer.error,
            })}
          >
            <Container style={{ display: "flex", justifyContent: "center" }}>
              <Switch>
                <LoginRoute path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <SecuredRoute path="/stock" component={Stock} />
                <SecuredRoute path="/stockCreate" component={StockCreate} />
                <SecuredRoute path="/stockEdit/:id" component={StockEdit} />
                <Route
                  exact={true}
                  path="/"
                  component={() => <Redirect to="/login" />}
                />
                <SecuredRoute path="/report" component={Report} />
                <SecuredRoute path="/aboutus" component={AboutUs} />
              </Switch>
            </Container>
          </main>
        </Router>
      </ThemeProvider>
    </>
  );
}
