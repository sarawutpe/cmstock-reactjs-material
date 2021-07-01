import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";

import {
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Link,
  Grid
} from "@material-ui/core";
import { apiUrl, server } from "../../Constants";
import loginReducer from "../../reducers/login.reducer";
import * as loginActions from "./../../actions/login.action";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 200
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Register(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

  const [isError, setIsError] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);

  function showForm({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }) {
    return (
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={values.username}
          onChange={handleChange}
          id="username"
          label="Username"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={values.password}
          onChange={handleChange}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        {isError && (
          <Alert severity="error">Error, your registration is failed!</Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          className={classes.submit}
        >
          Register
        </Button>
        <Button
          onClick={() => props.history.goBack()}
          fullWidth
          size="small"
          color="primary"
        >
          Cancel
        </Button>
      </form>
    );
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Register
          </Typography>

          <Formik
            initialValues={{ username: "admin", password: "1234" }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              Axios.post("http://localhost:8085/api/v2/authen/register", values)
                .then(result => {
                  setSubmitting(false);
                  // alert(JSON.stringify(result.data));
                  const { data } = result;
                  debugger;
                  if (data.result == "ok") {
                    // dispatch(loginActions.setSuccess());
                    setShowDialog(true);
                  } else {
                    // dispatch(
                    //   loginActions.hasError(
                    //     "Error, your information is not correct!"
                    //   )
                    // );

                    setIsError(true);
                  }
                })
                .catch(error => {
                  setIsError(true);
                });
            }}
          >
            {props => showForm(props)}
          </Formik>
        </CardContent>
      </Card>

      <Dialog
        open={showDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Congratulation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your Registration is successfull
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.history.push("/login");
            }}
            color="primary"
          >
            Close (go to Login)
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
