import View from "./view";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    comic: state.comics.item
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
