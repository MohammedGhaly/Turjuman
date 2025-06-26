import Spinner from "./Spinner";

function SpinnerPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner
        color="var(--foreground)"
        cn="w-32 h-32 border-4 rounded-full animate-spin"
      />
    </div>
  );
}

export default SpinnerPage;
