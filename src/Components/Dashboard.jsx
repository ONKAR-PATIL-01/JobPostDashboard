import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../ReduxToolkit/dashboardSlice';
import { CircularProgress, Typography, Paper, Card, CardContent, CardHeader, CardActions, Button, Grid, IconButton, Link } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlurOnIcon from '@mui/icons-material/BlurOn';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, error, status } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {status === 'loading' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </div>
      )}
      {status === 'failed' && (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f8d7da', borderRadius: '10px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="subtitle1" color="error">
            Error: {error}
          </Typography>
        </Paper>
      )}
      {status === 'succeeded' && (
        <Grid container spacing={3}>
          {data.jdList.map(job => (
            <Grid item xs={12} sm={6} md={4} key={job.jdUid}>
              <Card style={{ height: '100%' }}>
                <CardHeader
                  title={<Typography variant="h6">{job.companyName}</Typography>}
                  subheader={<Typography variant="subtitle2">{job.location}</Typography>}
                  avatar={<img src={job.logoUrl} alt={job.companyName} style={{ width: '50px', height: 'auto', borderRadius: '50%' }} />}
                />
                <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="body2" color="textSecondary" component="div" style={{ height: '100px', overflow: 'hidden' }}>
                    <Link href={job.jdLink} target="_blank" rel="noopener" underline="none" color="inherit">
                      {`${job.jobDetailsFromCompany.substring(0, 150)}...`} <BlurOnIcon fontSize="small" />
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    Role: {job.jobRole}
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    Experience: {job.minExp} - {job.maxExp} years
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    Salary: {job.minJdSalary ? `$${job.minJdSalary}` : ''} {job.minJdSalary && job.maxJdSalary ? '-' : ''} {job.maxJdSalary ? `$${job.maxJdSalary}` : ''}
                  </Typography>
                </CardContent>
                <CardActions>
  <IconButton aria-label="easy-apply" disabled={true} style={{ color: '#000', fontSize: '16px' }}>
    Refer <LockIcon />
  </IconButton>
  <IconButton aria-label="disable-referral" disabled={true} style={{ color: '#00f', fontSize: '16px' }}>
    Easy Apply <CheckCircleIcon />
  </IconButton>
</CardActions>

              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Dashboard;
