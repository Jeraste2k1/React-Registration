// ConfirmationPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Typography } from "@material-tailwind/react";

const ConfirmationPage = () => {
  const { state } = useLocation();
  const { Nom, Email, Domaine, autredomaine, password } = state || {};

  return (
    <div className='h-screen grid place-items-center bg-gray-400'>
      <Card color="transparent" shadow={true} className='bg-white px-5 py-4'>
        <Typography variant="h4" color="blue-gray">
          Voici vos informations de connexion
        </Typography>
        <Typography className="mt-4">
          <strong>Nom :</strong> {Nom}
        </Typography>
        <Typography>
          <strong>Email :</strong> {Email}
        </Typography>
        <Typography>
          <strong>Domaine :</strong> {Domaine === 'autres' ? autredomaine : Domaine}
        </Typography>
        <Typography>
          <strong>Mot de passe :</strong> {password ? '********' : ''}
        </Typography>
      </Card>
    </div>
  );
};

export default ConfirmationPage;
