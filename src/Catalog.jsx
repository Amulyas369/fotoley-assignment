import { useState, useEffect } from 'react';
import { Button, Grid, IconButton, Paper } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';


const Catalog = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideshowActive, setSlideshowActive] = useState(false);

  useEffect(() => {
    const fetchedImages = [
      { src: 'https://images.unsplash.com/photo-1591077872036-8b9fe12b3c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmFpbml0YWwlMkMlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      heading:"Nainital - The City of Lakes",
      details: 'Nainital, the charming Himalayan lake town, is a picture-postcard perfect hill-station and one of the most popular in Northern India. Commonly known as the ‘Lake District’, Nainital is nestled high up in the Kumaon Himalayas at an altitude of around 2,000 m above sea level. This beautiful town in surrounded by seven hills, popularly known as ‘Sapta-Shring’ – Ayarpata, Deopata, Handi-Bandi, Naina, Alma, Lariya-Kanta and Sher-Ka-Danda. The majestic mountains and the sparkling waters of the lake add an immense lot to the beauty of the town.' },
      { src: 'https://images.thrillophilia.com/image/upload/s--vI0Q6HT9--/c_fill,g_auto,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/082/497/original/1675261154_shutterstock_2148766633.jpg.jpg',
      heading:"Maldives-The Honeymoon Capital of Asia",
      details: 'Touted to be one of the best honeymoon destinations in Asia for tropical island vacations – thanks to its sugar sandy beaches, overwater bungalows, Maldives is synonymous with honeymoon capital. But the irony is United Nations reports state that Maldives has the highest divorce rate, almost twice the United States (annually). On average, official records state that the woman in the Maldives has divorced thrice before she reaches 30 years.' },
      { src: 'https://www.nationsonline.org/gallery/Switzerland/Sunrise-on-the-Matterhorn.jpg',
      heading:"Switzerland-The country of Swiss Art and Culture",
      details: 'As a country where diverse traditions and cultures meet and interact, Switzerland has been a melting-pot in the heart of Europe since time immemorial. This is why cultural life in cosmopolitan Switzerland displays such enormous variety.' },
      { src: 'https://www.bontravelindia.com/wp-content/uploads/2021/10/Kedarnath-Temple-Uttarakhand.jpg',
      heading:"Shri Kedarnath Dham",
      details: 'Kedarnath temple is one of the sacred pilgrimage centre in Northern India, located on the bank of Mandakini river at an altitude of 3584 meters above sea level. The historical name of this region is "Kedar Khand". Kedarnath temple is a part of Char Dhams and Panch Kedar in Uttarakhand and one of the 12 Jyotirlingas of Lord Shiva in India.' },
      // Add more images as needed
    ];
    setImages(fetchedImages);
  }, []);

  useEffect(() => {
    let intervalId;
    if (slideshowActive) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [slideshowActive, images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setSlideshowActive(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSlideshowActive(false);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setSlideshowActive(false);
  };

  const toggleSlideshow = () => {
    setSlideshowActive((prevActive) => !prevActive);
  };
  function truncate(str, n){
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
}



  return (
    <div>
      <Grid container spacing={2} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: 400,padding:'2rem',gap:'1rem', }}>
            <img src={images[currentIndex]?.src} alt="Catalog" style={{ maxWidth: '60%', maxHeight: '100%',borderRadius:'1rem' }} />
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',maxHeight:'100%'}}>
            <div style={{maxHeight:'100%',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'flex-start'}}>
             <h4 style={{maxWidth:'50ch',minWidth:'10ch',fontSize:"1rem",fontWeight:'700',color:'rgba(0,0,0,.7)',textAlign:"start"}}>{images[currentIndex]?.heading}</h4>
              <p
              style={{maxWidth:'50ch',minWidth:'20ch',fontSize:".8rem",fontWeight:'600',textAlign:'start',overflow:'hidden',color:'rgba(0,0,0,.7)'}}>
                {truncate(images[currentIndex]?.details,250)}</p>
                </div>
              <IconButton onClick={toggleSlideshow}>
              {slideshowActive ? <PauseIcon sx={{color:'blue'}} /> : <PlayArrowIcon sx={{color:'blue'}}/>}
            </IconButton>
            </div>
          </Paper>
          <div item xs={12} md={4} >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',gap:'.2rem'}}>
            <IconButton onClick={handlePrevious}>
              <Button disabled={slideshowActive}>
                <SkipPreviousIcon/>
              </Button>
            </IconButton>
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {images.map((image, index) => (
              <img className='image'
                key={index}
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                style={{
                    width:'50px',
                    height: '50px',
                    objectFit: 'cover',
                    marginRight: '4px',
                    cursor: 'pointer',
                  filter: index === currentIndex ? 'none' : 'grayscale(100%)',
                  
                }}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
            <IconButton onClick={handleNext}>
              <Button disabled={slideshowActive}>
                <SkipNextIcon />
              </Button>
            </IconButton>
          </div>
          
        </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Catalog;
