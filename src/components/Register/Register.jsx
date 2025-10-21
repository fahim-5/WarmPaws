import React from 'react';

export default function Register() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col text-center">
        
        {/* --- Text Section (Now Above) --- */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold mb-3">Register Now</h1>
          <p className="text-lg text-gray-600">
            Create your account and start exploring amazing features today!
          </p>
        </div>

        {/* --- Card Section --- */}
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset space-y-3">
              
              {/* Email */}
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />

              {/* Password */}
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />

              {/* Forgot Password Link */}
              <div className="text-sm mt-2">
                <a href="#" className="link link-hover text-primary">
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button className="btn btn-neutral w-full mt-4">
                Register
              </button>
            </fieldset>
          </div>
        </div>

      </div>
    </div>
  );
}
