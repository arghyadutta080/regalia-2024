import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

interface FooterRoutesType {
  name: string;
  link: string;
}

const footerRoutes = [
  {
    name: "About",
    link: "/#about",
  },
  
  {
    name: "Events",
    link: "/events",
  },
  {
    name: "Gallery",
    link: "/gallery",
  },
  {
    name: "Sponsorship Brochure",
    link: "https://drive.google.com/file/d/1vHVe34w9f6YcW3dDwtbuj2FkUh7Rj6fr/view?usp=sharing",
  },
  {
    name: "Contact Us",
    link: "/contacts",
  },
]

const FooterChip = ({name,link}:FooterRoutesType)=>{
  return(
    <Link target="_blank" href={link} className="text-sm font-retrolight cursor-pointer hover:text-slate-300 duration-500 lg:text-xl last:border-0  lg:border-r-2 lg:border-white px-5 py-1 lg:px-20">
      {name}
    </Link>
  )
}

const SocialsGroup = () => {
  return(
    <div className="flex flex-row items-center my-8 gap-20 ">
      <Link target="_blank" href={"https://www.google.co.in/search?q=rcciit&rlz=1C2CHBF_enIN918IN918&sca_esv=e76f17f54d7fb754&sca_upv=1&sxsrf=ACQVn09xP1hBSQlG6DeK7367_Nu5WdRncw%3A1712837705679&source=hp&ei=SdQXZpjmJs_O1e8PyZ63IA&iflsig=ANes7DEAAAAAZhfiWdnVCoNegxvnAMPFl5Wk-Z8g7q9E&ved=0ahUKEwjYroLYkbqFAxVPZ_UHHUnPDQQQ4dUDCBU&uact=5&oq=rcciit&gs_lp=Egdnd3Mtd2l6IgZyY2NpaXQyBBAjGCcyChAuGIAEGIoFGCcyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEirEFAAWMsOcAJ4AJABAJgBuQGgAbQIqgEDMC42uAEDyAEA-AEBmAIIoALMCKgCCsICChAjGIAEGIoFGCfCAgsQABiABBiKBRiRAsICDhAAGIAEGIoFGJECGLEDwgIOEAAYgAQYigUYsQMYgwHCAggQABiABBixA8ICCxAAGIAEGLEDGIMBwgIOEC4YgAQYigUYsQMYgwHCAgcQIxjqAhgnwgIREAAYgAQYigUYkQIYsQMYgwHCAg4QLhiDARixAxiABBiKBcICCBAuGIAEGLEDmAMCkgcDMi42oAeKPw&sclient=gws-wiz"} className="p-2 rounded-full cursor-pointer hover:text-red-500 bg-white text-regalia">
      <FaGoogle size={24} />
      </Link>
      <Link target="_blank" href={"https://www.facebook.com/regalia.rccfests"} className="p-2 rounded-full cursor-pointer hover:text-blue-500 bg-white text-regalia">
      <FaFacebook size={24} />
      </Link>
      <Link target="_blank" href={"https://www.instagram.com/regalia_rcciit/"} className="p-2 rounded-full cursor-pointer hover:text-pink-500 bg-white text-regalia">
      <GrInstagram size={24} className="" />
      </Link>
    
    </div>
  )
}


const Foot = ()=>{
  return(
    <div className="bg-body font-hollirood tracking-widest flex flex-row items-center gap-2 font-semibold justify-around flex-wrap py-2 text-xs md:text-sm text-white w-full text-center">
    <div>
      © 2024 &nbsp;
      <Link href="/" className="neon hover:cursor-pointer font-retrolight">
        Regalia™
      </Link>
      . All Rights Reserved.
    </div>
    <p>
      Made with <span className="text-red-600 text-xl">&hearts;</span> by <Link className="hover:cursor-pointer" href={"/team/tech"}>Regalia
      tech team</Link>
    </p>
  </div>
  )
}

const Footer = () => {
  return (
    <div className="footer-color relative  flex flex-col items-center gap-2 pt-5">
      <div className="flex flex-row items-center justify-center w-[80%] 2xl:w-[40%] pt-5 pb-10">
      <div className="relative">
        <div className="flex flex-row items-center">
        <Image
          src="/assets/home/2k24.svg"
          height={500}
          width={1000}
          alt=""
          className="relative w-80 right-8 lg:right-0  lg:w-[80%]"
        />
        
        </div>
       
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/assets/home/regalia.svg"
            height={500}
            width={800}
            alt=""
            className="w-80 lg:w-[70%]"
          />
        </div>
      </div>
      <Image
        src={"/assets/home/full_guitar.svg"}
        width={300}
        height={400}
        alt=""
        className="-mt-10 md:-mt-5 lg:-mt-10 w-24 lg:-ml-12 xl:-ml-20 lg:w-72 xl:w-80"
      />
      </div>
     
     <div className="flex flex-row flex-wrap  items-center w-full gap-2 lg:w-[80%] mx-auto justify-center">
      {
        footerRoutes.map((route,index)=>{
          return(
            <FooterChip key={index} name={route.name} link={route.link}/>
          )
        })
      }
     </div>
     <SocialsGroup />
     <Foot />
    </div>
  );
};

export default Footer;
