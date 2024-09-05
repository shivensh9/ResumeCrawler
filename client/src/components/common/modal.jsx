import React from "react";
import { ClipLoader } from "react-spinners";

const Modal = ({
  open,
  children,
  title,
  closeModalFn,
  saveFn,
  loading,
  saveFnRequired = true,
}) => {
  if (!open) return null;
  else
    return (
      <div className="custom-modal-outer">
        <div className="custom-modal-inner">
          <div className="custom-modal-wrapper">
            <div className="custom-modal-header">
              <h2>{title}</h2>
            </div>
            <div className="custom-modal-body">{children}</div>
            <div className="custom-modal-footer">
              <button
                type="button"
                onClick={closeModalFn}
                className="clear-btn"
              >
                Close
              </button>
              {saveFnRequired && (
                <button
                  disabled={loading}
                  type="button"
                  onClick={saveFn}
                  className="apply-btn"
                >
                  {loading ? <ClipLoader size={12} color="#fff" /> : "Save"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};
export default Modal;
