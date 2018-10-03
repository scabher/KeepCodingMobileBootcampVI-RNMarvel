import { connect } from "react-redux";
import * as CharactersActions from "../../../redux/characters/actions";
import View from "./view";

const mapStateToProps = state => {
  return {
    comic: state.comics.item,
    isFetching: state.characters.isFetching
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmitCharacter: data => {
      dispatch(CharactersActions.postComicsCharacter(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
