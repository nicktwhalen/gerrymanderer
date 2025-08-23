import Link from 'next/link';
import classNames from 'classnames';
import styles from './Button.module.css';

type ButtonProps = {
  ariaLabel?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
};

export default function Button({
  ariaLabel,
  children,
  onClick,
  href,
  disabled,
}: ButtonProps) {
  const className = classNames(styles.button, { [styles.disabled]: disabled });

  if (href) {
    return (
      <Link className={className} href={href} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
