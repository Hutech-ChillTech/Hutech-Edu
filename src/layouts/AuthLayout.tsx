import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../styles/AuthLayout.module.css";

/**
 * AuthLayout: A beautiful, modern layout for authentication pages.
 * Features: Split screen design, glassmorphism, responsive, branding area.
 */
const AuthLayout: React.FC = () => {
    return (
        <div className={styles.authContainer}>
            {/* Background Overlay */}
            <div className={styles.authOverlay}></div>

            {/* Main Authentication Card */}
            <div className={styles.authCard}>
                {/* Left Section: Branding & Slogan */}
                <div className={styles.sideBrand}>
                    <div className={styles.brandLogo}>
                        Hutech<span>Edu.</span>
                    </div>

                    <div className={styles.brandContent}>
                        <h1>Start Your Journey With Personalized Learning.</h1>
                        <p>
                            Unlock 1,000+ premium tech courses and expert roadmap recommendations
                            tailored just for you. join 50,000+ students today.
                        </p>
                    </div>

                    <div className={styles.brandFooter}>
                        &copy; {new Date().getFullYear()} Hutech Edu.
                        All Rights Reserved.
                    </div>
                </div>

                {/* Right Section: Form Content (Login/Register) */}
                <div className={styles.formSection}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
