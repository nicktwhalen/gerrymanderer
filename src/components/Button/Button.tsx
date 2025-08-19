import styles from './Button.module.css';

type ButtonProps = {
  ariaLabel?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
};

export default function Button({ ariaLabel, children, onClick, href, disabled }: ButtonProps) {
  const className = [styles.button, disabled ? styles.disabled : ''].join(' ');

  if (href) {
    return (
      <a className={className} href={href} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
