import React from "react"; // Import de React
import Chat from "./Chat"; // Import du composant Chat depuis un fichier local
import { ConnectionConsumer, ChannelConsumer } from "./App"; // Import des consommateurs de contextes depuis App

// Définition du composant fonctionnel Container
const Container = () => {
  return (
    // Utilisation de ConnectionConsumer pour accéder au contexte de connexion
    <ConnectionConsumer>
      {({ connection, updateConnection }) => (
        // Utilisation de ChannelConsumer pour accéder au contexte de canal
        <ChannelConsumer>
          {({ channel, updateChannel }) => (
            // Rendu du composant Chat avec les valeurs et fonctions de mise à jour des contextes
            <Chat
              connection={connection} // Passage de la connexion au composant Chat
              updateConnection={updateConnection} // Passage de la fonction de mise à jour de la connexion
              channel={channel} // Passage du canal au composant Chat
              updateChannel={updateChannel} // Passage de la fonction de mise à jour du canal
            />
          )}
        </ChannelConsumer>
      )}
    </ConnectionConsumer>
  );
};

export default Container; // Export du composant Container comme composant par défaut
