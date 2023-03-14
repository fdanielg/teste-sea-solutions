interface Props {
  size?: number;
  color?: string;
}

export default function Building({ color = "#000", size = 25 }: Props) {
  return (
    <svg
      width={(size * 92) / 100}
      height={size}
      viewBox="0 0 23 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8516 23.4375H20.875V1.17188C20.875 0.524658 20.3503 0 19.7031 0H3.29688C2.64966 0 2.125 0.524658 2.125 1.17188V23.4375H1.14844C0.824854 23.4375 0.5625 23.6999 0.5625 24.0234V25H22.4375V24.0234C22.4375 23.6999 22.1751 23.4375 21.8516 23.4375ZM6.8125 3.71094C6.8125 3.38735 7.07485 3.125 7.39844 3.125H9.35156C9.67515 3.125 9.9375 3.38735 9.9375 3.71094V5.66406C9.9375 5.98765 9.67515 6.25 9.35156 6.25H7.39844C7.07485 6.25 6.8125 5.98765 6.8125 5.66406V3.71094ZM6.8125 8.39844C6.8125 8.07485 7.07485 7.8125 7.39844 7.8125H9.35156C9.67515 7.8125 9.9375 8.07485 9.9375 8.39844V10.3516C9.9375 10.6751 9.67515 10.9375 9.35156 10.9375H7.39844C7.07485 10.9375 6.8125 10.6751 6.8125 10.3516V8.39844ZM9.35156 15.625H7.39844C7.07485 15.625 6.8125 15.3626 6.8125 15.0391V13.0859C6.8125 12.7624 7.07485 12.5 7.39844 12.5H9.35156C9.67515 12.5 9.9375 12.7624 9.9375 13.0859V15.0391C9.9375 15.3626 9.67515 15.625 9.35156 15.625ZM13.0625 23.4375H9.9375V19.3359C9.9375 19.0124 10.1999 18.75 10.5234 18.75H12.4766C12.8001 18.75 13.0625 19.0124 13.0625 19.3359V23.4375ZM16.1875 15.0391C16.1875 15.3626 15.9251 15.625 15.6016 15.625H13.6484C13.3249 15.625 13.0625 15.3626 13.0625 15.0391V13.0859C13.0625 12.7624 13.3249 12.5 13.6484 12.5H15.6016C15.9251 12.5 16.1875 12.7624 16.1875 13.0859V15.0391ZM16.1875 10.3516C16.1875 10.6751 15.9251 10.9375 15.6016 10.9375H13.6484C13.3249 10.9375 13.0625 10.6751 13.0625 10.3516V8.39844C13.0625 8.07485 13.3249 7.8125 13.6484 7.8125H15.6016C15.9251 7.8125 16.1875 8.07485 16.1875 8.39844V10.3516ZM16.1875 5.66406C16.1875 5.98765 15.9251 6.25 15.6016 6.25H13.6484C13.3249 6.25 13.0625 5.98765 13.0625 5.66406V3.71094C13.0625 3.38735 13.3249 3.125 13.6484 3.125H15.6016C15.9251 3.125 16.1875 3.38735 16.1875 3.71094V5.66406Z"
        fill={color}
      />
    </svg>
  );
}
