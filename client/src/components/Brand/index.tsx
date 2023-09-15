import "./styles.scss";

interface Props {
  title: string;
  subtitle: string;
}

const BrandName = ({ title, subtitle }: Props) => (
  <div className="brand-name-container">
    <div className="brand-name">{title}</div>
    {subtitle && <div className="brand-subtitle">{subtitle}</div>}
  </div>
);

export default BrandName;
