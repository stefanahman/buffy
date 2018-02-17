import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    paddingBottom: 15
  },
  menu: {
    width: 200,
  },
});


class ConcField extends React.Component {
  state = {
    concentration: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    this.props.callbackFromParent(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <TextField
        id="concentration"
        label="Final concentration"
        className={classes.textField}
        value={this.state.value}
        onChange={this.handleChange('concentration')}
        type="number"
        margin="normal"
      />
    );
  }
}

ConcField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConcField);
