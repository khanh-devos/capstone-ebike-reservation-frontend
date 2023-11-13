import PropTypes from 'prop-types';

import './reservation.css';

export default function MirrorCover({ bike }) {
  return (
    <>
      <img
        className="reservation-page-background"
        alt="reservarion-background"
        src={bike?.image || 'https://cdn.shopify.com/s/files/1/1439/6088/files/thin.jpg?width=100;height:100'}
      />

      <div className="reservation-page-bg-cover" />
    </>
  );
}

MirrorCover.propTypes = {
  bike: PropTypes.shape.isRequired,
};
