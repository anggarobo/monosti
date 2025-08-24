export default function Section1() {
    return (
        <div className="flex gap-6">
            <div className="mx-auto flex items-center gap-x-4 rounded-xl bg-white outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 w-full">
                <div className="grid grid-cols-2 divide-x divide-black/5">
                    <div className="flex flex-col w-full">
                        <div className="border-b border-black/5">
                            {/* need an icon */}
                            <div className="p-4">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Stasiun</p>
                                <p className="text-xl font-medium text-black dark:text-white">Pulomas (PUM)</p>
                            </div>
                        </div>
                        <div>
                            {/* need an icon */}
                            <div className="p-4">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Terminal ID</p>
                                <p className="text-xl font-medium text-black dark:text-white">040501 (FLAP, NON-WIDE)</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="p-4">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Gate Mode/Direction</p>
                            <p className="text-xl font-medium text-black dark:text-white">In Service Mode</p>
                            <p className="text-xl font-medium text-black dark:text-white">In</p>
                            <p className="text-xl font-medium text-black dark:text-white">Gate Non Integrasi</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                <div className="p-4">
                    <p className="text-xl font-medium text-black dark:text-white">Logo</p>
                </div>
            </div>
        </div>
    )
}