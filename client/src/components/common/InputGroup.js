import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
		<inpit className="group-prepend">
			<span className="input-group-text">
				<i className={icon}/>
			</span>
		</inpit>
      <textarea
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

InputGroup.defalutProps = {
	type: 'text'
}

export default InputGroup;
