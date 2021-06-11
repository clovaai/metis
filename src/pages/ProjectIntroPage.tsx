import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { AppState } from 'app/rootReducer';
import { createProjectInfos } from 'features/projectInfosSlice';
import NavBar from 'components/NavBar';
import ProjectCard from 'components/ProjectCard';
import NewProjectSection from 'components/NewProjectSection';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      marginTop: 130,
      position: 'relative',
      flexGrow: 1,
      height: '100vh',
    },
    sectionTitle: {
      margin: '25px 0',
    },
  }),
);

export default function ProjectIntroPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const projectInfos = useSelector((state: AppState) => state.projectInfosState.projectInfos);

  useEffect(() => {
    dispatch(createProjectInfos());
  }, []);

  return (
    <div className={classes.root}>
      <NavBar />
      <Container className={classes.content}>
        <Typography className={classes.sectionTitle} variant="h5" component="h5">
          Create a project
        </Typography>
        <NewProjectSection />
        <Typography className={classes.sectionTitle} variant="h5" component="h5">
          All projects
        </Typography>
        <Grid container spacing={2}>
          {Object.values(projectInfos).map((projectInfo) => (
            <Grid key={projectInfo.id} item>
              <ProjectCard projectInfo={projectInfo} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
