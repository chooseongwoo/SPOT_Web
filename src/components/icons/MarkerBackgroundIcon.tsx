export default function MarkerBackgroundIcon({ read }: { read: boolean }) {
  return (
    <svg
      width="30"
      height="38"
      viewBox="0 0 30 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M15 0.5C22.6003 0.5 29.4998 6.49577 29.5 15.835C29.5 21.7446 25.0601 28.8371 15.9229 37.1494C15.4008 37.6163 14.6203 37.6171 14.0977 37.1514H14.0986C4.94085 28.8381 0.5 21.745 0.5 15.835C0.500189 6.49577 7.39972 0.5 15 0.5Z"
        fill={read ? "#C3C3C3" : "#2AD18E"}
        stroke="#EAFAF4"
      />
    </svg>
  );
}
