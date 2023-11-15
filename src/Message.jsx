import './index.css';
import PropTypes from 'prop-types';

const Message = ({ message }) => (
  <div className="message-container">
    <div className="show-message">{message}</div>
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
