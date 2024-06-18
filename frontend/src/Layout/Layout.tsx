import styles from "./Layout.module.css";

interface LayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <header className={`${styles.header}`}>{props.header}</header>
      <>{props.content}</>
      <footer className={`${styles.footer}`}>{props.footer}</footer>
    </>
  );
}
