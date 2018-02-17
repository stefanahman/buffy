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


class InputField extends React.Component {
  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <TextField
        id={this.props.id || "id"}
        label={this.props.label}
        className={classes.textField}
        value={this.props.value}
        onChange={this.handleChange}
        type={this.props.type || "number"}
        margin={this.props.margin || "normal"}
      />
    );
  }
}

InputField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputField);
