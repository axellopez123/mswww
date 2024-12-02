"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./Input";
import { Label } from "./Label";
import { cn } from "../lib/utils";
import { TextArea } from "./TextArea";
import img_r from "../img/rodo.webp"
import img_a from "../img/papuAlexwebp.webp"
import "./Contact.css";
import axios from "axios";
import { useDrawerContext } from "../contexts/DrawerContext";

import { CardBody, CardContainer, CardItem } from "./3DAvatar";

export function Contact() {
  const [customer, setCustomer] = useState({ip_address:"",events:[],name:"",phone:"",website:"",message:"",email:"",user_agent:"",referrer:"",session_duration:"420"})
  const { events, trackEvent } = useDrawerContext();
  const getClientIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setCustomer((prevCustomer) => ({ ...prevCustomer, ip_address: data.ip }));
    } catch (error) {
      console.error("Error obteniendo la IP:", error);
    }
  };

  // useEffect para obtener la IP al montar el componente
  useEffect(() => {
    getClientIP();
    console.log(events);
    
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      events: events, 
    }));
    }, [events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://api.arwax.pro/api/bot/";
  
  
    try {
      const response = await axios.post(url, customer, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Datos enviados exitosamente:", response.data);
    } catch (error) {
      console.error("Error al enviar datos:", error.response?.data || error.message);
    }
  };
  return (
    <div className=" flex flex-col md:flex-row w-full h-full dark:bg-black mt-16 pb-32">
      <div className="flex-1">
        <div className="px-6"><p className="text-xl font-extrabold">Un par de papus invocados por el destino para ayudar botsitos</p></div>
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full h-full flex items-center">
            <div className="flex-1 flex flex-col items-center">
              <CardContainer className="inter-var">
                <CardBody className="relative group/card w-full md:w-5/6 h-full shadow-lg shadow-gray-600 dark:shadow-white rounded-xl">
                  <CardItem translateZ="100" className="w-full flex justify-center">
                  <div className="md:w-72 md:h-72 relative rounded-xl overflow-hidden shadow-md">

                    <img
                      src={img_r}
                      height="1000"
                      width="1000"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover/card:shadow-xl hover:scale-105"
                      alt="thumbnail"
                    />
                    </div>
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <p className="text-center text-black dark:text-white text-3xl">Rodolfo Rodriguez</p>
                    <p className="text-center text-black dark:text-white text-lg">Master del codigo</p>
                    <p className="text-center text-black dark:text-white">Since 2015</p>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
            <div className="flex-1 flex flex-col items-center">
            <CardContainer className="inter-var">
                <CardBody className="relative group/card w-full md:w-5/6 h-full shadow-lg shadow-gray-600 dark:shadow-white rounded-xl">
                  <CardItem translateZ="100" className="w-full flex justify-center">
                  <div className="md:w-72 md:h-72 relative rounded-xl overflow-hidden shadow-md">

                    <img
                      src={img_a}
                      height="1000"
                      width="1000"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover/card:shadow-xl hover:scale-105"
                      alt="thumbnail"
                    />
                    </div>
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="px-7 md:px-16">
                    <p className="text-center text-black dark:text-white text-3xl">Axel López</p>
                    </div>
                    <p className="text-center text-black dark:text-white text-lg">Master del codigo</p>
                    <p className="text-center text-black dark:text-white">Since 2015</p>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex-none bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent md:my-8 h-1 w-full md:h-full md:w-[3px]" />
      <div className="flex-1 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent dark:bg-black">
        <form className="" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">Nombre</Label>
              <Input id="firstname" name="name" type="text" value={customer.name} onChange={handleChange} />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Correo electronico</Label>
            <Input id="email" name="email" type="email" value={customer.email} onChange={handleChange} />
          </LabelInputContainer>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">Telefono</Label>
              <Input id="firstname" name="phone" type="text" value={customer.phone} onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Website</Label>
              <Input id="lastname" name="website" type="text" value={customer.website} onChange={handleChange}/>
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="message">Mensaje</Label>
            <TextArea
              id="message"
              placeholder="Escribe aquí tu mensaje..."
              name="message"
              type="text"
              className=""
              value={customer.message}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Enviar &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}



const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
