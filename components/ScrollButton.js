import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Button } from './Styles';

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = window.scrollY;
        if (scrolled > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', toggleVisible);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', toggleVisible);
            }
        };
    }, []);

    return (
        <Button>
            {visible && (
                <FaArrowCircleUp onClick={scrollToTop} style={{ display: 'inline' }} />
            )}
        </Button>
    );
};

export default ScrollButton;
