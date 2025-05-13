export default function ErrorAlert({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="absolute left-1/2 top-[110px] z-50 w-4/5 -translate-x-1/2 rounded-xl bg-red px-4 py-3 opacity-75">
      <p className="text-center text-b2 text-white">{errorMessage}</p>
    </div>
  );
}
