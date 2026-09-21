export default function Container({
  children,
  className = "",
  as: Tag = "div",
}) {
  const classes = [
    "container",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes}>
      {children}
    </Tag>
  );
}
