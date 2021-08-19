import { FC, useContext } from 'react';
import { ErrorPrimary } from '../../components/ErrorPrimary';
import { ImageGallery } from '../../components/ImageGallery';
import { FullPageLoader } from '../../components/loader/FullPageLoader';
import { Title } from '../../components/typography/Title';
import { Text } from '../../components/typography/Text';
import { DogContext } from '../../providers/DogProvider';
import { useDogImageUrlsByBreedService } from '../../services/dog';
import { isEmptyString, isNullOrUndefined } from '../../utils/nullAware';
import style from './style.module.sass';

const SelectedDogImage: FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <div>
    {isEmptyString(imageUrl) || isNullOrUndefined(imageUrl) ? (
      <Text> - </Text>
    ) : (
      <img className={style.selectedDogImage} src={imageUrl} alt="Uploaded dog" />
    )}
  </div>
);

const DogImageGalleryInner: FC<{ breed: string }> = ({ breed }) => {
  const { imageUrl: uploadedDogImageUrl } = useContext(DogContext);
  const { loading, data: dogImageUrls, error } = useDogImageUrlsByBreedService(breed);

  if (error) return <ErrorPrimary error={error} />;

  return (
    <>
      <FullPageLoader visible={loading} message="Getting cute dog images.." />
      <>
        <Title>Selected dog image</Title>
        <SelectedDogImage imageUrl={uploadedDogImageUrl} />
        <Title>All dog images found by breed "{breed}"</Title>
        <ImageGallery
          images={dogImageUrls.map((dogImageUrl) => ({
            url: dogImageUrl,
          }))}
        />
      </>
    </>
  );
};

/**
 * Displays an image gallery of the dog breed selected (and the preview of the uploaded image).
 * If there is no selection yet, shows a welcome message.
 */
export const DogImageGallery: FC = () => {
  const { breed } = useContext(DogContext);

  if (isEmptyString(breed)) {
    return (
      <div className={style.dogImageGallery}>
        <Title>Welcome to Find Dogs!</Title>
        <Text>
          In order to start please upload an image of a dog from the bottom of the screen, then our app will analyze the
          photo, determine the breed of the dog, and show you more cute dog photos within that breed! Have fun!
        </Text>
      </div>
    );
  }

  return (
    <div className={style.dogImageGallery}>
      <DogImageGalleryInner breed={breed} />
    </div>
  );
};
