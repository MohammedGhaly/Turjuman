function SettingsInputs() {
  return (
    <>
      <label
        htmlFor="username"
        className="font-semibold text-lg flex flex-col gap-2 mb-4"
      >
        Username
        <input
          type="text"
          name="username"
          className="border border-[var(--input-border)] bg-[var(--input-background)] block mb-2 p-2 rounded-md"
          placeholder="username"
          disabled
        />
      </label>
      <label
        htmlFor="email"
        className="font-semibold text-lg flex flex-col gap-2 mb-4"
      >
        Email
        <input
          disabled
          type="text"
          name="email"
          className="border border-[var(--input-border)] bg-[var(--input-background)] block mb-2 p-2 rounded-md"
          placeholder="email"
        />
      </label>
      <label
        htmlFor="password"
        className="font-semibold text-lg flex flex-col gap-2 mb-4"
      >
        <div className="flex justify-between">
          Password{" "}
          <a href="" className="underline text-[var(--forgot-pw)] font-normal">
            change password
          </a>
        </div>
        <input
          disabled
          type="text"
          name="password"
          className="border border-[var(--input-border)] bg-[var(--input-background)] block mb-2 p-2 rounded-md"
          placeholder="password"
        />
      </label>
    </>
  );
}

export default SettingsInputs;
