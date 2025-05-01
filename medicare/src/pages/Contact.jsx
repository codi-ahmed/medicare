import React from 'react'
import '../style/contact.css'
const Contact = () => {
    return (
        <div className='contact_body'>
            <div className="contact-inner_body">
                <div className="contact_image">
                    <div className="overlay"></div>
                </div>
                <div className="contact-form">
                    <h2>Contact Us</h2>
                    <br />
                    <form className='contact_inside-form'>
                        <input type="text" placeholder="Your Name" required />
                        <input type="email" placeholder="Your Email" required />
                        <textarea rows="5" cols="35" placeholder="Describe your issue..." required ></textarea>

                        <div className="button-group">
                            <button type="submit">Send Message</button>
                            <button type="reset" className="clear-btn">Clear</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Contact
