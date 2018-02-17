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
  constructor(props) {
    super(props);
    this.state = {
      atomMasses: AtomMasses(),
      chemicalFormula: '',
      mole: 0,
      molarMass: 0
    };
  };

  handleChange = (e) => {
    var moleculeAtoms = e.target.value.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1)
    var totalMass = 0

    for (var i = 0; i < moleculeAtoms.length; i++) {
      var atomParts = moleculeAtoms[i].match(/[a-zA-Z]+|[0-9]+/g) // O2 => [O,2]

      var mass = parseFloat(this.state.atomMasses[atomParts[0]])
      var amount = parseInt(atomParts[1], 0) || 1

      totalMass += mass * amount
    }

    this.setState({
      chemicalFormula: e.target.value,
      molarMass: totalMass
    });
  };

  totalWeight = () => {
    return parseFloat(this.state.molarMass || 0) * parseFloat(this.props.mole)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl} aria-describedby="chemical-formula-helper-text" required>
          <InputLabel htmlFor="chemicalFormula">{this.props.label}</InputLabel>
          <Input
            id="chemicalFormula"
            value={this.state.acid}
            onChange={this.handleChange}
          />
          <FormHelperText id="chemical-formula-helper-text">Chemical formula</FormHelperText>
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
            value={this.totalWeight()}
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
