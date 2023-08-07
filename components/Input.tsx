type Props = {
    name: string,
    label: string
    mode: "input" | "textarea"
    value?: any
    defaultValue?: any
    onChange: (... args:any) => any,
}

type ButtonProps = {
    children: React.ReactNode
}

export default function Input({name, label, mode, value, defaultValue, onChange}: Props) {
    return(<>
        <label htmlFor={name}>{label}</label>
        {mode === "input" && (
            <input 
              className="border border-slate-500 px-8 py-2"
              type="text" id={name} name={name} value={value}
              onChange={onChange}
              defaultValue={defaultValue}
           />
        )}
        {mode === "textarea" && (
            <textarea 
              className="border border-slate-500 px-8 py-2"
              rows={3} id={name} name={name} 
              value={value} onChange={onChange}
              defaultValue={defaultValue}   
            />
        )}
        
    </>)
}

export const Button = ({children}: ButtonProps) => {
    return(<>
        <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
            {children}
        </button>
    </>)
}