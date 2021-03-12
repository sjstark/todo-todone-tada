import React, { useEffect } from 'react';
import { loadLists } from './store/list';
import { useDispatch, connect } from 'react-redux'

import { Box, Container, Typography } from '@material-ui/core'

import ListElement from './components/List'
import AddList from './components/AddList'

function App({ lists }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadLists())
  }, [dispatch])

  return (
    <Container maxWidth="md">
      <Box bgcolor="primary.main" color="white">
        <Typography align="center" variant="h2" maxWidth="100%">To Do, To Done, Ta Da!</Typography>
      </Box>
      <AddList />
      <Container>
        {lists && lists.map((list) => <ListElement list={list} key={list.id} />)}
      </Container>
    </Container>
  );
}

const mapStateToProps = state => ({ lists: state.lists })

export default connect(mapStateToProps)(App);
