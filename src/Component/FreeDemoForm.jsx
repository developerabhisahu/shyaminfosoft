import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { FaTimes, FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaBuilding, FaCommentAlt } from 'react-icons/fa';

const FreeDemoForm = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const formRef = useRef(null);
    const overlayRef = useRef(null);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_phone: '',
        company: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let ctx;
        if (isOpen) {
            ctx = gsap.context(() => {
                // Overlay fade in
                gsap.fromTo(overlayRef.current,
                    { opacity: 0, visibility: 'hidden' },
                    { opacity: 1, visibility: 'visible', duration: 0.3, ease: 'power2.out' }
                );

                // Modal pop up
                gsap.fromTo(modalRef.current,
                    { scale: 0.8, opacity: 0, y: 50 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)', delay: 0.1 }
                );

                // Form elements stagger
                gsap.fromTo('.demo-form-group',
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.3 }
                );
            }, modalRef);
        }

        return () => ctx && ctx.revert();
    }, [isOpen]);

    const handleClose = () => {
        const ctx = gsap.context(() => {
            gsap.to(modalRef.current, {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: onClose
            });
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                delay: 0.1
            });
        }, modalRef);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                console.log(result.text);
                setLoading(false);
                setFormData({
                    user_name: '',
                    user_email: '',
                    user_phone: '',
                    company: '',
                    message: ''
                });
                handleClose();
                alert("Thanks! Request Sent Successfully.");
            }, (error) => {
                console.log(error.text);
                setLoading(false);
                alert("Failed to send request. Please try again.");
            });
    };

    if (!isOpen) return null;

    return (
        <div className="demo-modal-overlay" ref={overlayRef} onClick={handleClose}>
            <div className="demo-modal-container" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <button className="demo-close-btn" onClick={handleClose}>
                    <FaTimes />
                </button>

                <div className="demo-modal-header">
                    <h2 className="gradient-text">Get Your Free Demo</h2>
                    <p>Experience the power of our AI solutions firsthand.</p>
                </div>

                <form className="demo-form" ref={formRef} onSubmit={handleSubmit}>
                    <input type="hidden" name="form_source" value="Free Demo Popup" />
                    <div className="demo-form-group">
                        <div className="input-icon"><FaUser /></div>
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Full Name"
                            value={formData.user_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="demo-form-group">
                        <div className="input-icon"><FaEnvelope /></div>
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Work Email"
                            value={formData.user_email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="demo-form-group">
                        <div className="input-icon"><FaPhone /></div>
                        <input
                            type="tel"
                            name="user_phone"
                            placeholder="Phone Number"
                            value={formData.user_phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="demo-form-group">
                        <div className="input-icon"><FaBuilding /></div>
                        <input
                            type="text"
                            name="company"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="demo-form-group full-width">
                        <div className="input-icon textarea-icon"><FaCommentAlt /></div>
                        <textarea
                            name="message"
                            placeholder="Tell us about your needs..."
                            rows="3"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary demo-submit-btn" disabled={loading}>
                        <span>{loading ? 'Sending...' : 'Request Demo'}</span>
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FreeDemoForm;
