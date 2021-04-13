import React from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from "react-redux";

import { undoAction, redoAction } from "../redux/undoable-jag-impl";

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <div className="d-flex mt-3">
    <button onClick={onUndo} disabled={!canUndo}>
      Undo All Modules
    </button>
    <button onClick={onRedo} disabled={!canRedo} className="ml-auto">
      Redo All Modules
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

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => {
      dispatch(undoAction());
    },
    onRedo: () => {
      dispatch(redoAction());
    }
  };
};

UndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);

export default UndoRedo;
