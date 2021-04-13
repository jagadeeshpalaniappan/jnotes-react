import React from "react";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { connect } from "react-redux";

import { undoPostAction, redoPostAction } from "../redux/post.state";

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <div className="d-flex mt-5">
    <button onClick={onUndo} disabled={!canUndo}>
      Undo Post
    </button>
    <button onClick={onRedo} disabled={!canRedo} className="ml-auto">
      Redo Post
    </button>
  </div>
);

const mapStateToProps = state => {
  console.log("UndoRedo: mapStateToProps", state);
  return {
    canUndo: state.postState.past.length > 0,
    canRedo: state.postState.future.length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => dispatch(undoPostAction()),
    onRedo: () => dispatch(redoPostAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UndoRedo);
