import React from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from "react-redux";

import { undoUserAction, redoUserAction } from "../redux/user.state";
import { undoPostAction, redoPostAction } from "../redux/post.state";

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <div className="d-flex mt-3">
    <button onClick={onUndo} disabled={!canUndo}>
      Undo All
    </button>
    <button onClick={onRedo} disabled={!canRedo} className="ml-auto">
      Redo All
    </button>
  </div>
);

const mapStateToProps = state => {
  console.log("UndoRedo: mapStateToProps", state);
  return {
    canUndo: state.userState.past.length > 0 || state.postState.past.length > 0,
    canRedo:
      state.userState.future.length > 0 || state.postState.future.length > 0
  };
};

/*
const mapDispatchToProps = {
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo
};
*/

const mapDispatchToProps = dispatch => {
  return {
    onUndo: user => {
      dispatch(undoUserAction());
      dispatch(redoPostAction());
    },
    onRedo: user => {
      dispatch(redoUserAction());
      dispatch(redoPostAction());
    }
  };
};

UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);

export default UndoRedo;
