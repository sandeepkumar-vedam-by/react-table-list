import React from 'react';
import './App.css';
import { useStyles } from './styles';
import { AppBar, CssBaseline, Toolbar, Typography, Container } from '@material-ui/core';
import { SalesListTable } from './Table';

export const App = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Sales List
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.content}>
          <Container maxWidth="md">
                {/* <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  Sales List
                </Typography> */}
                <SalesListTable />
          </Container>
        </div>
      </main>
      </React.Fragment>
  );
}
