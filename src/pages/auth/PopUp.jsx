import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PopUp = ({ show, onHide, title, children, footerButtons, size }) => {
  return (
    <Modal show={show} onHide={onHide} centered size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footerButtons && (
        <Modal.Footer>
          {footerButtons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant || 'primary'}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          ))}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default PopUp;
