import React from 'react';
import styles from './HomePageSection.module.css';
import logo from '../../../assets/logo/logo.png';
import { Link } from 'react-router-dom';

export default function HomePageSection() {
  return (
    <section className={`${styles.homeSection} container ${styles.animateFromLeft}`}>
      <div className="row align-items-center">
        <div className="col-lg-4 col-md-6 text-center">
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </div>

        <div className="col-lg-8 col-md-6">
          <div className={styles.content}>
            <h1>مرحبًا بك في منصتنا!</h1>
            <p>شارك أفكارك بكل صراحة واحصل على آراء بناءة دون الكشف عن هوية المرسل.</p>
            <Link to='/auth/login' className={styles.startButton}>ابدأ الآن</Link>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className={styles.featureCard}>
            <h3>💬 رسائل مجهولة</h3>
            <p>احصل على آراء صادقة من الآخرين بدون معرفة هوية المرسل.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className={styles.featureCard}>
            <h3>🔒 خصوصية كاملة</h3>
            <p>بياناتك محمية ولا يمكن لأحد معرفة هوية المرسل أو المستلم.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className={styles.featureCard}>
            <h3>✨ سهولة الاستخدام</h3>
            <p>واجهة بسيطة وسهلة الاستخدام، ابدأ الآن مباشرةً بدون أي تعقيد.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
