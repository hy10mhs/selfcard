import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';

const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options,
    upperSel
}) => {
    let selectOptions;

    if( typeof upperSel !== 'string' ) {
        selectOptions = options.map(option => (
            <option key={option.label} label={option.label} value={option.value}>{option.label}</option>
        ));
    } else {
        selectOptions = options.map(option => option.upperSel === upperSel ? (
            <option key={option.label} label={option.label} value={option.value}>{option.label}</option>
        ): null);
    }

    return (
        <div className="form-group">
        <select
            className={classnames('form-control form-control-lg', {
            'is-invalid': error
            })}
            name={ name }
            value={ value }
            onChange={ onChange }
        >
            { selectOptions }
        </select>
        { info && <small className="form-text text-muted">{ info }</small>}
        { error && ( <div className="invalid-feedback">{ error }</div> ) }
        </div>
  )
};

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    upperSel: PropTypes.string
};

export default SelectListGroup;
