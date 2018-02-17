import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import AtomMasses from './AtomMasses';

const styles = theme => ({
  container: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    borderTopStyle: 'dotted',
    paddingBottom: 15
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 300,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});


class AcidBaseField extends React.Component {
  state = {
    acidBase: '',
    mole: 0,
    molarMass: 0
  };

  handleChange = event => {
    var molecule_atoms = event.target.value.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1)

    var atomMasses = AtomMasses()
    var molarMass = 0

    for (var i = 0; i < molecule_atoms.length; i++) {
      var atom_obj = molecule_atoms[i].match(/[a-zA-Z]+|[0-9]+/g) // O2 => [O,2]

      var atom = atom_obj[0]
      var number = parseInt(atom_obj[1], 0) || 1
      var atom_weight = parseFloat(atomMasses[atom])

      molarMass += atom_weight * number
    }

    this.setState({
      acidBase: event.target.value,
      molarMass: molarMass
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl} aria-describedby="acidBase-helper-text">
          <InputLabel htmlFor="acidBase">{this.props.label}</InputLabel>
          <Input
            id="acidBase"
            value={this.state.acid}
            onChange={this.handleChange}
          />
          <FormHelperText id="acidBase-helper-text">Chemical formula</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} aria-describedby="molar-mass-helper-text" disabled>
          <Input
            value={this.state.molarMass}
            endAdornment={<InputAdornment position="end">gram/mole</InputAdornment>}
          />
          <FormHelperText id="molar-mass-helper-text">Molar mass</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} aria-describedby="molecule-weight-helper-text" disabled>
          <Input
            value={this.props.mole}
            endAdornment={<InputAdornment position="end">mole</InputAdornment>}
          />
          <FormHelperText id="molecule-weight-helper-text">Calculated mole based on input</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} aria-describedby="molecule-weight-helper-text" disabled>
          <Input
            value={parseFloat(this.state.molarMass || 0)*parseFloat(this.props.mole)}
            endAdornment={<InputAdornment position="end">gram</InputAdornment>}
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
