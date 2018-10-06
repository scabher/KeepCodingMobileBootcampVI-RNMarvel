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
      if (props.isEdit) {
        dispatch(ComicsActions.postComic(data));
      } else {
        dispatch(ComicsActions.addComic(data));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
