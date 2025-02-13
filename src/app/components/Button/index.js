import styles from './Button.module.css';

export default function Button({ children, onClick, className, style, ...props }) {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick} style={style} // Allow inline styles
        {...props}>
            {children}
        </button>
    );
}