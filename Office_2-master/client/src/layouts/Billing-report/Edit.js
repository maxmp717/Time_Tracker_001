import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";
import {ToastContainer,toast} from 'react-toastify';
import {useParams} from 'react-router-dom';


function Edit() {
  // const { columns, rows } = authorsTableData();
  const [count, setCount] = useState({ aTotal: "", hTotal: "", jTotal: "" });
  const [bill, setBill] = useState({
    tDate: '',
    team: "",
    batch: "",
    associated: {
      annotation: 0,
      qc: 0,
      pmsme: 0,
    },
    hours: {
      annotation: 0,
      qc: 0,
      pmsme: 0,
      projecttraning: 0,
      ojt: 0,
      qualityannotator: 0,
      idelhours: 0,
      other: 0,
      comments: "",
    },
    jobs: {
      annotation: 0,
      qc: 0,
    },
  });
  
  const empId = useSelector((state)=>state.auth.user.empId);
  const name = useSelector((state)=>state.auth.user.name)

  const [teamList, setTeamList] = useState(null);


  const handleTeamChange = (event, value) => setBill({...bill,team:value});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBill({
      ...bill,
      [name]: value,
      // team: teamList,
    });
  };

 
  useEffect(() => {
    var assTotal =
      bill.associated.annotation + bill.associated.qc + bill.associated.pmsme;
    var hourTotal =
      bill.hours.annotation +
      bill.hours.qc +
      bill.hours.pmsme +
      bill.hours.projecttraning +
      bill.hours.ojt +
      bill.hours.qualityannotator +
      bill.hours.idelhours +
      bill.hours.other;
    var jobTotal = bill.jobs.annotation + bill.jobs.qc;
    setCount({
      ...count,
      aTotal: assTotal,
      hTotal: hourTotal,
      jTotal: jobTotal,
    });
  }, [bill]);
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
 const {id} = useParams()
 useEffect(() => {
    axios.get('/billing/'+id)
    .then(res=>{
      setBill({
        ...bill,
        tDate:moment(res.data.reportDate).format("YYYY-MM-DD"),
        team:res.data.team,
        batch:res.data.batch,
        associated:{
            annotation:res.data.associated.annotation,
            qc:res.data.associated.qc,
            pmsme:res.data.associated.pm,
        },
        hours:{
            annotation:res.data.hours.annotation,
            qc:res.data.hours.qc,
            pmsme:res.data.hours.pm,
            projecttraning:res.data.hours.training,
            ojt:res.data.hours.ojt,
            qualityannotator:res.data.hours.qcFeedback,
            other:res.data.hours.other,
            idelhours:res.data.hours.idle,
            comments:res.data.hours.comments,
          },
          jobs:{
            annotation:res.data.jobs.annotation,
            qc:res.data.jobs.qc,
          },
     })
     setCount({
      ...count,
        aTotal:res.data.associated.total,
        hTotal:res.data.hours.total,
        jTotal:res.data.jobs.total,
     })
    })
     .catch(err=>console.error(err))
   console.log(bill.tDate)
  },[]);
  // console.log(bill)
  // console.log(teamList)
  // console.log(bill.team)

  const submit = (e) => {
    e.preventDefault();
    const billData = {
      name:name,
      team:bill.team,
      empId:empId,
      batch:bill.batch,
      reportDate:bill.tDate,
      associated:{
        annotation:bill.associated.annotation,
        qc:bill.associated.qc,
        pm:bill.associated.pmsme,
        total:count.aTotal,
      },
      hours:{
        annotation:bill.hours.annotation,
        qc:bill.hours.qc,
        pm:bill.hours.pmsme,
        training:bill.hours.projecttraning,
        ojt:bill.hours.ojt,
        qcFeedback:bill.hours.qualityannotator,
        other:bill.hours.other,
        idle:bill.hours.idelhours,
        total:count.hTotal,
        comments:bill.hours.comments
      },
      jobs:{
        annotation:bill.jobs.annotation,
        qc:bill.jobs.qc,
        total:count.jTotal
      }
    }
    axios.post('/billing/update/'+id,billData)
    .then((res)=>toast.success(res.data))
    .then(()=>window.location = '/billing-Tabel')
    .catch(err=>toast.error(err))
    // console.log(billData)
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} mt={1} mb={40}>
        <Card>
          <MDBox pb={5} component="form" role="form" onSubmit={submit}>
            <MDBox
              mx={2}
              // mt={-3}
              py={3}
              pt={3}
              px={2}
              variant="gradient"
              bgColor="success"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Reports
              </MDTypography>
            </MDBox>
            <MDBox pb={5} pt={6} px={4} display="flex">
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Date
                  </MDTypography>
                  <MDInput
                    type="date"
                    name="tDate"
                    value={bill.tDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                {/* </Grid> */}
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Team
                  </MDTypography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={list}
                    isOptionEqualToValue={(list, value)=> list.value === value.value}
                    value={bill.team}
                    onChange={handleTeamChange}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Batch
                  </MDTypography>
                  <MDInput
                    type="text"
                    name="batch"
                    value={bill.batch}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </MDBox>

            <MDBox
              mx={2}
              // mt={-3}
              py={3}
              pt={3}
              px={2}
              variant="gradient"
              bgColor="success"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Count of Associates
              </MDTypography>
            </MDBox>
            <MDBox
              pb={5}
              pt={6}
              px={4}
              display="flex"
              justifycontent="space-evenly"
              alignItems="center"
            >
              <Grid container spacing={1}>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Annotation
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="annotation"
                    value={bill.associated.annotation}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        associated: {
                          ...bill.associated,
                          annotation: Number(e.target.value),
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    QC
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="qc"
                    value={bill.associated.qc}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        associated: {
                          ...bill.associated,
                          qc: Number(e.target.value),
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    PM + SME
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="pmsme"
                    value={bill.associated.pmsme}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        associated: {
                          ...bill.associated,
                          pmsme: Number(e.target.value),
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Total
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="total"
                    InputProps={{ readOnly: true }}
                    value={count.aTotal}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        associated: {
                          ...bill.associated,
                          total: Number(e.target.value),
                        },
                      })
                    }
                  />
                </Grid>
              </Grid>
            </MDBox>
            <MDBox
              mx={2}
              // mt={-3}
              py={3}
              pt={3}
              px={2}
              variant="gradient"
              bgColor="success"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Total Hours Spent
              </MDTypography>
            </MDBox>
            <MDBox
              pb={5}
              pt={6}
              px={4}
              display="flex"
              justifycontent="space-evenly"
              alignItems="center"
            >
              <Grid container spacing={3}>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Annotation
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="annotation"
                    value={bill.hours.annotation}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        hours: {
                          ...bill.hours,
                          annotation: Number(e.target.value),
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    QC
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="qc"
                    value={bill.hours.qc}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        hours: { ...bill.hours, qc: Number(e.target.value) },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    PM + SME
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="pmsme"
                    value={bill.hours.pmsme}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        hours: { ...bill.hours, pmsme: Number(e.target.value) },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Project Traning
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="projecttraning"
                    value={bill.hours.projecttraning}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        hours: {
                          ...bill.hours,
                          projecttraning: Number(e.target.value),
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    OJT
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="ojt"
                    value={bill.hours.ojt}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        hours: { ...bill.hours, ojt: Number(e.target.value) },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Quality Annatator
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="qualityannotator"
                    value={bill.hours.qualityannotator}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        hours: {
                          ...bill.hours,
                          qualityannotator: Number(e.target.value),
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Idle Hours
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="idlehours"
                    value={bill.hours.idelhours}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        hours: {
                          ...bill.hours,
                          idelhours: Number(e.target.value),
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Other
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="other"
                    value={bill.hours.other}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        hours: { ...bill.hours, other: Number(e.target.value) },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Comments
                  </MDTypography>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={4}
                    name="comments"
                    value={bill.hours.comments}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        hours: { ...bill.hours, comments: e.target.value },
                      })
                    }
                    // placeholder="Minimum 3 rows"
                    style={{ width: 200 }}
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Total
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="total"
                    InputProps={{ readOnly: true }}
                    value={count.hTotal}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        hours: { ...bill.hours, total: Number(e.target.value) },
                      })
                    }
                  />
                </Grid>
              </Grid>
            </MDBox>
            <MDBox
              mx={2}
              // mt={-3}
              py={3}
              pt={3}
              px={2}
              variant="gradient"
              bgColor="success"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Total Jobs Worked on
              </MDTypography>
            </MDBox>
            <MDBox
              pt={6}
              px={4}
              display="flex"
              justifycontent="space-evenly"
              alignItems="center"
            >
              <Grid container spacing={2}>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Annotation Batch
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="annotation"
                    value={bill.jobs.annotation}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        jobs: {
                          ...bill.jobs,
                          annotation: Number(e.target.value),
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    QC Batch
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="qc"
                    value={bill.jobs.qc}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        jobs: { ...bill.jobs, qc: Number(e.target.value) },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={2} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Total
                  </MDTypography>
                  <MDInput
                    type="number"
                    name="total"
                    InputProps={{ readOnly: true }}
                    value={count.jTotal}
                    onChange={(e) =>
                      setBill({
                        ...bill,
                        jobs: { ...bill.jobs, total: Number(e.target.value) },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={1} md={2}>
                  <MDBox
                    pt={4}
                    pb={3}
                    // px={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <MDButton variant="gradient" color="warning" type="submit">
                      &nbsp;Update
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <Footer />
      <ToastContainer/>
    </DashboardLayout>
  );
}
export default Edit;
