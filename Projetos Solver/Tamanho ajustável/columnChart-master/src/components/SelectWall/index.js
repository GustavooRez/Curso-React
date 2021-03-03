import React from "react";
import PropTypes from "prop-types";
//eslint-disable-next-line
import { default as ReactSelect } from "react-select";

// specify props.allowSelectAll = true to enable!
const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '2',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);
function getOptionslength(options) {
    if (options.length) {
        return options[0].options ? options.map(e => e.options.length).reduce((a, b) => a + b) : options.length
    }
    return 0;
}
const SelectwAll = props => {

    if (props.allowSelectAll) {
        return (
            <ReactSelect
                {...props}
                noOptionsMessage={() => ''}
                formatGroupLabel={formatGroupLabel}
                options={!(Boolean(props.value) &&
                    ((props.value === props.allOption) || (props.value.length === getOptionslength(props.options)))) ?
                    [props.allOption, ...props.options]
                    : []}
                onChange={(selected) => {
                    if (
                        Boolean(selected) && selected.length > 0 && ((Boolean(props.value)
                            && ((selected.length === getOptionslength(props.options)))) || (selected[selected.length - 1].value === props.allOption.value))
                    ) {
                        return props.onChange(props.allOption);
                    }

                    if (selected === null || !Boolean(selected.length) || !selected.map(e => Boolean(e.sub_label)).reduce((a, b) => a & b)) return props.onChange(selected)

                    const return_value = selected.map((e) => {
                        return {
                            value: e.value,
                            label: `${e.fxd_label ? e.fxd_label : e.label}[${e.fxd_sub_label ? e.fxd_sub_label : e.sub_label}]`,
                            fxd_label: e.fxd_label ? e.fxd_label : e.label,
                            fxd_sub_label: e.fxd_sub_label ? e.fxd_sub_label : e.sub_label,
                            sub_label: e.sub_label
                        }
                    })
                    console.log(props.onChange(return_value))
                    return props.onChange(return_value);
                }}
            />
        );
    }

    return <ReactSelect {...props} />;
};

SelectwAll.propTypes = {
    options: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func,
    allowSelectAll: PropTypes.bool,
    allOption: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })
};

SelectwAll.defaultProps = {
    allOption: {
        label: "Todos",
        value: "*"
    }
};

export default SelectwAll;