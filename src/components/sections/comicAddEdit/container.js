import { connect } from "react-redux";
import * as ComicsActions from "../../../redux/comics/actions";
import View from "./view";

const mapStateToProps = state => {
  return {
    comic: state.comics.item,
    isFetching: state.comics.isFetching
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmitComic: data => {
      dispatch(ComicsActions.postComic(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
