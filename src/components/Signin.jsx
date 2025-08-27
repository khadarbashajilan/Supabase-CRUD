import { useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Signin = () => {
  const {signInUser} = useAuth()
  const navigate = useNavigate()
  const [error, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      const newDeal = {
        email: formData.get("mailid"),
        password: formData.get("password"),
      };
      console.log(newDeal);

      try{
        const {success, data, error:SignInError} = await signInUser(newDeal.email, newDeal.password)

        if(SignInError){
          console.error(SignInError)
          return new Error(SignInError)
        }
        
        if(success && data?.session){
          navigate('/dashboard')
          return null
        }
        return null
      }catch(e){
        console.error("Sigin Error - ", e)
        return new Error(e)
      }
    },
    null
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form action={submitAction}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="mailid"
              id="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              
            />
          
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
            <p className="text-red-500 text-xs italic">
                {error&&"Incorrect Password / Mail"}
            </p>
            <p className="text-sm text-gray-600 mt-4">
              A new User?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                SignUp
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={isPending}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isPending? "Sigin-ing In": "SignIn"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
