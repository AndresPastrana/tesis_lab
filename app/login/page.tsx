import { AuthLayouText } from "../i18/text";

export default function LoginPage() {
  const {
    welcome_title,
    welcome_msg,
    welcome_secondary_msg,
    emailInputLabel,
    emailInputPlaceholder,
    paswwordInputLabel,
    passwordInputPlaceholder,
    btnText,
  } = AuthLayouText["es"];
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse lg:gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 py-2 inline-block text-transparent bg-clip-text">
            {welcome_title}
          </h1>
          <p className="py-6 ">
            {welcome_msg}
            <span className="block mt-2">{welcome_secondary_msg}</span>
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{emailInputLabel}</span>
              </label>
              <input
                type="email"
                placeholder={emailInputPlaceholder}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{paswwordInputLabel}</span>
              </label>
              <input
                type="password"
                placeholder={passwordInputPlaceholder}
                className="input input-bordered"
                required
              />
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
