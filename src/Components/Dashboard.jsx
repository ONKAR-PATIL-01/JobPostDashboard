/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../ReduxToolkit/dashboardSlice';
import { CircularProgress, Typography, Paper, Card, CardContent, CardHeader, CardActions, IconButton, Link, Grid, Box, TextField } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, error, status } = useSelector(state => state.dashboard);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
 const[flag,setflag]=useState(0);


  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    role: '',
    experience: '',
    location: '',
    companyName: '',
    minimumBasePay: '',
  });

  useEffect(() => {
    // Filter data when filters change
    filterData();
  }, [data, filters]);


  // Function to filter data based on selected filters
console.log(filters);
console.log(filteredData);
  // Function to filter data based on selected filters
  const filterData = () => {
    let filteredJobs = [...data]; // Create a copy of the data array
  
    // Apply filters
    if (filters.role) {
      const roleFilter = filters.role.toLowerCase();
      filteredJobs = filteredJobs.filter(job => job.jobRole && job.jobRole.toLowerCase().includes(roleFilter));
    }
    if (filters.experience) {
      const experienceFilter = parseFloat(filters.experience);
      filteredJobs = filteredJobs.filter(job => job.minExp === experienceFilter);
    }
    if (filters.location) {
      const locationFilter = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job => job.location && job.location.toLowerCase().includes(locationFilter));
    }
    if (filters.companyName) {
      const companyNameFilter = filters.companyName.toLowerCase();
      filteredJobs = filteredJobs.filter(job => job.companyName && job.companyName.toLowerCase().includes(companyNameFilter));
    }
    if (filters.minimumBasePay) {
      const minimumBasePayFilter = parseFloat(filters.minimumBasePay);
      filteredJobs = filteredJobs.filter(job => job.minJdSalary && parseFloat(job.minJdSalary) >= minimumBasePayFilter);
    }
  
    setFilteredData(filteredJobs);

  };
  

  // Function to handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };























  useEffect(() => {
    dispatch(fetchData({ limit, offset }));
  }, [dispatch, limit, offset]);

useEffect(() => {
  // Fetch initial data
  dispatch(fetchData({ limit, offset }));

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Remove scroll event listener on component unmount
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [dispatch, limit, offset]); // Dependency array includes dispatch, limit, and offset

const handleScroll = () => {

    // dispatch(fetchData({ limit, offset }));

//   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//     // Check if there are more items to load
//     if (data.length < totalCount) {
//       // Increment offset to load more items
      setOffset(prevOffset => prevOffset + limit);
//     }
//   }
};

  return (
    <div style={{ padding: '20px' }}>

<Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
<TextField
        label="Role"
        value={filters.role}
        onChange={e => handleFilterChange('role', e.target.value)}
      />
      <TextField
        label="Experience"
        value={filters.experience}
        onChange={e => handleFilterChange('experience', e.target.value)}
      />
      <TextField
        label="Location"
        value={filters.location}
        onChange={e => handleFilterChange('location', e.target.value)}
      />
      <TextField
        label="Company Name"
        value={filters.companyName}
        onChange={e => handleFilterChange('companyName', e.target.value)}
      />
      <TextField
        label="Minimum Base Pay"
        type="number"
        value={filters.minimumBasePay}
        onChange={e => handleFilterChange('minimumBasePay', e.target.value)}
      />
</Box>


























      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* {status === 'loading' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      )} */}
      
   
      
   
        <Grid container spacing={3}>
          {filteredData.map((job,index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ height: '100%' }}>
                <CardHeader
                  title={<Typography variant="h6">{job.companyName}</Typography>}
                  subheader={<Typography variant="subtitle2">{job.location}</Typography>}
                  avatar={<img src={job.logoUrl} alt={job.companyName} style={{ width: '50px', height: 'auto', borderRadius: '50%' }} />}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="div" style={{ height: '100px', overflow: 'hidden' }}>
                    <Link href={job.jdLink} target="_blank" rel="noopener" underline="none" color="inherit">
                      {job.jobDetailsFromCompany.substring(0, 150)}...
                    </Link>
                  </Typography>
                  
                  <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                    <Typography variant="body2" color="textPrimary" component="p" style={{ fontWeight: 'bold' }}>
                      Role: <span style={{ textTransform: 'capitalize' }}>{job.jobRole}</span>
                    </Typography>
                    {job.minExp && job.maxExp && (
                      <Typography variant="body2" color="textPrimary" component="p" style={{ marginTop: '5px' }}>
                        Experience: {job.minExp} - {job.maxExp} years
                      </Typography>
                    )}
                    {job.minJdSalary && job.maxJdSalary && (
                      <Typography variant="body2" color="textPrimary" component="p" style={{ marginTop: '5px' }}>
                        Salary: ${job.minJdSalary} - ${job.maxJdSalary}
                      </Typography>
                    )}
                  </div>
                  
                  <CardActions>
                    <IconButton
                      aria-label="easy-apply"
                      disabled={true}
                      style={{
                        width: '50%', // Adjust width to fit card
                        backgroundColor: '#000',
                        color: '#fff',
                        fontSize: '16px',
                        borderRadius: '5px',
                        padding: '10px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s',
                      }}
                    >
                      Unlock Referral asks <LockIcon />
                    </IconButton>
                    <IconButton
                      aria-label="disable-referral"
                      disabled={true}
                      style={{
                        width: '50%', // Adjust width to fit card
                        backgroundColor: '#00f',
                        color: '#fff',
                        fontSize: '16px',
                        borderRadius: '5px',
                        padding: '10px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s',
                      }}
                    >
                      Easy Apply <CheckCircleIcon />
                    </IconButton>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
    
    </div>
  );
};

export default Dashboard;
