import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { imageUrl } from "./../../Constants";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { useDispatch, useSelector } from "react-redux";
import * as stockActions from "./../../actions/stock.action";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Stock(props) {
  const dispatch = useDispatch();
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showDeletionConfirmDlg = () => {
    return selectedItem ? (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this item Id : {selectedItem.id}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={`${imageUrl}/images/${selectedItem.image}`}
                style={{ width: 50, height: 50, borderRadius: "5%" }}
              />
              <span style={{ marginLeft: 20 }}>{selectedItem.name}</span>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(stockActions.deleteProduct(selectedItem.id));
              handleClose();
            }}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    ) : null;
  };

  React.useEffect(() => {
    dispatch(stockActions.getProducts());
  }, [dispatch]);

  const columns = [
    {
      title: "Id",
      field: "id",
      render: (item) => <Typography variant="body1">{item.id}</Typography>,
    },
    {
      title: "Image",
      cellStyle: { padding: 0 },
      render: (item) => (
        <img
          src={`${imageUrl}/images/${item.image}?dummy=${Math.random()}`}
          style={{ width: 70, height: 70, borderRadius: "5%" }}
        />
      ),
    },
    {
      title: "Name",
      field: "name",
      cellStyle: { minWidth: 700 },
      render: (item) => <Typography variant="body1">{item.name}</Typography>,
    },

    {
      title: "Price",
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.price}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      ),
    },
    {
      title: "Stock",
      render: (item) => (
        <Typography variant="body1">
          <NumberFormat
            value={item.stock}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
            suffix={" pcs"}
          />
        </Typography>
      ),
    },
    {
      title: "Updated",
      render: (item) => (
        <Typography>
          <Moment format="DD/MM/YYYY">{item.updatedAt}</Moment>
        </Typography>
      ),
    },
  ];

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "700",
      marginTop: 0,
    },
  }));

  const classes = useStyles();

  const actions = [
    {
      icon: () => <Edit style={{ color: "#91979c" }} />,
      iconProps: { color: "primary" },
      tooltip: "Edit",
      onClick: (event, rowData) => {
        props.history.push("/stockEdit/" + rowData.id);
      },
    },
    {
      icon: () => <DeleteOutline color="secondary" />,
      iconProps: { color: "action" },
      tooltip: "Delete",
      onClick: (event, rowData) => {
        handleClickOpen(rowData);
      },
    },
  ];

  return (
    <div className={classes.root}>
      <MaterialTable
        options={{
          pageSize: 8,
          search: true,
          rowStyle: (rowData, index) => ({
            backgroundColor: index % 2 == 0 ? "#f8faf9" : "#fff",
          }),
        }}
        icons={tableIcons}
        columns={columns}
        data={stockReducer.result ? stockReducer.result : []}
        title="Stock"
        actions={actions}
        components={{
          Container: (props) => <Paper {...props} elevation={10} />,
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: "0px 10px" }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/stockCreate"
                >
                  Create
                </Button>
              </div>
            </div>
          ),
        }}
      />

      {showDeletionConfirmDlg()}
    </div>
  );
}
