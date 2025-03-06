import React from "react";
import { Link } from "@inertiajs/react";

function ExploreNow() {
    return (
        <div className="mt-8 p-6 w-full max-w-4xl">
            <div className="flex justify-center mt-6">
                <Link
                    href="/explore"
                    method="get"
                    className="bg-blue-400 text-black font-bold text-xl px-6 py-3
                    border-[4px] border-black w-64 h-20 flex items-center justify-center
                    space-x-3 transition-all duration-300 relative overflow-hidden
                    shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]
                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_rgba(0,0,0,1)]"
                >
                    <span className="flex items-center justify-center w-full">
                        Explore Now
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default ExploreNow;
