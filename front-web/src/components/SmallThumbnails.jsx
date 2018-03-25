import React, { Component } from 'react';
import { connect } from 'react-redux';

function SmallThumbnails({ className, style, children }) {
  return (
    <div className="col-md-4 col-sm-6">
      <div
        className={`thumbnail ${className}`}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}

SmallThumbnails.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
};

SmallThumbnails.getDefaultProps = {
  className: '',
  style: {},
};

export default SmallThumbnails;
