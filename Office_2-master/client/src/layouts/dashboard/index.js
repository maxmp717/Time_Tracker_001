import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton/index";
import MDInput from "components/MDInput";
import * as React from "react";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import papa from "papaparse";
import convert from "convert-seconds-to-human";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";



function Dashboard() {
  const [data, setData] = useState([]);
  const [teamList, setTeamList] = useState(null);
  const [disable, setDisable] = useState(true);
  const [seconds, setSeconds] = useState({ TotalTime: "", ActiveTime: "", EntityTime: "" });
  const [timeData, setTimeData] = useState({ TotalTime: "", ActiveTime: "", EntityTime: "" });
  const name = useSelector((state) => state.auth.user.name);
  const empId = useSelector((state) => state.auth.user.empId);
  const initialValues = {
    team: "",
  };
  const [values, setValues] = useState(initialValues);
  const handleTeamChange = (event, value) => setTeamList(value);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  // file handling
  const handlingFileUpload = (e) => {
    const { files } = e.target;
    setData([]);
    // console.log(files);
    // console.log(files[0]);
    papa.parse(files[0], {
      header: true,
      column: true,
      complete(results) {
        setData((existing) => [...existing, ...results.data]);
        return results.data;
      },
    });
    disable?setDisable(!disable):null
  };

  // Upload Data
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      empId,
      team: teamList,
      TotalTime: timeData.TotalTime,
      ActiveTime: timeData.ActiveTime,
      EntityTime: timeData.EntityTime,
    };

    axios
      .post("/analyst/add", userData)
      .then(() => toast.success("Successfully Data Submitted 👌"))
      .catch((err) => toast.error(`Try Again Followed Error Acquired: ${err}☹️`));

    // console.log(userData);
  };

  useEffect(() => {
    let activeTime = 0;
    let totalTime = 0;
    let entityTime = 0;
    data.map((item) => {
      if (item.URL.match(/sagemaker\.aws\/#\/work\//gm) !== null) {
        activeTime += Number(item["Active(sec)"]);
      }

      if (item.URL.match(/inAll/gm) !== null) {
        totalTime = Number(item["Active(sec)"]);
      }
      return null;
    });
    const active = convert(activeTime, "cal");
    const total = convert(totalTime, "cal");
    entityTime = totalTime - activeTime;
    const entity = convert(entityTime, "cal");
    // console.log(Object.keys(data).length);
    // console.log(totalTime);
    // console.log(activeTime);
    // console.log(entityTime);
    setSeconds({
      TotalTime: total,
      ActiveTime: active,
      EntityTime: entity,
    });
    setTimeData({
      TotalTime: totalTime,
      ActiveTime: activeTime,
      EntityTime: entityTime,
    });
    
  }, [data]);
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
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={3} mb={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={11}>
              <MDBox py={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={4}>
                    <MDBox mb={2.5}>
                      <ComplexStatisticsCard
                        color="warning"
                        icon="work_history"
                        title="Active Time"
                        count={`${seconds.TotalTime.hours}hr:${seconds.TotalTime.minutes}min`}
                        percentage={{
                          color: "success",
                          amount: "",
                          label: "Your over all Active page time",
                        }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <MDBox mb={1.5}>
                      <ComplexStatisticsCard
                        icon="more_time"
                        title="Working Time"
                        count={`${seconds.ActiveTime.hours}hr:${seconds.ActiveTime.minutes}min`}
                        percentage={{
                          color: "success",
                          amount: "",
                          label: "your work portal time",
                        }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <MDBox mb={1.5}>
                      <ComplexStatisticsCard
                        color="success"
                        icon="pending_actions"
                        title="Entity Time"
                        count={`${seconds.EntityTime.hours}hr:${seconds.EntityTime.minutes}min`}
                        percentage={{
                          color: "success",
                          amount: "",
                          label: "Your over all  Entity Time",
                        }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox mt={6} mb={8} component="form" role="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={8}>
                      <Card mb={3}>
                        <MDBox
                          mb={7}
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <MDTypography
                            mt={4}
                            mb={3}
                            variant="caption"
                            color="info"
                            fontWeight="regular"
                          >
                            <h1>Upload your CSV file</h1>
                          </MDTypography>
                          <MDBox
                            // mt={4}
                            display="flex"
                            width="550px"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-evenly"
                          >
                            <Grid item xs={4} md={7}>
                              <Autocomplete required
                                disablePortal
                                id="combo-box-demo"
                                options={list}
                                onChange={handleTeamChange}
                                sx={{ width: 250 }}
                                renderInput={(params) => <TextField {...params} label="Team" />}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <input type="file" accept={".csv"} onChange={handlingFileUpload} />
                            </Grid>
                          </MDBox>
                          <MDBox
                            pt={3}
                            px={2}
                            display="flex"
                            justifyContent="end"
                            alignItems="center"
                          >
                            <MDButton type="submit" color="success" disabled={disable}>
                              Upload!
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                  </Grid>
                </MDBox>
                <MDBox mt={6} mb={8}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} lg={8}>
                    <Card mb={3}>
                      <MDBox
                        mb={7}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <MDTypography
                          mt={4}
                          mb={3}
                          variant="h3"
                          color="error"
                          // fontWeight="regular"
                        >
                          * Note *
                        </MDTypography>
                        <Grid item xs={12} lg={9}>
                          <MDBox
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <MDTypography
                              variant="caption"
                              color="dark"
                              fontSize="16px"
                              fontWeight="regular"
                            >
                              <ul>
                                <li>
                                  <p>
                                    Please ensure the time details are shown above successfully, in
                                    case of any mistakes please refresh the page. If the still not
                                    resolved please get in touch with us
                                  </p>
                                </li>
                                <br />
                                <li>
                                  <p>Please Don't make more than one Upload. So please check all the
                                  data are correct and then upload your data.
                                  </p>
                                </li>
                                <br />
                                <li> <p>In case of any issuse to reach us<b> team-developers@objectways.com</b></p>
                                  </li>
                              </ul>
                            </MDTypography>
                          </MDBox>
                        </Grid>
                      </MDBox>
                    </Card>
                  </Grid>
                </Grid>
              </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
      <ToastContainer />
    </>
  );
}

export default Dashboard;
