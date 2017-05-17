import React from 'react';
import PropTypes from 'prop-types';
import classNames                       from 'classnames';
import './toggle.scss';
const Toggle = ({clickHandler, text, icon, active, large}) => {
  const buttonClass = classNames({
    'button-toggle': true,
    'no-icon': !icon,
    active,
    large,
  });
  const iconClass = `fa fa-fw fa-${icon}`;
  console.log('Button class = ',buttonClass);
  console.log('icon Class = ', iconClass);
  return (
    <button className={buttonClass} onClick={clickHandler}>
      <i className={iconClass} />
      {text}
    </button>
  );
};

export default Toggle;
// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
//
// class Toggle extends React.Component {
//   static propTypes = {
//       clickHandler: PropTypes.func,
//       text: PropTypes.string,
//       icon: PropTypes.string,
//       active: PropTypes.bool,
//       large: PropTypes.bool
//   };
//   constructor(props) {
//     super(props);
//   }
//   render(){
//     const buttonClass = classNames({
//       'button-toggle': true,
//       'no-icon': !this.props.icon,
//       'active': this.props.active,
//       'large':  this.props.large
//     });
//     console.log('Button Class = ', buttonClass);
//     const iconClass = `fa fa-fw fa-${this.props.icon}`;
//     console.log('icon Class = ', iconClass);
//     return(
//       <button className={buttonClass} onClick={clickHandler}>
//         <i className={iconClass} />
//         {this.props.text}
//       </button>
//     );
//   }
// }
//
// export default Toggle;
