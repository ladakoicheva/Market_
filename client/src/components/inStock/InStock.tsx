import style from "./InStock.module.css";

type Props = {
  inStock: boolean;
};

export default function InStock({ inStock }: Props) {
  return (
    <h2 className={`${style.status} ${inStock ? style.available : style.unavailable}`}>
      {inStock ? "in Stock" : "Out of stock"}
    </h2>
  );
}
