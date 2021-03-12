import React, { useEffect } from 'react';
import { loadLists } from './store/list';
import { useDispatch, connect } from 'react-redux'

import List from './components/List'
import AddList from './components/AddList'

function App({ lists }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadLists())
  }, [dispatch])

  return (
    <>
      <h1>To Do, To Done, Ta Da!</h1>
      <AddList />
      <div className="lists-container">
        {lists && lists.map((list) => <List list={list} key={list.id} />)}
      </div>
    </>
  );
}

const mapStateToProps = state => ({ lists: state.lists })

export default connect(mapStateToProps)(App);
