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
  },
  menu: {
    width: 200,
  },
});


class PkaField extends React.Component {
  state = {
    value: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <TextField
        id="pka"
        label="pKa"
        className={classes.textField}
        value={this.state.value}
        onChange={this.handleChange('value')}
        type="number"
        margin="normal"
      />
    );
  }
}

PkaField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PkaField);
