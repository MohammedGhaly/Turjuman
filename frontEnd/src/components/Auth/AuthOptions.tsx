function AuthOptions() {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-2">
      <h4 className="text-xl lg:text-lg font-semibold">or login with</h4>
      <div className="flex justify-center w-full gap-12">
        {/* face book button */}
        <button className="rounded-full bg-[var(--auth-options-facebook-bg)] p-2 shadow-lg hover:scale-105 duration-200 transition-all">
          <svg
            width="66"
            height="66"
            viewBox="0 0 66 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
          >
            <path
              d="M66 33.0012C66 49.6682 53.6454 63.4472 37.5957 65.6832C36.095 65.8913 34.5596 66 33.0012 66C31.2022 66 29.4356 65.8566 27.7152 65.5792C12.0008 63.0495 0 49.4254 0 33.0012C0 14.7756 14.7756 0 32.9988 0C51.2221 0 66 14.7756 66 33.0012Z"
              fill="#1877F2"
            />
            <path
              d="M37.5957 26.4967V33.6856H46.4888L45.0806 43.3695H37.5957V65.6809C36.095 65.889 34.5596 65.9977 33.0011 65.9977C31.2022 65.9977 29.4356 65.8543 27.7152 65.5769V43.3695H19.5135V33.6856H27.7152V24.8896C27.7152 19.4326 32.1387 15.0068 37.598 15.0068V15.0115C37.6142 15.0115 37.6281 15.0068 37.6442 15.0068H46.4911V23.382H40.7104C38.9923 23.382 37.598 24.7763 37.598 26.4943L37.5957 26.4967Z"
              fill="white"
            />
          </svg>
        </button>
        {/* google button */}
        <button className="rounded-full bg-[var(--auth-options-google-bg)] p-2 shadow-lg hover:scale-105 duration-200 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="65"
            height="66"
            viewBox="0 0 65 66"
            fill="none"
            className="w-11 h-11"
          >
            <path
              d="M65 33.7491C65 31.4992 64.8152 29.2576 64.4288 27.0392H33.1544V39.7459H51.0648C50.3244 43.8455 47.9346 47.4721 44.4431 49.7702V58.0253H55.1357C61.3955 52.2924 65 43.7972 65 33.7491Z"
              fill="#4285F4"
            />
            <path
              d="M33.1547 66C42.1021 66 49.6412 63.0776 55.1361 58.0332L44.4435 49.7782C41.4664 51.788 37.6365 52.9329 33.1547 52.9329C24.5057 52.9329 17.1676 47.1285 14.5368 39.3137H3.53021V47.8166C9.16208 58.9703 20.6195 66 33.1547 66Z"
              fill="#34A853"
            />
            <path
              d="M14.5448 39.3135C13.1531 35.2222 13.1531 30.7784 14.5448 26.6794V18.1843H3.53043C-1.17681 27.5116 -1.17681 38.4968 3.53043 47.8247L14.5448 39.3135Z"
              fill="#FBBC04"
            />
            <path
              d="M33.1547 13.0683C37.8859 12.9963 42.4478 14.766 45.8753 18.0167L55.3454 8.60066C49.3434 2.99638 41.3941 -0.0863162 33.1547 0.00183994C20.6195 0.00183994 9.15429 7.03936 3.53021 18.1847L14.5446 26.6876C17.1676 18.865 24.5057 13.0683 33.1547 13.0683Z"
              fill="#EA4335"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AuthOptions;
