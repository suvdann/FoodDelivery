import Image from "next/image"

export const Hero=()=>{
    return <div className=" relative w-full h-[570px] " >
        <Image src={"/BG.png"} alt="hero" fill className="object-cover"/>
    </div>
}