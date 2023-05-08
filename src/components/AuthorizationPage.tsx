import {useAuth0} from '@auth0/auth0-react';
import React from "react";
import {Link} from "react-router-dom";
function AuthorizationPage() {
    const {isLoading, isAuthenticated, error, user, loginWithRedirect, logout, getAccessTokenSilently} =
        useAuth0();


    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }


    return (
        <div className={"bg-slate-900 h-screen w-screen flex justify-center items-center"}>
                    <div className={"flex justify-center items-center flex-col gap-12"}>
                        <div className={"flex justify-center items-center flex-col gap-2"}>
                            <h1 className={"font-['Poppins'] font-medium text-white text-5xl"}>Wagerables</h1>
                            <h1 className={"font-['Poppins'] font-normal text-white text-4xl"}>Betting on our future</h1>
                        </div>
                        {!isAuthenticated ? (
                            <button className={"duration-300 bg-transparent border-2 border-white hover:text-black font-['questrial'] font-semibold text-white rounded-md hover:bg-white px-5 text-xl h-12 w-fit flex justify-center items-center"} onClick={() => loginWithRedirect()}>Get Started</button>
                        ) : (
                            <Link to={"/dashboard"}>
                                <button className={"duration-300 bg-transparent border-2 border-white hover:text-black font-['questrial'] font-semibold text-white rounded-md hover:bg-white px-5 text-xl h-12 w-fit flex justify-center items-center"}>Go to Dashboard</button>
                            </Link>
                        )
                        }
                    </div>
        </div>
    )
}

export default AuthorizationPage;
