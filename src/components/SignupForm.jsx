import React, { useEffect } from 'react';
import { Button, Card, Checkbox, Input, Typography, Select, Option } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const { handleSubmit, control, formState: { errors }, getValues, watch, unregister,reset } = useForm({mode:"onTouched"});
  const navigate=useNavigate()
  const onSubmit = (data) => {
    
    navigate("/informations", { state: (data) });
  }
  const othdomaine = watch("Domaine");

  useEffect(() => {
    // Désenregistre "autredomaine" lorsque "Domaine" n'est pas "autres"
    if (othdomaine !== "autres") {
      unregister("autredomaine");
    }
  }, [othdomaine, unregister]);

  return (
    <div className='h-screen grid place-items-center bg-gray-400'>
      <Card color="transparent" shadow={true} className='bg-white px-5 py-4'>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="blue" className="mt-1 font-normal">
          Heureux de vous retrouver. Veuillez vous enregistrer.
        </Typography>
        <form className="mt-6 mb-6 w-[550px] grid grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Champ Nom */}
          <div>
            <Controller
              name="Nom"
              control={control}
              rules={{ required: "Veuillez entrer votre nom", minLength: { value: 3, message: "Minimum 3 caractères" } }}
              render={({ field }) => (
                <Input
                  size="lg"
                  label="Nom"
                  placeholder="Votre Nom"
                  {...field} 
                  error={Boolean(errors?.Nom?.message)}
                />
              )}
            />
            {errors?.Nom?.message && <span className='error-text'>{errors.Nom.message}</span>}
          </div>
          
          {/* Champ Email */}
          <div>
            <Controller
              name="Email"
              control={control}
              rules={{
                required: "Veuillez entrer votre adresse mail",
                pattern: { value: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Email invalide" },
              }}
              render={({ field }) => (
                <Input size="lg" label="E-mail" placeholder="name@mail.com" {...field} error={Boolean(errors?.Email?.message)} />
              )}
            />
            {errors?.Email?.message && <span className='error-text'>{errors.Email.message}</span>}
          </div>

          {/* Champ Domaine */}
          <div>
            <Controller
              name="Domaine"
              control={control}
              rules={{ required: "Veuillez sélectionner un domaine" }}
              render={({ field }) => (
                <Select variant="outlined" label="Sélectionner votre Domaine" {...field} error={Boolean(errors?.Domaine?.message)}>
                  <Option value="FrontEnd">FrontEnd Dev Web</Option>
                  <Option value="BackEnd">BackEnd Dev Web</Option>
                  <Option value="Designer">Designer</Option>
                  <Option value="autres">Autres</Option>
                </Select>
              )}
            />
          </div>

          {/* Champ Autre Domaine (affiché seulement si "autres" est sélectionné) */}
          {othdomaine === "autres" && (
            <div>
              <Controller
                name="autredomaine"
                control={control}
                rules={{ required: "Veuillez entrer un autre nom de domaine" }}
                render={({ field }) => (
                  <Input type="text" size="lg" label="Autre domaine" placeholder="Entrer un autre domaine" {...field} error={Boolean(errors?.autredomaine?.message)} />
                )}
              />
              {errors?.autredomaine?.message && <span className='error-text'>{errors.autredomaine.message}</span>}
            </div>
          )}

          {/* Champ Mot de Passe */}
          <div>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Veuillez entrer votre mot de passe",
                minLength: { value: 8, message: "Le mot de passe doit comporter au moins 8 caractères" },
              }}
              render={({ field }) => (
                <Input type="password" size="lg" label="Mot de Passe" placeholder="********" {...field} error={Boolean(errors?.password?.message)} />
              )}
            />
            {errors?.password?.message && <span className='error-text'>{errors.password.message}</span>}
          </div>

          {/* Champ Confirmation du Mot de Passe */}
          <div>
            <Controller
              name="confirmationmdp"
              control={control}
              rules={{
                required: "Veuillez confirmer le mot de passe",
                validate: (value) => value === getValues("password") || "Le mot de passe ne correspond pas",
              }}
              render={({ field }) => (
                <Input type="password" size="lg" label="Confirmer" {...field} error={Boolean(errors?.confirmationmdp?.message)} />
              )}
            />
            {errors?.confirmationmdp?.message && <span className='error-text'>{errors.confirmationmdp.message}</span>}
          </div>

          {/* Boutons de Reset et de Soumission */}
          <div className='grid grid-cols-2 gap-5 col-span-2'>
            <Button type="reset" variant='outlined' onClick={()=>{reset()}}>Reset</Button>
            <Button type="submit">Créer un compte</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SignupForm