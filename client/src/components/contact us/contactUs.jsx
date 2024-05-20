import React from "react";
import "./contactUs.css";
import swal from "sweetalert";

const ContactUs = () => {
  const sendMsg = (e) => {
    e.preventDefault();
    swal({
      text: `Thanks For Contacting Us.
     We Will Reach Out To You ASAP!`,
    });
  };
  return (
    <div className="whole-page">
      <div className="contact-us-page">
        <h1 className="contact-heading">Contact Us</h1>
        <form className="contact-us-form" onSubmit={sendMsg}>
          <div className="a-form-group ">
            <input
              className="contact-us-inputs"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="a-form-group">
            <input
              size={30}
              className="contact-us-inputs"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="a-form-group">
            {/* <label className="lables" htmlFor="message">
            Message:
          </label> */}
            <textarea
              className="contact-us-inputs-textarea"
              rows={5}
              cols={25}
              id="message"
              name="message"
              placeholder="Message..."
            ></textarea>
          </div>
          <button className="contact-us-button" type="submit">
            Submit <span className="arrow">&rarr;</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
