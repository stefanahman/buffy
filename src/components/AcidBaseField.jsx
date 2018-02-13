import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import AtomWeights from './AtomWeights';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});


class AcidBaseField extends React.Component {
  state = {
    acid: '',
    molecule_weight: 0
  };

  handleChange = event => {
    var molecule_atoms = event.target.value.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1)

    var atom_weights = AtomWeights()
    var molecule_weight = 0

    for (var i = 0; i < molecule_atoms.length; i++) {
      var atom_obj = molecule_atoms[i].match(/[a-zA-Z]+|[0-9]+/g) // O2 => [O,2]

      var atom = atom_obj[0]
      var number = parseInt(atom_obj[1], 0) || 1
      var atom_weight = parseFloat(atom_weights[atom])

      molecule_weight += atom_weight * number
    }

    this.setState({
      acid: event.target.value,
      molecule_weight: molecule_weight
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl} aria-describedby="acid-helper-text">
          <InputLabel htmlFor="acid">{this.props.label}</InputLabel>
          <Input
            id="acid"
            value={this.state.acid}
            onChange={this.handleChange}
          />
          <FormHelperText id="acid-helper-text">Chemical name</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} aria-describedby="molecule-weight-helper-text" disabled>
          <Input
            value={this.state.molecule_weight}
            endAdornment={<InputAdornment position="end">mole/L</InputAdornment>}
          />
          <FormHelperText id="molecule-weight-helper-text">Total weight</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

AcidBaseField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AcidBaseField);
