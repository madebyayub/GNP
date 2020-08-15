import React from "react";
import Modal from "react-modal";
import "../../stylesheets/confirmationmodal.css";

import { getSizeEstimate } from "../../actions/timeline";

Modal.setAppElement("#root");
class ConfirmationModal extends React.Component {
  /* 

  ------- Render function ----------

    This component renders a modal on the screen that asks the user to confirm whether
    they are willing to accept the request they clicked accept request on.

    The modal is displayed depending on the confirmation prop that is passed down from the parent.
    If confirmation is true, it displays the modal, otherwise the modal is hidden.

  */
  render() {
    if (this.props.confirmation.display) {
      return (
        <Modal
          isOpen={this.props.confirmation.display ? true : false}
          onRequestClose={this.props.closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 1031,
            },
            content: {
              padding: "0",
              border: "none",
              borderRadius: "5px",
              boxShadow: "0 0 15px rgba(0,0,0,0.5)",
              backgroundColor: " rgba(240,240,240,0.95)",
              width: "40%",
              minWidth: "300px",
              height: "50vh",
              margin: "auto",
            },
          }}
        >
          <div className="confirmation-modal-header">
            <button
              id="close-modal-btn"
              className="post-edit-cancel"
              onClick={this.props.closeModal}
            >
              <i className="fas fa-times"></i>
            </button>
            <span>Are you sure you want to accept this request?</span>
          </div>
          <div className="confirmation-info">
            <div className="confirmation-author">
              <label>Request made by</label>
              <img
                src={
                  this.props.confirmation.selectedPost.author.profile_picture
                }
                alt="requester-profile"
              ></img>
              <div className="profile-info">
                <p>{this.props.confirmation.selectedPost.author.first_name}</p>
              </div>
            </div>
            <div className="confirmation-size">
              <label>Size of Request</label>
              <p>{getSizeEstimate(this.props.confirmation.selectedPost)}</p>
            </div>
          </div>
          <div className="confirmation-actions">
            <button className="cancel-action" onClick={this.props.closeModal}>
              Cancel
            </button>
            <button
              className="accept-action"
              onClick={() =>
                this.props.acceptPost(this.props.confirmation.selectedPost)
              }
            >
              Confirm
            </button>
          </div>
        </Modal>
      );
    } else {
      return <></>;
    }
  }
}

export default ConfirmationModal;
