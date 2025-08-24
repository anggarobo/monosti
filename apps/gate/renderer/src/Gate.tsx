import Section1 from "./Section1"

function Card() {
    return (
        <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            {/* <img className="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" /> */}
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Stasiun</p>
                <p className="text-xl font-medium text-black dark:text-white">Pulomas (Pum)</p>
            </div>
        </div>
        
    )
}

export default function GateComponent() {
    return (
        <div className="p-6 bg-blue-100 h-full">
            <div className="flex gap-6 flex-col">
                <Section1 />
                <Section1 />
                <Section1 />
                <Section1 />
                <Section1 />
            </div>
        </div>
    )
}
