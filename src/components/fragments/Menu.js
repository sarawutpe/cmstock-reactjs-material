import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { NavLink } from "react-router-dom";

import {
  Layers as LayersIcon,
  BarChart as BarChartIcon,
  Person as PersonIcon,
} from "@material-ui/icons";

const drawerWidth = 290;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage:
      "url(" + `${process.env.PUBLIC_URL}/images/background_menu.jpg` + ")",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  isActive: {
    backgroundColor: "#e0f5fd",
    color: "#0080ff",
  },
}));

export default function Menu(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <img
            width="80%"
            src={`${process.env.PUBLIC_URL}/images/logo_codemobiles.png`}
            alt=""
          />

          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <img
          height={300}
          src={`${process.env.PUBLIC_URL}/images/menu_banner.jpg`}
          alt=""
        />
        <Divider />
        <List>
          {/* Stock */}
          <ListItem
            component={NavLink}
            to="/stock"
            button
            key="stock"
            activeClassName={classes.isActive}
          >
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Stock" />
          </ListItem>

          {/* Report */}
          <ListItem
            component={NavLink}
            to="/report"
            button
            key="report"
            activeClassName={classes.isActive}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItem>

          {/* AboutUS */}
          <ListItem
            component={NavLink}
            to="/aboutus"
            button
            key="aboutus"
            activeClassName={classes.isActive}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="AboutUs" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
