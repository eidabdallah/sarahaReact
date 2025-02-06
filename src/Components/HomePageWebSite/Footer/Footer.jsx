import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={`${styles.footer} text-white`}>
      <div className="container">
        <div className="row">
          <div className={`col-md-5 ${styles.column} ${styles.animateFromRight}`}>
            <div className="d-flex align-items-center">
              <div>
                <h5 className={`${styles.header} mb-4`}>موقع صراحة</h5>
                <p>
                  منصة تواصل اجتماعي تتيح للمستخدمين إرسال رسائل وأسئلة
                  مجهولة المصدر. سجل حسابك مجاناً واحصل على رابط صارحني رسالة
                  سريه.
                </p>
              </div>
            </div>
          </div>

          <div className={`col-md-3 ${styles.column} ${styles.animateFromRight}`}>
            <h5 className={`${styles.header} mb-4`}>معلومات الاتصال</h5>
            <p>رقم الهاتف: 123-456-7890</p>
            <p>البريد الإلكتروني: example@example.com</p>
            <p>العنوان: شارع 123، المدينة</p>
          </div>

          <div className={`col-md-3 ${styles.animateFromRight}`}>
            <h5 className={`${styles.header} mb-4`}>تابعنا</h5>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com">
                <FaFacebook />
              </a>
              <a href="https://twitter.com">
                <FaTwitter />
              </a>
              <a href="https://instagram.com">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
