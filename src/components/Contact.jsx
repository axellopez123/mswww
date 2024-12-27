"use client";
import React, { useEffect, useState, useRef } from "react";
import { Input } from "./Input";
import { Label } from "./Label";
import { cn } from "../lib/utils";
import { TextArea } from "./TextArea";
import img_r from "../img/rodo.webp";
import img_a from "../img/papuAlexwebp.webp";
import "./Contact.css";
import axios from "axios";
import { useDrawerContext } from "../contexts/DrawerContext";
import * as THREE from "three";
import { CardBody, CardContainer, CardItem } from "./3DAvatar";
import Footer from "./Footer";
import { useForm } from "react-hook-form";

export function Contact() {
  const [customer, setCustomer] = useState({
    ip_address: "",
    events: [],
    name: "",
    phone: "",
    website: "",
    message: "",
    email: "",
    user_agent: "",
    referrer: "",
    session_duration: "420",
  });
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const { events, trackEvent, showNotification } = useDrawerContext();
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
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      events: events,
    }));
  }, [events]);

  const onSubmit = async (data) => {
    setLoader(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const enhancedData = {
      ...data,
      ip_address: customer.ip_address,
      events: customer.events,
      user_agent: navigator.userAgent,
    };
  

    try {
      const response = await axios.post(
        "https://api.arwax.pro/api/bot/",
        enhancedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoader(false);

      showNotification(
        "🚀",
        "Recibimos tu mensaje",
        "Pronto nos pondremos en contacto contigo.",
        5000 // Tiempo en milisegundos (5 segundos)
      );
      reset();
      console.log("Datos enviados exitosamente:", response.data);
    } catch (error) {
      setLoader(false);

      showNotification(
        "❌",
        "Error al enviar mensaje",
        "Por favor, inténtalo de nuevo más tarde.",
        5000 // Tiempo en milisegundos (5 segundos)
      );
      console.error(
        "Error al enviar datos:",
        error.response?.data || error.message
      );
    } finally {
      setLoader(false);
    }
  };
  return (
    <div
      id="contacto"
      className="h-full md:h-screen pt-12 md:pt-28 pb-16 flex flex-col bg-slate-300/30 dark:bg-black"
    >
      <div className="flex justify-center items-center mb-2">
        <p className="text-5xl md:text-7xl font-bold dark:text-white font-exo">
          Hablemos
        </p>
      </div>
      <div className="flex justify-center items-center mb-2 md:mb-6 px-4 md:px-32 flex-col">
        <p className="font-inter text-3xl font-bold dark:text-white text-center">
          Transforma tus ideas en soluciones inteligentes con los Masters del
          Desarrollo. 🚀💡
        </p>
        <p className="font-inter text-sm md:text-xl font-semibold dark:text-white text-center px-0 md:px-16 pt-2">
          Somos expertos apasionados con conocimientos avanzados y un enfoque
          creativo para ofrecer soluciones innovadoras. Con años de experiencia
          en el desarrollo de tecnología nos han permitido perfeccionar nuestras
          habilidades y entender a fondo las necesidades de nuestros clientes
          ofreciendoles nuestro compromiso con calidad, funcionalidad y
          excelencia.
        </p>
      </div>
      <div className=" flex flex-col md:flex-row w-full h-full dark:bg-black px-0 md:px-32">
        <div className="flex-1">
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full h-full flex flex-row px-5 py-8">
              <div className="flex-1 flex flex-col items-center">
                <CardContainer className="inter-var">
                  <CardBody className="relative group/card w-full md:w-5/6 h-full shadow-lg shadow-gray-600 dark:shadow-white rounded-xl">
                    <CardItem
                      translateZ="100"
                      className="w-full flex justify-center"
                    >
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
                        <p className="text-center text-black dark:text-white text-3xl">
                          Axel López
                        </p>
                      </div>
                      <p className="text-center text-black dark:text-white text-lg">
                        Master del codigo
                      </p>
                      <p className="text-center text-black dark:text-white">
                        Since 2015
                      </p>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
              <div className="flex-1">
                <CardContainer className="inter-var">
                  <CardBody className="relative group/card w-full md:w-5/6 h-full shadow-lg shadow-gray-600 dark:shadow-white rounded-xl">
                    <CardItem
                      translateZ="100"
                      className="w-full flex justify-center"
                    >
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
                      <p className="text-center text-black dark:text-white text-3xl">
                        Rodolfo Rodriguez
                      </p>
                      <p className="text-center text-black dark:text-white text-lg">
                        Master del codigo
                      </p>
                      <p className="text-center text-black dark:text-white">
                        Since 2015
                      </p>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-none bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-1 w-full md:h-full md:w-[3px] mb-3 md:my-0" />
        <div className="flex-1 w-full rounded-none px-5 md:rounded-2xl shadow-input bg-transparent dark:bg-black ">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-2 md:mb-4">
              <LabelInputContainer>
                <Label htmlFor="name">Nombre<span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm"><i class='bx bxs-error pr-1 text-lg'></i>{errors.name.message}</p>
                )}
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-2 md:mb-4">
              <Label htmlFor="email">Correo electronico<span className="text-red-500">*</span></Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Formato de correo inválido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm"><i class='bx bxs-error pr-1 text-lg'></i>{errors.email.message}</p>
              )}
            </LabelInputContainer>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-2 md:mb-4">
              <LabelInputContainer>
                <Label htmlFor="phone">Telefono<span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "El teléfono es obligatorio",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "El teléfono debe tener 10 dígitos",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm"><i class='bx bxs-error pr-1 text-lg'></i>{errors.phone.message}</p>
                )}
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="website">Website <span className="text-xs">(Opcional)</span></Label>
                <Input
                  id="website"
                  type="text"
                  {...register("website")}
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="message">Mensaje<span className="text-red-500">*</span></Label>
              <TextArea
                id="message"
                rows={4}
                {...register("message", { required: "El mensaje es obligatorio" })}
                className=""
                placeholder="Escribe tu mensaje aquí..."
              />
              {errors.message && (
                  <p className="text-red-500 text-sm"><i class='bx bxs-error pr-1 text-lg'></i>{errors.message.message}</p>
                )}
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
                          {isSubmitting ? "Enviando..." : "Enviar"}
                          
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
      {/* FOOTER */}
      <Footer></Footer>
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
