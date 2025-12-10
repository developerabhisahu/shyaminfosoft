import React, { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactUsPage = () => {
    const pageRef = useRef(null);
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                console.log(result.text);
                setLoading(false);
                setStatus('success');
                e.target.reset();
                alert("Message Sent Successfully!");
            }, (error) => {
                console.log(error.text);
                setLoading(false);
                setStatus('error');
                alert("Failed to send message. Please try again.");
            });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.from('.contact-header-content', {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });

            // Info Cards Animation
            gsap.from('.contact-info-item', {
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.5
            });

            // Form Animation
            gsap.from('.contact-form-container', {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.5
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="contact-page">
            <div className="contact-bg-glow"></div>

            <div className="contact-header">
                <div className="contact-header-content">
                    <h1 className="gradient-text">Get in Touch</h1>
                    <p>Have a project in mind? Let's build something amazing together.</p>
                </div>
            </div>

            <div className="contact-container">
                {/* Left Column: Map */}
                <div className="contact-map-wrapper">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113693.30873614136!2d82.04652431477755!3d22.094595886989445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a280b117b9ab6a7%3A0xc6f3f89236710629!2sBilaspur%2C%20Chhattisgarh%2C%20India!5e0!3m2!1sen!2sus!4v1709667854321!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: '500px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="tech-map"
                    ></iframe>
                </div>

                {/* Right Column: Form */}
                <div className="contact-form-container">
                    <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
                        <input type="hidden" name="form_source" value="Contact Us Page" />
                        <h2>Send Message</h2>
                        <div className="form-group">
                            <input type="text" name="user_name" required />
                            <label>Your Name</label>
                        </div>
                        <div className="form-group">
                            <input type="email" name="user_email" required />
                            <label>Your Email</label>
                        </div>
                        <div className="form-group">
                            <input type="tel" name="user_phone" required />
                            <label>PhoneNumber</label>
                        </div>
                        <div className="form-group">
                            <textarea name="message" required rows="5"></textarea>
                            <label>Your Message</label>
                        </div>
                        <button type="submit" className="btn-submit" disabled={loading}>
                            <span>{loading ? 'Sending...' : 'Send Message'}</span>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Section: Contact Info */}
            <div className="contact-bottom-section">
                <div className="contact-info-wrapper-bottom">
                    <div className="contact-info-item">
                        <div className="icon-box">
                            <FaMapMarkerAlt />
                        </div>
                        <div className="info-text">
                            <h3>Visit Us</h3>
                            <p>Bhiwadi,Rajasthan India</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="icon-box">
                            <FaPhone />
                        </div>
                        <div className="info-text">
                            <h3>Call Us</h3>
                            <p>+91 7597675365</p>
                        </div>
                    </div>

                    <div className="contact-info-item">
                        <div className="icon-box">
                            <FaEnvelope />
                        </div>
                        <div className="info-text">
                            <h3>Email Us</h3>
                            <p>shyamaitechsolution@gmail.com</p>
                        </div>
                    </div>

                    <div className="contact-info-item socials-item">
                        <div className="icon-box social-icon-box">
                            <FaLinkedinIn />
                        </div>
                        <div className="social-links-row">
                            <a href="https://www.linkedin.com/in/developerabhisahu" className="social-btn" target="_blank"><FaLinkedinIn /></a>
                            <a href="https://twitter.com" className="social-btn" target="_blank"><FaTwitter /></a>
                            <a href="https://www.instagram.com/developer_abhisahu?igsh=MWgzNGVwcmdrNHcyeQ==" className="social-btn" target="_blank"><FaInstagram /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
