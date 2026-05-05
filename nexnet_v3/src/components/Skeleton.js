import React from 'https://cdn.skypack.dev/react';

export default function Skeleton() {
    return (
        <div className="bg-white rounded-[2.5rem] p-8 space-y-6 animate-pulse border border-slate-50 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100"></div>
                <div className="space-y-2 flex-1">
                    <div className="h-3 w-1/4 bg-slate-100 rounded-lg"></div>
                    <div className="h-2 w-1/6 bg-slate-50 rounded-lg"></div>
                </div>
            </div>
            <div className="space-y-3">
                <div className="h-6 w-3/4 bg-slate-100 rounded-xl"></div>
                <div className="h-4 w-full bg-slate-50 rounded-xl"></div>
            </div>
            <div className="h-64 w-full bg-slate-50 rounded-[2rem]"></div>
        </div>
    );
}
