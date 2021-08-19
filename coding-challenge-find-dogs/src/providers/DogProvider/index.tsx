import React, { FC, useState } from 'react';

interface DogContextInterface {
  breed: string;
  // imageUrl is in base64
  imageUrl: string;
  updateBreedAndImageUrl: ({ breed, imageUrl }: { breed: string; imageUrl: string }) => void;
}

const initialContext: DogContextInterface = {
  breed: '',
  imageUrl: '',
  updateBreedAndImageUrl: () => {},
};

const DogContext = React.createContext(initialContext);

interface Props {
  breedInitial?: string;
  imageUrlInitial?: string;
}

/**
 * Provide breed and imageUrl values
 */
const DogProvider: FC<Props> = ({ children, breedInitial = '', imageUrlInitial = '' }) => {
  const [dog, setDog] = useState({ breed: breedInitial, imageUrl: imageUrlInitial });

  const updateBreedAndImageUrl = ({ breed, imageUrl }: { breed: string; imageUrl: string }) => {
    setDog({ breed, imageUrl });
  };

  // Even though creating the context object within the component (not in state) is not a best practice,
  // we should do it here in tis case because we need to include a component function in the context as well.
  const context = {
    breed: dog.breed,
    imageUrl: dog.imageUrl,
    updateBreedAndImageUrl,
  };

  return <DogContext.Provider value={context}>{children}</DogContext.Provider>;
};

export { DogProvider, DogContext };
