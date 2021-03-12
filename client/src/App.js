import React, { useEffect } from 'react';
import { loadLists } from './store/list';
import { useDispatch, connect } from 'react-redux'

function App(lists) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadLists())
  }, [dispatch])

  useEffect(() => {
    console.log(lists)
  }, [lists])

  return (


    <>
      <h1>To Do, To Done, Ta Da!</h1>
      <div>

      </div>
    </>
  );
}

const mapStateToProps = state => ({ lists: state.lists })

export default connect(mapStateToProps)(App);
