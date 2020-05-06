import React from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from "react-redux";

import { undoUserAction, redoUserAction } from "../redux/user.state";

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <div className="d-flex mt-3">
    <button onClick={onUndo} disabled={!canUndo}>
      Undo User
    </button>
    <button onClick={onRedo} disabled={!canRedo} className="ml-auto">
      Redo User
    </button>
  </div>
);

const mapStateToProps = state => {
  console.log("UndoRedo: mapStateToProps", state);
  return {
    canUndo: state.userState.past.length > 0,
    canRedo: state.userState.future.length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(undoUserAction()),
    onRedo: () => dispatch(redoUserAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);
