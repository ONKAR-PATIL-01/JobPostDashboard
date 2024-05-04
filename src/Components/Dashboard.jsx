/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../ReduxToolkit/dashboardSlice';
import { CircularProgress, Typography, Paper, Card, CardContent, CardHeader, CardActions, IconButton, Link, Grid } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, error, status } = useSelector(state => state.dashboard);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

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
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* {status === 'loading' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      )} */}
      
      {status === 'failed' && (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8d7da', borderRadius: '10px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="subtitle1" color="error">
            Error: {error}
          </Typography>
        </Paper>
      )}
      
      {(status === 'succeeded' ||status === 'loading') && (
        <Grid container spacing={3}>
          {data.map(job => (
            <Grid item xs={12} sm={6} md={4} key={job.jdUid}>
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
      )}
    </div>
  );
};

export default Dashboard;
