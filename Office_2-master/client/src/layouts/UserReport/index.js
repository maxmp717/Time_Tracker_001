import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { useSelect } from "@mui/base";

function Report() {
  // const { columns, rows } = authorsTableData();
  const initialValues = {
    startDate: "",
    endDate: "",
    empname: "",
    team: "",
  };
  const [values, setValues] = useState(initialValues);
  const [report, setReport] = useState([]);
  const [teamList, setTeamList] = useState(null);
  const empId = useSelector((state) => state.auth.user.empId);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleTeamChange = (event, value) => setTeamList(value);
  const [show, setShow] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      startDate: values.startDate,
      endDate: values.endDate,
      team: teamList,
    };
    // console.log(userData);

    axios
      .get(
        `analyst/fetch/user-data/?sDate=${values.startDate}&eDate=${values.endDate}&empId=${empId}&team=${teamList}`
      )
      .then((res) => {
        setReport(res.data);
      })
      .catch((err) => console.log(`Error:${err}`));
  };

  // tabel report
  const columns = [
    { field: "id", headerName: "ID", width: 80},
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: "team",
      headerName: "Team",
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      // type: 'date',
      width: 130,
      editable: false,
      flex: 1,
    },
    {
      field: "TotalTime",
      headerName: "Active Time",
      // type: 'time',
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: "ActiveTime",
      headerName: "Working Time",
      // type: 'number',
      width: 150,
      editable: false,
      flex: 1,
    },
    {
      field: "EntityTime",
      headerName: "Entity Time",
      // type: 'number',
      width: 150,
      editable: false,
      flex: 1,
    },
  ];

  const rows = useMemo(
    () =>
      report.map((item, index) => ({
        ...item,
        id: index + 1,
        name: item.name,
        team: item.team,
        date: moment(item.createdAt).format("DD MM YYYY"),
        TotalTime: moment
          .utc(moment.duration(item.TotalTime, "seconds").as("milliseconds"))
          .format("HH:mm:ss"),
        ActiveTime: moment
          .utc(moment.duration(item.ActiveTime, "seconds").as("milliseconds"))
          .format("HH:mm:ss"),
        EntityTime: moment
          .utc(moment.duration(item.EntityTime, "seconds").as("milliseconds"))
          .format("HH:mm:ss"),
      })),
    [report]
  );
  // Team List
  const list = [
    "Dumbledore",
    "Gandalf",
    "Honeydew_Image Classification",
    "Longon",
    "Mango_Autonomy",
    "Mango_Obstacles",
    "Mango_Soybeans",
    "Neo Segmentation",
    "Pomelo",
    "Rambutan_Traffic Light",
    "Rambutan_Traffic Sign",
    "Snorlax_Vehicle",
    "Venusaur",
    "LIME",
    "SNOMED",
    "RX-NORM",
    "Receipt Labeling",
    "My Heritage Project",
    "Dragon",
    "SKY FFV",
    "NALA 3",
    "Napa",
    "Pinfo",
    "SWDP",
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} mt={1} mb={40}>
        <Card>
          <MDBox pb={5} component="form" role="form" onSubmit={handleSubmit}>
            <MDBox
              mx={2}
              // mt={-3}
              py={3}
              pt={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Reports
              </MDTypography>
            </MDBox>
            <MDBox pt={6} px={4} display="flex" justifyContent="space-evenly" alignItems="center">
              <Grid container spacing={3}>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Start Date
                  </MDTypography>
                  <MDInput
                    type="date"
                    name="startDate"
                    value={values.startDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    End Date
                  </MDTypography>
                  <MDInput
                    type="date"
                    name="endDate"
                    value={values.endDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Team
                  </MDTypography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={list}
                    onChange={handleTeamChange}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDBox pt={4}  display="flex"justifyContent="end" alignItems="center">
                    <MDButton
                      variant="gradient"
                      color="success"
                      type="submit"
                      onClick={() => setShow(!show)}
                    >
                      &nbsp;Search
                    </MDButton>
                  </MDBox>
                  {/* <MDTypography variant="h6" fontWeight="medium">
                    Name
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="empname"
                    value={values.empname}
                    onChange={handleInputChange}
                  /> */}
                </Grid>
              </Grid>
            </MDBox>
            {/* <MDBox pt={3} pb={3} px={2} display="flex" justifyContent="end" alignItems="center">
              <MDButton
                variant="gradient"
                color="success"
                type="submit"
                onClick={() => setShow(!show)}
              >
                &nbsp;Search
              </MDButton>
            </MDBox> */}
          </MDBox>
        </Card>
        {show ? (
          <MDBox pt={8}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Reports Table
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <Box sx={{ height: 700, width: "100%", display: "flex" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      checkboxSelection
                      disableSelectionOnClick
                    />
                  </Box>
                </MDBox>
              </Card>
            </Grid>
          </MDBox>
        ) : null}
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Report;
