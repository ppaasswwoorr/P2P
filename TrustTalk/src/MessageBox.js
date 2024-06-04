//importation des bibliothéques
import React from 'react';//React:bibliothéque principale pour construire l'interface utilisateur
import { Segment, Comment, Button, Header, Icon, Grid, Card, Input, Sticky } from 'semantic-ui-react';//collection des composants React stylisés
import { formatRelative } from 'date-fns';//pour manipuler et formater les dates
import avatar from "./avatar.png";
//déclaration du composant message box avec:
//messages: objet contenat les messages 
//connectedTo:utilisateur en cours de chat
//message: le message en cours d'ecriture
//setMessage: fonction pour mettre à jour le message en cours d'écriture
//sendMsg: fonction pour envoyer le message
//name:le nom d'utilisateur actuel
//receivedFiles: objet contenant les fchiers reçus
const MessageBox = ({ messages, connectedTo, message, setMessage, sendMsg, name, receivedFiles }) => {
  const renderMessages = () => {           //fonction pour rendre les messages: elle affiche les messages de l'utilisateur connecté, si aucun utilisateur n'est connecté ou s'il n'y a pas de messages, elle affixhe qu'aucun message n'est disponible
    //si un utilisateur est connecté et qu'il y a des messages
    if (!!connectedTo && messages[connectedTo]) {
        //parcourir les messages de l'utilisateur connecté
      return messages[connectedTo].map(({ name: sender, message: text, time }) => (
        <Comment key={`msg-${name}-${time}`}>  {/* clé unique pour chaque message */}
        <Comment.Avatar src={avatar} /> {/* avatar de l'utilisateur*/}
        <Comment.Content>
          <Comment.Author>{sender === name ? 'You' : sender}</Comment.Author> {/* Auteur du message */}
          <Comment.Metadata>
            <span>
              {formatRelative(new Date(time), new Date())} {/* date et heure du message */}
            </span>
          </Comment.Metadata>
          <Comment.Text>{text}</Comment.Text>  {/* texte du message */}
        </Comment.Content>
      </Comment>
      ));
      //si aucun utilisateur n'est connecté ou bien s'il n'y a pas de messages
    } else {
      return (
        <Segment placeholder>
          <Header icon>
            <Icon name="discussions" />
            No messages available yet  {/* dans ce cas un message qu'aucun message n'est valable sera affiché*/}
          </Header>
        </Segment>
      );
    }
  };

  const renderReceivedFiles = () => {  //fonction afficher les fichiers reçus
    //si aucun utilisateur n'est connecté rien ne sera affiché
    if (!connectedTo) return null;

    const userFiles = receivedFiles || {}; // obtient les fichiers reçus ou objet par defaut
    //parcourt des fichier reçus et crée un lien pour chaque fichier
    return Object.entries(userFiles).map(([fileName, fileData], index) => (
      <Segment key={index}>
        <a href={fileData} download={fileName}>{fileName}</a>  {/* lien pour telecharger le fichier*/}
      </Segment>
    ));
  };
//rendu du composant:
  return (
    <Grid.Column width={11}> {/* grille dont la colonne est de largeur 11*/}
      <Sticky>
        <Card fluid> {/* composant Sticky pour rendre le contenu collant lors du défilement */}
          <Card.Content {/* carte fluide occupant toute la largeur */}
            header={
              !!connectedTo ? connectedTo : "Not chatting with anyone currently"   {/* en tête de la carte avec  le nom de l'utilisateur connecté*/}
            }
          />
          <Card.Content>
            {renderMessages()} {/* appel de la fonction d'affichage des messages*/}
            <Input
              fluid {/* champde saisie non fixe*/}
              type="text"
              value={message} {/* le message en saisie*/}
              onChange={e => setMessage(e.target.value)} {/* mis à jour du texte en cours d'execution*/}
              placeholder="Type message"
              action  {/* action d'envoie du message */}
            >
              <input />
              <Button color="purple" disabled={!message} onClick={sendMsg}> {/* boutton d'envoie du message*/}
                <Icon name="send" /> {/*icone d'envoie*/}
                Send Message {/* texte indiquant à l'utilisateur la fonctionnalité du boutton*/}
              </Button>
            </Input>
          </Card.Content>
          {renderReceivedFiles()} {/* appel de la fonction pour afficher les fichiers reçus*/}
        </Card>
      </Sticky>
    </Grid.Column>
  );
};
//exportation du composant MessageBox
export default MessageBox;
