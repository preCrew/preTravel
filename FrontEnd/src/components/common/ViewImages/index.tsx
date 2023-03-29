import Row from '../FlexBox/Row';

interface ViewImagesProps {
  imageUrls: string[];
}

const ViewImages = ({ imageUrls }: ViewImagesProps) => {
  return (
    <Row>
      {imageUrls.map(url => (
        <div>sdfs</div>
      ))}
    </Row>
  );
};

export default ViewImages;
